/**
 * SearchBar Component
 *
 * TASK 4: Implement search functionality
 *
 * Requirements:
 * - Searches across feedback title AND content
 * - Debounces API calls (300ms recommended)
 * - Shows search results with highlighted matches (bonus)
 *
 * Use the searchFeedback() function from the API.
 */

import React, { useState } from 'react';
import { useFeedbackContext } from '../context/FeedbackContext';
import { useFeedbackDetail } from '../hooks/useFeedback';
import { truncateText, highlightMatches, getStatusColor } from '../utils/helpers';
import type { Feedback } from '../types/feedback';

export function SearchBar() {
  const { dispatch } = useFeedbackContext();
  const { selectFeedback } = useFeedbackDetail();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Feedback[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // TODO: Implement debounced search
  // Hints:
  // 1. Use the debounce utility from '@/utils/helpers'
  // 2. Or implement your own useDebounce hook
  // 3. Call searchFeedback from '@/api/feedbackApi'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // TODO: Trigger debounced search
    // For now, just log
    console.log('Search not implemented:', newQuery);
  };

  const handleResultClick = (feedback: Feedback) => {
    selectFeedback(feedback);
    setShowResults(false);
    setQuery('');
  };

  const handleFocus = () => {
    if (results.length > 0) {
      setShowResults(true);
    }
  };

  const handleBlur = () => {
    // Delay hiding results to allow click events to fire
    setTimeout(() => setShowResults(false), 200);
  };

  // TODO: Handle keyboard navigation (Arrow keys, Enter, Escape)

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search feedback..."
          className="search-input"
          aria-label="Search feedback"
          aria-expanded={showResults}
          aria-controls="search-results"
        />
        {isSearching && <span className="search-spinner" aria-hidden="true" />}
      </div>

      {/* Search Results Dropdown */}
      {showResults && results.length > 0 && (
        <div
          id="search-results"
          className="search-results"
          role="listbox"
          aria-label="Search results"
        >
          {results.map(feedback => (
            <SearchResultItem
              key={feedback.id}
              feedback={feedback}
              query={query}
              onClick={() => handleResultClick(feedback)}
            />
          ))}
        </div>
      )}

      {/* No Results Message */}
      {showResults && query.length > 0 && results.length === 0 && !isSearching && (
        <div className="search-no-results">
          <p>No feedback found for "{query}"</p>
        </div>
      )}
    </div>
  );
}

/**
 * Individual search result item
 * Bonus: Implement text highlighting
 */
interface SearchResultItemProps {
  feedback: Feedback;
  query: string;
  onClick: () => void;
}

function SearchResultItem({ feedback, query, onClick }: SearchResultItemProps) {
  // TODO (Bonus): Use highlightMatches utility to highlight matches

  return (
    <div
      className="search-result-item"
      onClick={onClick}
      role="option"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter') onClick();
      }}
    >
      <div className="result-header">
        <span className="result-title">{feedback.title}</span>
        <span className={`status-badge small ${getStatusColor(feedback.status)}`}>
          {feedback.status}
        </span>
      </div>
      <p className="result-preview">{truncateText(feedback.content, 80)}</p>
      <span className="result-customer">{feedback.customerName}</span>
    </div>
  );
}
