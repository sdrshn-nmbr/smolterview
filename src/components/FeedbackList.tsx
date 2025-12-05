/**
 * FeedbackList Component
 *
 * TASK 1: Complete this component
 *
 * Requirements:
 * - Fetch feedback data from the API on component mount
 * - Implement filtering by status (dropdown is provided but not wired up)
 * - Implement sorting by date or priority
 * - Handle loading and error states appropriately
 *
 * The UI structure is provided - focus on the logic.
 */

import React from 'react';
import { useFeedbackContext } from '../context/FeedbackContext';
import { useFeedbackDetail } from '../hooks/useFeedback';
import { getRelativeTime, truncateText, getStatusColor, getPriorityColor } from '../utils/helpers';
import type { Feedback, FeedbackStatus, SortField, SortDirection } from '../types/feedback';

export function FeedbackList() {
  const { state, dispatch } = useFeedbackContext();
  const { selectFeedback } = useFeedbackDetail();

  // TODO: Implement data fetching
  // Hint: Use useEffect to fetch on mount and when filters/sort change
  // Hint: Use getFeedback from '@/api/feedbackApi'

  // TODO: These handlers need to trigger API calls with the new filters/sort
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as FeedbackStatus | 'all';
    dispatch({
      type: 'SET_FILTERS',
      payload: { ...state.filters, status: newStatus },
    });
    // TODO: Refetch data with new filters
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, direction] = e.target.value.split('-') as [SortField, SortDirection];
    dispatch({
      type: 'SET_SORT',
      payload: { field, direction },
    });
    // TODO: Refetch data with new sort
  };

  const handleFeedbackClick = (feedback: Feedback) => {
    selectFeedback(feedback);
  };

  // TODO: Handle loading state
  // if (state.isLoading) { ... }

  // TODO: Handle error state
  // if (state.error) { ... }

  return (
    <div className="feedback-list">
      {/* Filters and Sort Controls */}
      <div className="feedback-list-controls">
        <div className="filter-group">
          <label htmlFor="status-filter">Status:</label>
          <select
            id="status-filter"
            value={state.filters.status || 'all'}
            onChange={handleStatusFilterChange}
          >
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="in-review">In Review</option>
            <option value="resolved">Resolved</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={`${state.sort.field}-${state.sort.direction}`}
            onChange={handleSortChange}
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="priority-desc">Priority (High to Low)</option>
            <option value="priority-asc">Priority (Low to High)</option>
            <option value="updatedAt-desc">Recently Updated</option>
          </select>
        </div>
      </div>

      {/* Feedback Items */}
      <div className="feedback-items">
        {state.feedbackList.length === 0 ? (
          <div className="empty-state">
            <p>No feedback found.</p>
            {/* TODO: Improve this empty state - different messages for:
                - No feedback at all
                - No feedback matching filters
                - Error fetching data
            */}
          </div>
        ) : (
          state.feedbackList.map(feedback => (
            <FeedbackListItem
              key={feedback.id}
              feedback={feedback}
              onClick={() => handleFeedbackClick(feedback)}
            />
          ))
        )}
      </div>
    </div>
  );
}

/**
 * Individual feedback list item
 */
interface FeedbackListItemProps {
  feedback: Feedback;
  onClick: () => void;
}

function FeedbackListItem({ feedback, onClick }: FeedbackListItemProps) {
  return (
    <div
      className="feedback-item"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <div className="feedback-item-header">
        <h3 className="feedback-title">{feedback.title}</h3>
        <div className="feedback-meta">
          <span className={`status-badge ${getStatusColor(feedback.status)}`}>
            {feedback.status}
          </span>
          <span className={`priority-badge ${getPriorityColor(feedback.priority)}`}>
            {feedback.priority}
          </span>
        </div>
      </div>

      <p className="feedback-preview">{truncateText(feedback.content, 120)}</p>

      <div className="feedback-item-footer">
        <span className="customer-name">{feedback.customerName}</span>
        <span className="feedback-time">{getRelativeTime(feedback.createdAt)}</span>
      </div>

      {feedback.tags.length > 0 && (
        <div className="feedback-tags">
          {feedback.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
          {feedback.tags.length > 3 && (
            <span className="tag-more">+{feedback.tags.length - 3}</span>
          )}
        </div>
      )}
    </div>
  );
}
