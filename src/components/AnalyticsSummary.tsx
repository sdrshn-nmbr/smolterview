/**
 * AnalyticsSummary Component
 *
 * TASK 3: Implement this component
 *
 * Requirements:
 * - Total feedback count
 * - Breakdown by status (new, in-review, resolved, archived)
 * - Average time to resolution (for resolved items)
 * - This data should update when feedback changes
 *
 * Use the getAnalytics() function from the API.
 */

import React from 'react';
import { formatDuration } from '../utils/helpers';
import type { AnalyticsSummary as AnalyticsSummaryType } from '../types/feedback';

export function AnalyticsSummary() {
  // TODO: Fetch analytics data
  // Hint: Use getAnalytics from '@/api/feedbackApi'
  // Hint: Consider when to refetch (on mount, when feedback changes, etc.)

  // TODO: Handle loading state

  // TODO: Handle error state

  // Placeholder data - replace with real data from API
  const analytics: AnalyticsSummaryType | null = null;

  if (!analytics) {
    return (
      <div className="analytics-summary">
        <p>Loading analytics...</p>
        {/* TODO: Implement proper loading state */}
      </div>
    );
  }

  return (
    <div className="analytics-summary">
      <h2>Dashboard Overview</h2>

      {/* Summary Cards */}
      <div className="analytics-cards">
        <div className="analytics-card total">
          <span className="card-value">{analytics.totalCount}</span>
          <span className="card-label">Total Feedback</span>
        </div>

        <div className="analytics-card this-week">
          <span className="card-value">{analytics.feedbackThisWeek}</span>
          <span className="card-label">This Week</span>
        </div>

        <div className="analytics-card this-month">
          <span className="card-value">{analytics.feedbackThisMonth}</span>
          <span className="card-label">This Month</span>
        </div>

        <div className="analytics-card resolution-time">
          <span className="card-value">
            {analytics.averageResolutionTimeMs
              ? formatDuration(analytics.averageResolutionTimeMs)
              : 'N/A'}
          </span>
          <span className="card-label">Avg. Resolution Time</span>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="analytics-breakdown">
        <h3>By Status</h3>
        <div className="breakdown-bars">
          {Object.entries(analytics.byStatus).map(([status, count]) => (
            <div key={status} className="breakdown-item">
              <div className="breakdown-label">
                <span className="status-name">{status}</span>
                <span className="status-count">{count}</span>
              </div>
              <div className="breakdown-bar">
                <div
                  className={`breakdown-fill status-${status}`}
                  style={{
                    width: `${(count / analytics.totalCount) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Breakdown */}
      <div className="analytics-breakdown">
        <h3>By Priority</h3>
        <div className="breakdown-bars">
          {Object.entries(analytics.byPriority).map(([priority, count]) => (
            <div key={priority} className="breakdown-item">
              <div className="breakdown-label">
                <span className="priority-name">{priority}</span>
                <span className="priority-count">{count}</span>
              </div>
              <div className="breakdown-bar">
                <div
                  className={`breakdown-fill priority-${priority}`}
                  style={{
                    width: `${(count / analytics.totalCount) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TODO: Add category breakdown if you have time */}
    </div>
  );
}
