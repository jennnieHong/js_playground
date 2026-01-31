import React from 'react';

/**
 * Component to render controls for CSS properties.
 * 
 * @param {Object} props
 * @param {Array} props.properties - List of property definitions
 * @param {string} props.properties[].name - CSS property name (e.g., 'justify-content')
 * @param {string} props.properties[].label - Display label (optional, defaults to name)
 * @param {string} props.properties[].type - 'radio' | 'select' | 'checkbox'
 * @param {Array} props.properties[].options - List of options. Can be strings or objects { value, label }
 * @param {string|boolean} props.properties[].value - Current value
 * @param {Function} props.properties[].onChange - Callback when value changes
 */
function CssPropertyControls({ properties }) {
  if (!properties || properties.length === 0) return null;

  return (
    <div className="css-controls">
      {properties.map((prop) => (
        <div key={prop.name} className="control-group">
          <label className="control-label">{prop.label || prop.name}</label>
          
          {prop.type === 'select' ? (
            <select 
              value={prop.value} 
              onChange={(e) => prop.onChange(e.target.value)}
              className="control-select"
            >
              {prop.options.map((opt) => {
                const value = typeof opt === 'object' ? opt.value : opt;
                const label = typeof opt === 'object' ? opt.label : opt;
                return <option key={value} value={value}>{label}</option>;
              })}
            </select>
          ) : prop.type === 'checkbox' ? (
            <label className={`checkbox-label ${prop.value ? 'selected' : ''}`}>
              <input
                type="checkbox"
                checked={prop.value}
                onChange={(e) => prop.onChange(e.target.checked)}
              />
              <span className="checkbox-text">
                {prop.value ? 'ON' : 'OFF'}
              </span>
            </label>
          ) : (
            <div className="radio-group">
              {prop.options.map((opt) => {
                const value = typeof opt === 'object' ? opt.value : opt;
                const label = typeof opt === 'object' ? opt.label : opt;
                return (
                  <label key={value} className={`radio-label ${prop.value === value ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name={`${prop.name}-${Math.random()}`} // Ensure unique name per group instance
                      value={value}
                      checked={prop.value === value}
                      onChange={() => prop.onChange(value)}
                    />
                    {label}
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CssPropertyControls;
