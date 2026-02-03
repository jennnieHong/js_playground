import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeaderSearch from './components/HeaderSearch';
import PageProgressDots from './components/PageProgressDots';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';

// JS Curriculum Pages (14 Modules)
import JsBasicsStudy from './pages/JsBasicsStudy';
import JsBigIntStudy from './pages/JsBigIntStudy';
import JsTypeConversionStudy from './pages/JsTypeConversionStudy';
import JsOperatorsStudy from './pages/JsOperatorsStudy';
import JsConditionalsStudy from './pages/JsConditionalsStudy';
import JsLoopsStudy from './pages/JsLoopsStudy';
import JsIterablesStudy from './pages/JsIterablesStudy';
import JsSpreadStudy from './pages/JsSpreadStudy';
import JsReferenceTypesStudy from './pages/JsReferenceTypesStudy';
import JsArrayLikeStudy from './pages/JsArrayLikeStudy';
import JsFunctionsStudy from './pages/JsFunctionsStudy';
import JsArraysStudy from './pages/JsArraysStudy';
import JsObjectsStudy from './pages/JsObjectsStudy';
import JsDomManipulationStudy from './pages/JsDomManipulationStudy';
import JsDomEssentialsStudy from './pages/JsDomEssentialsStudy';
import JsBrowserObjectStudy from './pages/JsBrowserObjectStudy';
import JsBomMasteryStudy from './pages/JsBomMasteryStudy';
import JsEventsStudy from './pages/JsEventsStudy';
import JsAsyncBasicsStudy from './pages/JsAsyncBasicsStudy';
import JsAsyncFetchStudy from './pages/JsAsyncFetchStudy';
import JsModernStudy from './pages/JsModernStudy';
import JsNumberPrecisionStudy from './pages/JsNumberPrecisionStudy';
import JsTypeCheckingStudy from './pages/JsTypeCheckingStudy';
import JsPrototypesStudy from './pages/JsPrototypesStudy';
import JsCssDomStudy from './pages/JsCssDomStudy';
import JsCssVariablesStudy from './pages/JsCssVariablesStudy';
import JsCssComputedStudy from './pages/JsCssComputedStudy';
import JsCssAnimationsStudy from './pages/JsCssAnimationsStudy';
import JsMapSetStudy from './pages/JsMapSetStudy';
import JsAdvancedJsStudy from './pages/JsAdvancedJsStudy';
import JsWebStorageStudy from './pages/JsWebStorageStudy';
import JsSymbolStudy from './pages/JsSymbolStudy';
import JsRegExpStudy from './pages/JsRegExpStudy';
import JsStringMethodsStudy from './pages/JsStringMethodsStudy';
import JsRegExpQuiz from './pages/JsRegExpQuiz';


import './styles/main.css';
import './styles/navigation.css';
import './styles/components.css';
import './styles/pages.css';

function App() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const toggleNav = useCallback(() => {
    setIsNavCollapsed(prev => !prev);
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${baseUrl}/settings`);
        const result = await response.json();
        
        if (result.success) {
          const root = document.documentElement;
          Object.entries(result.data).forEach(([key, value]) => {
            // key: 'page_title_size' -> variable: '--page-title-size'
            const variableName = `--${key.replace(/_/g, '-')}`;
            root.style.setProperty(variableName, value);
          });
          console.log('Dynamic settings applied:', result.data);
        }
      } catch (error) {
        console.error('Failed to fetch dynamic settings:', error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <Router>
      <div className={`app-container ${isNavCollapsed ? 'nav-collapsed' : ''}`}>
        <Navigation isCollapsed={isNavCollapsed} onToggle={toggleNav} />
        <main className="main-content">
          <header className="main-header">
            <HeaderSearch />
          </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />

            {/* JS Curriculum Routes */}
            <Route path="/js/basics" element={<JsBasicsStudy />} />
            <Route path="/js/bigint" element={<JsBigIntStudy />} />
            <Route path="/js/conversion" element={<JsTypeConversionStudy />} />
            <Route path="/js/operators" element={<JsOperatorsStudy />} />
            <Route path="/js/conditionals" element={<JsConditionalsStudy />} />
            <Route path="/js/loops" element={<JsLoopsStudy />} />
            <Route path="/js/iterables" element={<JsIterablesStudy />} />
            <Route path="/js/spread-destructuring" element={<JsSpreadStudy />} />
            <Route path="/js/reference-types" element={<JsReferenceTypesStudy />} />
            <Route path="/js/array-like" element={<JsArrayLikeStudy />} />
            <Route path="/js/functions" element={<JsFunctionsStudy />} />
            <Route path="/js/arrays" element={<JsArraysStudy />} />
            <Route path="/js/objects" element={<JsObjectsStudy />} />
            <Route path="/js/dom-manipulation" element={<JsDomManipulationStudy />} />
            <Route path="/js/dom-essentials" element={<JsDomEssentialsStudy />} />
            <Route path="/js/browser-bom-dom" element={<JsBrowserObjectStudy />} />
            <Route path="/js/bom-mastery" element={<JsBomMasteryStudy />} />
            <Route path="/js/events" element={<JsEventsStudy />} />
            <Route path="/js/async-basics" element={<JsAsyncBasicsStudy />} />
            <Route path="/js/async-fetch" element={<JsAsyncFetchStudy />} />
            <Route path="/js/modern" element={<JsModernStudy />} />
            <Route path="/js/precision" element={<JsNumberPrecisionStudy />} />
            <Route path="/js/type-checking" element={<JsTypeCheckingStudy />} />
            <Route path="/js/prototypes" element={<JsPrototypesStudy />} />
            <Route path="/js/symbol" element={<JsSymbolStudy />} />
            <Route path="/js/regexp" element={<JsRegExpStudy />} />
            <Route path="/js/regexp-quiz" element={<JsRegExpQuiz />} />
            <Route path="/js/string-methods" element={<JsStringMethodsStudy />} />

            <Route path="/js-css/dom-styling" element={<JsCssDomStudy />} />
            <Route path="/js-css/variables" element={<JsCssVariablesStudy />} />
            <Route path="/js-css/computed" element={<JsCssComputedStudy />} />
            <Route path="/js-css/animation-events" element={<JsCssAnimationsStudy />} />

            <Route path="/js/map-set" element={<JsMapSetStudy />} />
            <Route path="/js/advanced-js" element={<JsAdvancedJsStudy />} />
            <Route path="/js/web-storage" element={<JsWebStorageStudy />} />

          </Routes>
        </main>
        <PageProgressDots />
      </div>
    </Router>
  );
}

export default App;


