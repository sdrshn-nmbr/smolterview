/**
 * Core types for the Smolpo feedback system
 */

export type FeedbackStatus = 'new' | 'in-review' | 'resolved' | 'archived';

export type FeedbackPriority = 'low' | 'medium' | 'high' | 'critical';

export type FeedbackCategory =
  | 'bug'
  | 'feature-request'
  | 'improvement'
  | 'question'
  | 'other';

export interface FeedbackNote {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export interface Feedback {
  id: string;
  title: string;
  content: string;
  status: FeedbackStatus;
  priority: FeedbackPriority;
  category: FeedbackCategory;
  customerEmail: string;
  customerName: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  notes: FeedbackNote[];
  tags: string[];
}

export interface FeedbackFilters {
  status?: FeedbackStatus | 'all';
  priority?: FeedbackPriority | 'all';
  category?: FeedbackCategory | 'all';
  search?: string;
}

export type SortField = 'createdAt' | 'updatedAt' | 'priority' | 'status';
export type SortDirection = 'asc' | 'desc';

export interface FeedbackSortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface UpdateFeedbackPayload {
  status?: FeedbackStatus;
  priority?: FeedbackPriority;
  category?: FeedbackCategory;
  tags?: string[];
}

export interface AddNotePayload {
  feedbackId: string;
  content: string;
}

export interface AnalyticsSummary {
  totalCount: number;
  byStatus: Record<FeedbackStatus, number>;
  byPriority: Record<FeedbackPriority, number>;
  byCategory: Record<FeedbackCategory, number>;
  averageResolutionTimeMs: number | null;
  feedbackThisWeek: number;
  feedbackThisMonth: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
