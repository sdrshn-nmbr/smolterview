/**
 * Main Application Component
 *
 * This is the entry point for the Smolpo feedback dashboard.
 * The layout is provided - focus on completing the individual components.
 */

import React from 'react';
import { FeedbackProvider } from './context/FeedbackContext';
import { FeedbackList } from './components/FeedbackList';
import { FeedbackDetail } from './components/FeedbackDetail';
import { AnalyticsSummary } from './components/AnalyticsSummary';
import { SearchBar } from './components/SearchBar';
import './styles/main.css';

function App() {
  return (
    <FeedbackProvider>
      <div className="app">
        {/* Header */}
        <header className="app-header">
          <div className="header-left">
            <h1 className="app-title">Smolpo</h1>
            <span className="app-subtitle">Feedback Dashboard</span>
          </div>
          <div className="header-right">
            <SearchBar />
          </div>
        </header>

        {/* Main Content */}
        <main className="app-main">
          {/* Sidebar with Analytics */}
          <aside className="app-sidebar">
            <AnalyticsSummary />
          </aside>

          {/* Feedback List */}
          <section className="app-content">
            <FeedbackList />
          </section>
        </main>

        {/* Modal for Feedback Detail */}
        <FeedbackDetail />
      </div>
    </FeedbackProvider>
  );
}

export default App;
