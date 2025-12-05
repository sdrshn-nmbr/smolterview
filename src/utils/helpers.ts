/**
 * Utility functions for the Smolpo application
 */

/**
 * Format a date string to a human-readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format a date string to include time
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get relative time (e.g., "2 hours ago", "3 days ago")
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;

  return formatDate(dateString);
}

/**
 * Format milliseconds to a human-readable duration
 */
export function formatDuration(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'}`;
  }
  if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'}`;
  }
  return 'less than an hour';
}

/**
 * Truncate text to a maximum length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Get color class for status badge
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    new: 'status-new',
    'in-review': 'status-in-review',
    resolved: 'status-resolved',
    archived: 'status-archived',
  };
  return colors[status] || 'status-default';
}

/**
 * Get color class for priority badge
 */
export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    low: 'priority-low',
    medium: 'priority-medium',
    high: 'priority-high',
    critical: 'priority-critical',
  };
  return colors[priority] || 'priority-default';
}

/**
 * Debounce function
 * Useful for search input, etc.
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Highlight search matches in text
 * Returns an array of parts with isMatch flag
 */
export function highlightMatches(
  text: string,
  query: string
): Array<{ text: string; isMatch: boolean }> {
  if (!query.trim()) {
    return [{ text, isMatch: false }];
  }

  const parts: Array<{ text: string; isMatch: boolean }> = [];
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  let lastIndex = 0;

  let index = lowerText.indexOf(lowerQuery);
  while (index !== -1) {
    // Add non-matching part before this match
    if (index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, index), isMatch: false });
    }
    // Add matching part
    parts.push({ text: text.slice(index, index + query.length), isMatch: true });
    lastIndex = index + query.length;
    index = lowerText.indexOf(lowerQuery, lastIndex);
  }

  // Add remaining non-matching part
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isMatch: false });
  }

  return parts;
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Classify if an error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.message.includes('Network') ||
      error.message.includes('fetch') ||
      error.message.includes('Failed to'))
  );
}
