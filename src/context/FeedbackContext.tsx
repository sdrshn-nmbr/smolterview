/**
 * Global state management for feedback data
 *
 * This context provides a centralized store for feedback state.
 * Candidates may extend this as needed.
 */

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type {
  Feedback,
  FeedbackFilters,
  FeedbackSortConfig,
  AnalyticsSummary,
} from '../types/feedback';

// State shape
interface FeedbackState {
  feedbackList: Feedback[];
  selectedFeedback: Feedback | null;
  filters: FeedbackFilters;
  sort: FeedbackSortConfig;
  analytics: AnalyticsSummary | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
}

// Action types
type FeedbackAction =
  | { type: 'SET_FEEDBACK_LIST'; payload: Feedback[] }
  | { type: 'SET_SELECTED_FEEDBACK'; payload: Feedback | null }
  | { type: 'UPDATE_FEEDBACK_IN_LIST'; payload: Feedback }
  | { type: 'SET_FILTERS'; payload: FeedbackFilters }
  | { type: 'SET_SORT'; payload: FeedbackSortConfig }
  | { type: 'SET_ANALYTICS'; payload: AnalyticsSummary }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string };

// Initial state
const initialState: FeedbackState = {
  feedbackList: [],
  selectedFeedback: null,
  filters: {
    status: 'all',
    priority: 'all',
    category: 'all',
  },
  sort: {
    field: 'createdAt',
    direction: 'desc',
  },
  analytics: null,
  isLoading: false,
  error: null,
  searchQuery: '',
};

// Reducer
function feedbackReducer(state: FeedbackState, action: FeedbackAction): FeedbackState {
  switch (action.type) {
    case 'SET_FEEDBACK_LIST':
      return { ...state, feedbackList: action.payload };

    case 'SET_SELECTED_FEEDBACK':
      return { ...state, selectedFeedback: action.payload };

    case 'UPDATE_FEEDBACK_IN_LIST':
      return {
        ...state,
        feedbackList: state.feedbackList.map(f =>
          f.id === action.payload.id ? action.payload : f
        ),
        selectedFeedback:
          state.selectedFeedback?.id === action.payload.id
            ? action.payload
            : state.selectedFeedback,
      };

    case 'SET_FILTERS':
      return { ...state, filters: action.payload };

    case 'SET_SORT':
      return { ...state, sort: action.payload };

    case 'SET_ANALYTICS':
      return { ...state, analytics: action.payload };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    default:
      return state;
  }
}

// Context
interface FeedbackContextType {
  state: FeedbackState;
  dispatch: React.Dispatch<FeedbackAction>;
}

const FeedbackContext = createContext<FeedbackContextType | null>(null);

// Provider component
interface FeedbackProviderProps {
  children: ReactNode;
}

export function FeedbackProvider({ children }: FeedbackProviderProps) {
  const [state, dispatch] = useReducer(feedbackReducer, initialState);

  return (
    <FeedbackContext.Provider value={{ state, dispatch }}>
      {children}
    </FeedbackContext.Provider>
  );
}

// Custom hook for consuming context
export function useFeedbackContext() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedbackContext must be used within a FeedbackProvider');
  }
  return context;
}

// Export types for external use
export type { FeedbackState, FeedbackAction };
