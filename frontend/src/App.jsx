import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeaderSearch from './components/HeaderSearch';
import ScrollButtons from './components/ScrollButtons';
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
import JsFunctionsStudy from './pages/JsFunctionsStudy';
import JsArraysStudy from './pages/JsArraysStudy';
import JsObjectsStudy from './pages/JsObjectsStudy';
import JsDomManipulationStudy from './pages/JsDomManipulationStudy';
import JsEventsStudy from './pages/JsEventsStudy';
import JsAsyncBasicsStudy from './pages/JsAsyncBasicsStudy';
import JsAsyncFetchStudy from './pages/JsAsyncFetchStudy';
import JsModernStudy from './pages/JsModernStudy';
import JsNumberPrecisionStudy from './pages/JsNumberPrecisionStudy';

import './styles/main.css';
import './styles/navigation.css';
import './styles/components.css';
import './styles/pages.css';

function App() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const toggleNav = useCallback(() => {
    setIsNavCollapsed(prev => !prev);
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
            <Route path="/js/functions" element={<JsFunctionsStudy />} />
            <Route path="/js/arrays" element={<JsArraysStudy />} />
            <Route path="/js/objects" element={<JsObjectsStudy />} />
            <Route path="/js/dom-manipulation" element={<JsDomManipulationStudy />} />
            <Route path="/js/events" element={<JsEventsStudy />} />
            <Route path="/js/async-basics" element={<JsAsyncBasicsStudy />} />
            <Route path="/js/async-fetch" element={<JsAsyncFetchStudy />} />
            <Route path="/js/modern" element={<JsModernStudy />} />
            <Route path="/js/precision" element={<JsNumberPrecisionStudy />} />
          </Routes>
        </main>
        <ScrollButtons />
        <PageProgressDots />
      </div>
    </Router>
  );
}

export default App;


