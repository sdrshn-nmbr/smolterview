/**
 * Custom hooks for feedback operations
 *
 * Candidates should extend these hooks or create new ones as needed.
 * These provide a starting point for common operations.
 */

import { useCallback } from 'react';
import { useFeedbackContext } from '../context/FeedbackContext';
import type { Feedback, FeedbackFilters, FeedbackSortConfig } from '../types/feedback';

/**
 * Hook for accessing feedback state
 * Provides read-only access to the current state
 */
export function useFeedbackState() {
  const { state } = useFeedbackContext();
  return state;
}

/**
 * Hook for feedback list operations
 *
 * TODO: Implement the fetchFeedback function
 * It should:
 * 1. Set loading state
 * 2. Call the API
 * 3. Update the feedback list in state
 * 4. Handle errors appropriately
 */
export function useFeedbackList() {
  const { state, dispatch } = useFeedbackContext();

  const fetchFeedback = useCallback(async () => {
    // TODO: Implement this function
    // Hint: Use getFeedback from '@/api/feedbackApi'
    console.log('fetchFeedback not implemented yet');
  }, [dispatch, state.filters, state.sort]);

  const setFilters = useCallback(
    (filters: FeedbackFilters) => {
      dispatch({ type: 'SET_FILTERS', payload: filters });
    },
    [dispatch]
  );

  const setSort = useCallback(
    (sort: FeedbackSortConfig) => {
      dispatch({ type: 'SET_SORT', payload: sort });
    },
    [dispatch]
  );

  return {
    feedbackList: state.feedbackList,
    isLoading: state.isLoading,
    error: state.error,
    filters: state.filters,
    sort: state.sort,
    fetchFeedback,
    setFilters,
    setSort,
  };
}

/**
 * Hook for single feedback operations
 *
 * TODO: Implement updateFeedback and addNote functions
 */
export function useFeedbackDetail() {
  const { state, dispatch } = useFeedbackContext();

  const selectFeedback = useCallback(
    (feedback: Feedback | null) => {
      dispatch({ type: 'SET_SELECTED_FEEDBACK', payload: feedback });
    },
    [dispatch]
  );

  const updateFeedbackInState = useCallback(
    (feedback: Feedback) => {
      dispatch({ type: 'UPDATE_FEEDBACK_IN_LIST', payload: feedback });
    },
    [dispatch]
  );

  return {
    selectedFeedback: state.selectedFeedback,
    selectFeedback,
    updateFeedbackInState,
  };
}

/**
 * Hook for analytics data
 *
 * TODO: Implement fetchAnalytics function
 */
export function useAnalytics() {
  const { state, dispatch } = useFeedbackContext();

  const fetchAnalytics = useCallback(async () => {
    // TODO: Implement this function
    // Hint: Use getAnalytics from '@/api/feedbackApi'
    console.log('fetchAnalytics not implemented yet');
  }, [dispatch]);

  return {
    analytics: state.analytics,
    fetchAnalytics,
  };
}

/**
 * Hook for search functionality
 *
 * TODO: Implement search with debouncing
 */
export function useSearch() {
  const { state, dispatch } = useFeedbackContext();

  const setSearchQuery = useCallback(
    (query: string) => {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    },
    [dispatch]
  );

  return {
    searchQuery: state.searchQuery,
    setSearchQuery,
  };
}
