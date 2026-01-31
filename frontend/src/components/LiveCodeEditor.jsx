import { useState, useEffect, useRef } from 'react';

/**
 * LiveCodeEditor - Interactive CSS editor component
 * Allows users to edit CSS code and apply changes manually
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.preview - HTML preview content
 * @param {string} props.initialCss - Initial CSS code
 * @param {string} props.scopeId - Unique ID to scope the styles
 */
function LiveCodeEditor({ 
  preview, 
  initialCss, 
  initialHtml, 
  initialJs,
  currentCss, 
  currentHtml, 
  currentJs,
  scopeId, 
  height, 
  previewHeight, 
  codeHeight 
}) {
  const [draftCss, setDraftCss] = useState(initialCss || '');
  const [appliedCss, setAppliedCss] = useState(initialCss || '');
  const [draftHtml, setDraftHtml] = useState(initialHtml || '');
  const [appliedHtml, setAppliedHtml] = useState(initialHtml || '');
  const [draftJs, setDraftJs] = useState(initialJs || '');
  const [appliedJs, setAppliedJs] = useState(initialJs || '');
  
  // Default to 'js' tab for the new curriculum
  const [activeTab, setActiveTab] = useState(initialJs ? 'js' : 'html+css'); 
  const [renderKey, setRenderKey] = useState(0);
  const styleRef = useRef(null);
  
  // Sync refs for external updates
  const lastSyncedCss = useRef(currentCss);
  const lastSyncedHtml = useRef(currentHtml);
  const lastSyncedJs = useRef(currentJs);

  // Sync effect for CSS
  useEffect(() => {
    if (currentCss !== undefined && currentCss !== lastSyncedCss.current) {
      if (draftCss === appliedCss) setDraftCss(currentCss);
      setAppliedCss(currentCss);
      lastSyncedCss.current = currentCss;
    }
  }, [currentCss, draftCss, appliedCss]);

  // Sync effect for HTML
  useEffect(() => {
    if (currentHtml !== undefined && currentHtml !== lastSyncedHtml.current) {
      if (draftHtml === appliedHtml) setDraftHtml(currentHtml);
      setAppliedHtml(currentHtml);
      lastSyncedHtml.current = currentHtml;
    }
  }, [currentHtml, draftHtml, appliedHtml]);

  // Sync effect for JS
  useEffect(() => {
    if (currentJs !== undefined && currentJs !== lastSyncedJs.current) {
      if (draftJs === appliedJs) setDraftJs(currentJs);
      setAppliedJs(currentJs);
      lastSyncedJs.current = currentJs;
    }
  }, [currentJs, draftJs, appliedJs]);

  // CSS Scoping Logic (kept from previous version)
  useEffect(() => {
    if (styleRef.current) {
      const scoper = (css, prefix) => {
        if (!css) return '';
        let processedCss = css;
        const tempPrefix = `__AT_BLOCK_${Math.random().toString(36).substr(2, 9)}__`;
        const blocks = [];
        let atIndex;
        while ((atIndex = processedCss.search(/@(?:media|supports)/)) !== -1) {
          let braceCount = 0;
          let i = atIndex;
          let blockStart = -1, blockEnd = -1;
          while (i < processedCss.length) {
            if (processedCss[i] === '{') {
              if (braceCount === 0) blockStart = i;
              braceCount++;
            } else if (processedCss[i] === '}') {
              braceCount--;
              if (braceCount === 0) { blockEnd = i; break; }
            }
            i++;
          }
          if (blockStart !== -1 && blockEnd !== -1) {
            const header = processedCss.substring(atIndex, blockStart);
            const content = processedCss.substring(blockStart + 1, blockEnd);
            const scopedContent = scoper(content, prefix);
            blocks.push(`${header}{${scopedContent}}`);
            processedCss = processedCss.substring(0, atIndex) + `${tempPrefix}_${blocks.length - 1}` + processedCss.substring(blockEnd + 1);
          } else break;
        }
        const ruleRegex = /([^{}]+)\{([^{}]*)\}/g;
        processedCss = processedCss.replace(ruleRegex, (match, selector, props) => {
          const trimmed = selector.trim();
          if (!trimmed || trimmed.startsWith(tempPrefix)) return match;
          const prefixed = trimmed.split(',').map(s => {
            const part = s.trim();
            if (!part || part.startsWith('@')) return part;
            if (part === ':root') return prefix;
            if (part.startsWith(':')) return `${prefix}${part}`;
            if (part.startsWith(prefix)) return part;
            return `${prefix} ${part}`;
          }).join(', ');
          return `${prefixed} { ${props} }`;
        });
        blocks.forEach((block, i) => { processedCss = processedCss.split(`${tempPrefix}_${i}`).join(block); });
        return processedCss;
      };

      const extractTopLevelAtRules = (css) => {
        if (!css) return { atRules: '', other: '' };
        let atRules = '', other = css;
        const keyframeRegex = /@keyframes\s+[\w-]+\s*\{/g;
        let match, tempCss = css, processedCss = '', lastIndex = 0;
        while ((match = keyframeRegex.exec(tempCss)) !== null) {
          processedCss += tempCss.substring(lastIndex, match.index);
          let braceCount = 1, i = match.index + match[0].length;
          while (i < tempCss.length && braceCount > 0) {
            if (tempCss[i] === '{') braceCount++; else if (tempCss[i] === '}') braceCount--;
            i++;
          }
          atRules += tempCss.substring(match.index, i) + '\n';
          lastIndex = i;
        }
        processedCss += tempCss.substring(lastIndex);
        other = processedCss;
        const topLevelRegex = /@(font-face|import)[^;{]*[{;]/g;
        other = other.replace(topLevelRegex, (m) => { atRules += m + (m.endsWith('{') ? '}' : '') + '\n'; return ''; });
        return { atRules, other };
      };

      const { atRules, other } = extractTopLevelAtRules(appliedCss);
      styleRef.current.textContent = `${atRules}\n${scoper(other, `#${scopeId}`)}`;
    }
  }, [appliedCss, scopeId]);

  // Script Runner effect (updated to handle separate appliedJs)
  useEffect(() => {
    const timer = setTimeout(() => {
      const container = document.getElementById(scopeId);
      if (!container) return;

      container.querySelectorAll('.injected-script').forEach(s => s.remove());

      const createScript = (content) => {
        const script = document.createElement('script');
        script.className = 'injected-script';
        script.textContent = `
          try {
            (function(containerId) {
              const _ctx = document.getElementById(containerId);
              if (!_ctx) return;
              const pick = (s) => _ctx.querySelector(s);
              const pickAll = (s) => Array.from(_ctx.querySelectorAll(s));
              _ctx.__pick = pick; _ctx.__pickAll = pickAll;
              const log = (msg, isErr = false) => {
                const content = _ctx.querySelector('[data-ref="logContent"]');
                const led = _ctx.querySelector('[data-ref="diagnosticLed"]');
                if (content) {
                  content.innerText = typeof msg === 'object' ? '> ' + JSON.stringify(msg) : '> ' + msg;
                  content.style.color = isErr ? '#f87171' : '#4ade80';
                }
                if (led) {
                  led.style.background = isErr ? '#ef4444' : '#fde047';
                  setTimeout(() => led.style.background = '#22c55e', 200);
                }
              };
              ${content}
            })("${scopeId}");
          } catch (err) {
            const container = document.getElementById("${scopeId}");
            const content = container ? container.querySelector('[data-ref="logContent"]') : null;
            if (content) {
              content.innerText = "> Runtime Error: " + err.message;
              content.style.color = "#f87171";
            }
          }
        `;
        return script;
      };

      // 1. Run script from the JS editor tab
      if (appliedJs) {
        container.appendChild(createScript(appliedJs));
      }

      // 2. Run inline scripts from HTML (fallback/legacy support)
      const htmlScripts = Array.from(container.querySelectorAll('script:not(.injected-script)'));
      htmlScripts.forEach(oldScript => {
        container.appendChild(createScript(oldScript.textContent));
        oldScript.remove();
      });

    }, 150);
    return () => clearTimeout(timer);
  }, [appliedHtml, appliedJs, scopeId, renderKey]);

  const handleReset = () => {
    setDraftCss(initialCss || ''); setAppliedCss(initialCss || '');
    setDraftHtml(initialHtml || ''); setAppliedHtml(initialHtml || '');
    setDraftJs(initialJs || ''); setAppliedJs(initialJs || '');
    lastSyncedCss.current = initialCss; lastSyncedHtml.current = initialHtml; lastSyncedJs.current = initialJs;
  };

  const handleApply = () => {
    setAppliedCss(draftCss); setAppliedHtml(draftHtml); setAppliedJs(draftJs);
    setRenderKey(prev => prev + 1);
  };

  const [copiedType, setCopiedType] = useState(null);
  const handleCopy = async (type, content) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    } catch (err) { console.error('Failed to copy:', err); }
  };

  const hasChanges = draftCss !== appliedCss || draftHtml !== appliedHtml || draftJs !== appliedJs;

  return (
    <div className="live-editor-container">
      <div className="live-editor-header">
        <div className="live-editor-tabs">
          <button
            className={`tab-btn ${activeTab === 'js' ? 'active' : ''}`}
            onClick={() => setActiveTab('js')}
          >
            JavaScript
          </button>
          <button
            className={`tab-btn ${activeTab === 'html+css' ? 'active' : ''}`}
            onClick={() => setActiveTab('html+css')}
          >
            HTML + CSS
          </button>
        </div>
        <div className="live-editor-actions">
          <button className="btn btn-primary" onClick={handleApply} disabled={!hasChanges}>Apply</button>
          <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
        </div>
      </div>

      <div className="live-editor-content" style={height ? { height } : undefined}>
        <div className="live-editor-preview" id={scopeId} style={previewHeight ? { height: previewHeight } : undefined}>
          <div className="preview-viewport" style={{ transform: 'translateZ(0)', width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <div className="preview-scroll" style={{ width: '100%', height: '100%', overflow: 'auto', padding: '1.5rem', background: '#ffffff' }}>
              <style ref={styleRef}></style>
              <div key={renderKey} dangerouslySetInnerHTML={{ __html: appliedHtml }} />
            </div>
          </div>
        </div>

        <div className="live-editor-code" style={codeHeight ? { height: codeHeight } : undefined}>
          {activeTab === 'js' && (
            <div className="code-editor-wrapper">
              <button className="copy-btn" onClick={() => handleCopy('js', draftJs)}>
                {copiedType === 'js' ? '✓ Copied!' : '📋 Copy JS'}
              </button>
              <textarea
                className="code-textarea js-editor"
                value={draftJs}
                onChange={(e) => setDraftJs(e.target.value)}
                spellCheck="false"
                placeholder="// Enter your JavaScript here"
              />
            </div>
          )}

          {activeTab === 'html+css' && (
            <div className="code-editor-split">
              <div className="code-editor-wrapper half">
                <button className="copy-btn" onClick={() => handleCopy('html', draftHtml)}>
                  {copiedType === 'html' ? '✓ Copied' : '📋 HTML'}
                </button>
                <textarea
                  className="code-textarea html-editor"
                  value={draftHtml}
                  onChange={(e) => setDraftHtml(e.target.value)}
                  spellCheck="false"
                  placeholder="<!-- HTML -->"
                />
              </div>
              <div className="code-editor-wrapper half">
                <button className="copy-btn" onClick={() => handleCopy('css', draftCss)}>
                  {copiedType === 'css' ? '✓ Copied' : '📋 CSS'}
                </button>
                <textarea
                  className="code-textarea css-editor"
                  value={draftCss}
                  onChange={(e) => setDraftCss(e.target.value)}
                  spellCheck="false"
                  placeholder="/* CSS */"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LiveCodeEditor;
