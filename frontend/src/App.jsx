import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeaderSearch from './components/HeaderSearch';
import ScrollButtons from './components/ScrollButtons';
import PageProgressDots from './components/PageProgressDots';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';

// JS Curriculum Pages
import JsBasicsStudy from './pages/JsBasicsStudy';
import JsControlFlowStudy from './pages/JsControlFlowStudy';
import JsFunctionsStudy from './pages/JsFunctionsStudy';
import JsObjectsArraysStudy from './pages/JsObjectsArraysStudy';
import JsDomEventsStudy from './pages/JsDomEventsStudy';
import JsAsyncStudy from './pages/JsAsyncStudy';

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
            
            {/* JS Basics */}
            <Route path="/js-basics/variables" element={<JsBasicsStudy />} />
            <Route path="/js-basics/operators" element={<JsBasicsStudy />} />
            
            {/* Control Flow */}
            <Route path="/js-control/conditionals" element={<JsControlFlowStudy />} />
            <Route path="/js-control/loops" element={<JsControlFlowStudy />} />
            
            {/* Functions */}
            <Route path="/js-functions/basics" element={<JsFunctionsStudy />} />
            <Route path="/js-functions/arrow" element={<JsFunctionsStudy />} />
            
            {/* Objects & Arrays */}
            <Route path="/js-objects/arrays" element={<JsObjectsArraysStudy />} />
            <Route path="/js-objects/objects" element={<JsObjectsArraysStudy />} />
            
            {/* DOM & Events */}
            <Route path="/js-dom/manipulation" element={<JsDomEventsStudy />} />
            <Route path="/js-dom/events" element={<JsDomEventsStudy />} />
            
            {/* Async JS */}
            <Route path="/js-async/basics" element={<JsAsyncStudy />} />
            <Route path="/js-async/fetch" element={<JsAsyncStudy />} />
          </Routes>
        </main>
        <ScrollButtons />
        <PageProgressDots />
      </div>
    </Router>
  );
}

export default App;


