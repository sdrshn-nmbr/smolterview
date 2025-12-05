/**
 * Feedback API Client
 *
 * DO NOT MODIFY THIS FILE - Use these functions as-is in your implementation
 *
 * This simulates a REST API that would typically hit a backend server.
 * All functions return Promises and may throw errors (handle appropriately).
 */

import type {
  Feedback,
  FeedbackFilters,
  FeedbackSortConfig,
  UpdateFeedbackPayload,
  AddNotePayload,
  AnalyticsSummary,
  FeedbackNote,
  FeedbackStatus,
  FeedbackPriority,
  FeedbackCategory,
} from '../types/feedback';
import { mockFeedbackData, simulateLatency } from './mockData';

// In-memory store (simulates database)
let feedbackStore: Feedback[] = [...mockFeedbackData];

/**
 * Fetch all feedback items with optional filtering and sorting
 */
export async function getFeedback(
  filters?: FeedbackFilters,
  sort?: FeedbackSortConfig
): Promise<Feedback[]> {
  await simulateLatency(200, 600);

  let result = [...feedbackStore];

  // Apply filters
  if (filters) {
    if (filters.status && filters.status !== 'all') {
      result = result.filter(f => f.status === filters.status);
    }
    if (filters.priority && filters.priority !== 'all') {
      result = result.filter(f => f.priority === filters.priority);
    }
    if (filters.category && filters.category !== 'all') {
      result = result.filter(f => f.category === filters.category);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        f =>
          f.title.toLowerCase().includes(searchLower) ||
          f.content.toLowerCase().includes(searchLower) ||
          f.customerName.toLowerCase().includes(searchLower) ||
          f.tags.some(t => t.toLowerCase().includes(searchLower))
      );
    }
  }

  // Apply sorting
  if (sort) {
    result.sort((a, b) => {
      let comparison = 0;

      switch (sort.field) {
        case 'createdAt':
        case 'updatedAt':
          comparison = new Date(a[sort.field]).getTime() - new Date(b[sort.field]).getTime();
          break;
        case 'priority': {
          const priorityOrder: Record<FeedbackPriority, number> = {
            critical: 4,
            high: 3,
            medium: 2,
            low: 1,
          };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        }
        case 'status': {
          const statusOrder: Record<FeedbackStatus, number> = {
            new: 4,
            'in-review': 3,
            resolved: 2,
            archived: 1,
          };
          comparison = statusOrder[a.status] - statusOrder[b.status];
          break;
        }
      }

      return sort.direction === 'desc' ? -comparison : comparison;
    });
  } else {
    // Default: newest first
    result.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return result;
}

/**
 * Fetch a single feedback item by ID
 */
export async function getFeedbackById(id: string): Promise<Feedback | null> {
  await simulateLatency(100, 300);

  const feedback = feedbackStore.find(f => f.id === id);
  return feedback || null;
}

/**
 * Update a feedback item
 */
export async function updateFeedback(
  id: string,
  updates: UpdateFeedbackPayload
): Promise<Feedback> {
  await simulateLatency(200, 400);

  const index = feedbackStore.findIndex(f => f.id === id);
  if (index === -1) {
    throw new Error(`Feedback with id ${id} not found`);
  }

  const existingFeedback = feedbackStore[index];
  const updatedFeedback: Feedback = {
    ...existingFeedback,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  // If status changed to resolved, set resolvedAt
  if (updates.status === 'resolved' && existingFeedback.status !== 'resolved') {
    updatedFeedback.resolvedAt = new Date().toISOString();
  }

  // If status changed from resolved, clear resolvedAt
  if (updates.status && updates.status !== 'resolved' && existingFeedback.status === 'resolved') {
    updatedFeedback.resolvedAt = null;
  }

  feedbackStore[index] = updatedFeedback;
  return updatedFeedback;
}

/**
 * Add a note to a feedback item
 */
export async function addNote(payload: AddNotePayload): Promise<FeedbackNote> {
  await simulateLatency(150, 350);

  const index = feedbackStore.findIndex(f => f.id === payload.feedbackId);
  if (index === -1) {
    throw new Error(`Feedback with id ${payload.feedbackId} not found`);
  }

  const newNote: FeedbackNote = {
    id: `note-${Date.now()}`,
    content: payload.content,
    authorId: 'current-user',
    authorName: 'You',
    createdAt: new Date().toISOString(),
  };

  feedbackStore[index] = {
    ...feedbackStore[index],
    notes: [...feedbackStore[index].notes, newNote],
    updatedAt: new Date().toISOString(),
  };

  return newNote;
}

/**
 * Search feedback by query string
 * Searches title, content, customer name, and tags
 */
export async function searchFeedback(query: string): Promise<Feedback[]> {
  await simulateLatency(150, 400);

  if (!query.trim()) {
    return [];
  }

  const queryLower = query.toLowerCase();

  return feedbackStore.filter(
    f =>
      f.title.toLowerCase().includes(queryLower) ||
      f.content.toLowerCase().includes(queryLower) ||
      f.customerName.toLowerCase().includes(queryLower) ||
      f.customerEmail.toLowerCase().includes(queryLower) ||
      f.tags.some(t => t.toLowerCase().includes(queryLower))
  );
}

/**
 * Get analytics summary
 */
export async function getAnalytics(): Promise<AnalyticsSummary> {
  await simulateLatency(200, 500);

  const byStatus: Record<FeedbackStatus, number> = {
    new: 0,
    'in-review': 0,
    resolved: 0,
    archived: 0,
  };

  const byPriority: Record<FeedbackPriority, number> = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  };

  const byCategory: Record<FeedbackCategory, number> = {
    bug: 0,
    'feature-request': 0,
    improvement: 0,
    question: 0,
    other: 0,
  };

  let totalResolutionTime = 0;
  let resolvedCount = 0;

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  let feedbackThisWeek = 0;
  let feedbackThisMonth = 0;

  for (const feedback of feedbackStore) {
    byStatus[feedback.status]++;
    byPriority[feedback.priority]++;
    byCategory[feedback.category]++;

    const createdDate = new Date(feedback.createdAt);
    if (createdDate >= oneWeekAgo) {
      feedbackThisWeek++;
    }
    if (createdDate >= oneMonthAgo) {
      feedbackThisMonth++;
    }

    if (feedback.resolvedAt) {
      const created = new Date(feedback.createdAt).getTime();
      const resolved = new Date(feedback.resolvedAt).getTime();
      totalResolutionTime += resolved - created;
      resolvedCount++;
    }
  }

  return {
    totalCount: feedbackStore.length,
    byStatus,
    byPriority,
    byCategory,
    averageResolutionTimeMs: resolvedCount > 0 ? totalResolutionTime / resolvedCount : null,
    feedbackThisWeek,
    feedbackThisMonth,
  };
}

/**
 * Delete a feedback item (soft delete - moves to archived)
 */
export async function archiveFeedback(id: string): Promise<Feedback> {
  return updateFeedback(id, { status: 'archived' });
}

/**
 * Reset the mock data (useful for testing)
 */
export function resetMockData(): void {
  feedbackStore = [...mockFeedbackData];
}
