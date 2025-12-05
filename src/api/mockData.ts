/**
 * Mock data for the interview
 * This simulates what would come from a real database
 */

import type { Feedback, FeedbackNote } from '../types/feedback';

// Helper to generate dates
const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

const hoursAgo = (hours: number): string => {
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date.toISOString();
};

// Generate realistic mock data
export const mockFeedbackData: Feedback[] = [
  {
    id: 'fb-001',
    title: 'Unable to export data to CSV',
    content: 'When I try to export my dashboard data to CSV, the download starts but the file is empty. I\'ve tried on Chrome and Firefox with the same result. This is blocking our monthly reporting.',
    status: 'new',
    priority: 'high',
    category: 'bug',
    customerEmail: 'sarah.chen@techcorp.io',
    customerName: 'Sarah Chen',
    createdAt: hoursAgo(2),
    updatedAt: hoursAgo(2),
    resolvedAt: null,
    notes: [],
    tags: ['export', 'csv', 'critical-path'],
  },
  {
    id: 'fb-002',
    title: 'Add dark mode support',
    content: 'Would love to see a dark mode option. I work late nights and the bright interface is hard on my eyes. Many modern apps support this now.',
    status: 'in-review',
    priority: 'medium',
    category: 'feature-request',
    customerEmail: 'mike.johnson@startup.co',
    customerName: 'Mike Johnson',
    createdAt: daysAgo(5),
    updatedAt: daysAgo(2),
    resolvedAt: null,
    notes: [
      {
        id: 'note-001',
        content: 'This has been requested by 15+ customers. Adding to Q1 roadmap.',
        authorId: 'user-pm-1',
        authorName: 'Jessica Lee',
        createdAt: daysAgo(3),
      },
    ],
    tags: ['ui', 'accessibility', 'popular-request'],
  },
  {
    id: 'fb-003',
    title: 'Dashboard loads slowly with large datasets',
    content: 'Our team has over 50,000 records and the dashboard takes 30+ seconds to load. We need better performance for enterprise use cases.',
    status: 'in-review',
    priority: 'critical',
    category: 'improvement',
    customerEmail: 'enterprise@bigcorp.com',
    customerName: 'David Park',
    createdAt: daysAgo(10),
    updatedAt: daysAgo(1),
    resolvedAt: null,
    notes: [
      {
        id: 'note-002',
        content: 'Engineering confirmed this is due to loading all data at once. Working on pagination.',
        authorId: 'user-eng-1',
        authorName: 'Alex Rivera',
        createdAt: daysAgo(7),
      },
      {
        id: 'note-003',
        content: 'Customer is on Enterprise plan - high priority.',
        authorId: 'user-cs-1',
        authorName: 'Emma Wilson',
        createdAt: daysAgo(8),
      },
    ],
    tags: ['performance', 'enterprise', 'pagination'],
  },
  {
    id: 'fb-004',
    title: 'Love the new filtering feature!',
    content: 'Just wanted to say the new advanced filtering you added last week is amazing. It\'s saved our team hours of work. Keep up the great work!',
    status: 'resolved',
    priority: 'low',
    category: 'other',
    customerEmail: 'happy.customer@email.com',
    customerName: 'Rachel Green',
    createdAt: daysAgo(7),
    updatedAt: daysAgo(6),
    resolvedAt: daysAgo(6),
    notes: [
      {
        id: 'note-004',
        content: 'Shared with the team - great morale boost!',
        authorId: 'user-pm-1',
        authorName: 'Jessica Lee',
        createdAt: daysAgo(6),
      },
    ],
    tags: ['positive-feedback', 'filtering'],
  },
  {
    id: 'fb-005',
    title: 'How do I integrate with Slack?',
    content: 'I saw in your docs that Slack integration is possible but I can\'t find where to set it up. Can you point me in the right direction?',
    status: 'resolved',
    priority: 'low',
    category: 'question',
    customerEmail: 'confused.user@company.org',
    customerName: 'Tom Bradley',
    createdAt: daysAgo(3),
    updatedAt: daysAgo(2),
    resolvedAt: daysAgo(2),
    notes: [
      {
        id: 'note-005',
        content: 'Sent documentation link and offered onboarding call.',
        authorId: 'user-cs-1',
        authorName: 'Emma Wilson',
        createdAt: daysAgo(2),
      },
    ],
    tags: ['integrations', 'slack', 'documentation'],
  },
  {
    id: 'fb-006',
    title: 'Mobile app crashes on Android 14',
    content: 'Since updating to Android 14, the mobile app crashes immediately on launch. Samsung Galaxy S23. Very frustrating as I rely on mobile access.',
    status: 'new',
    priority: 'critical',
    category: 'bug',
    customerEmail: 'android.user@gmail.com',
    customerName: 'Kevin Zhang',
    createdAt: hoursAgo(5),
    updatedAt: hoursAgo(5),
    resolvedAt: null,
    notes: [],
    tags: ['mobile', 'android', 'crash', 'urgent'],
  },
  {
    id: 'fb-007',
    title: 'Request: Bulk import from Excel',
    content: 'We need to migrate 10,000 records from our old system. Currently we can only add one at a time. An Excel/CSV import feature would save us weeks.',
    status: 'new',
    priority: 'medium',
    category: 'feature-request',
    customerEmail: 'migration@newclient.com',
    customerName: 'Lisa Wang',
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
    resolvedAt: null,
    notes: [],
    tags: ['import', 'excel', 'migration', 'onboarding'],
  },
  {
    id: 'fb-008',
    title: 'Keyboard shortcuts would be helpful',
    content: 'Power users like me would benefit from keyboard shortcuts. J/K to navigate, E to edit, S to save, etc. Similar to Gmail or GitHub.',
    status: 'archived',
    priority: 'low',
    category: 'feature-request',
    customerEmail: 'power.user@dev.io',
    customerName: 'Chris Martinez',
    createdAt: daysAgo(45),
    updatedAt: daysAgo(30),
    resolvedAt: null,
    notes: [
      {
        id: 'note-006',
        content: 'Good idea but low priority. Moving to backlog.',
        authorId: 'user-pm-1',
        authorName: 'Jessica Lee',
        createdAt: daysAgo(30),
      },
    ],
    tags: ['keyboard', 'accessibility', 'power-users'],
  },
  {
    id: 'fb-009',
    title: 'SSO login not working with Okta',
    content: 'We configured Okta SSO per your docs but users get a 403 error after authentication. SAML assertion looks correct. Need urgent help.',
    status: 'in-review',
    priority: 'high',
    category: 'bug',
    customerEmail: 'it.admin@secure-company.com',
    customerName: 'Nicole Foster',
    createdAt: daysAgo(2),
    updatedAt: hoursAgo(12),
    resolvedAt: null,
    notes: [
      {
        id: 'note-007',
        content: 'Scheduled call with customer for tomorrow 2pm EST.',
        authorId: 'user-cs-1',
        authorName: 'Emma Wilson',
        createdAt: hoursAgo(12),
      },
    ],
    tags: ['sso', 'okta', 'authentication', 'enterprise'],
  },
  {
    id: 'fb-010',
    title: 'Webhook deliveries are delayed',
    content: 'Our webhooks are arriving 5-10 minutes late instead of real-time. This breaks our automation workflows. Started happening this week.',
    status: 'resolved',
    priority: 'high',
    category: 'bug',
    customerEmail: 'devops@automation.tech',
    customerName: 'James Smith',
    createdAt: daysAgo(4),
    updatedAt: daysAgo(1),
    resolvedAt: daysAgo(1),
    notes: [
      {
        id: 'note-008',
        content: 'Root cause: Queue backlog due to traffic spike. Scaled up workers.',
        authorId: 'user-eng-1',
        authorName: 'Alex Rivera',
        createdAt: daysAgo(2),
      },
      {
        id: 'note-009',
        content: 'Confirmed with customer that webhooks are now real-time.',
        authorId: 'user-cs-1',
        authorName: 'Emma Wilson',
        createdAt: daysAgo(1),
      },
    ],
    tags: ['webhooks', 'performance', 'infrastructure'],
  },
  {
    id: 'fb-011',
    title: 'Add ability to @mention team members',
    content: 'When adding internal notes, it would be great to @mention colleagues to notify them. Like Slack or Notion.',
    status: 'new',
    priority: 'medium',
    category: 'feature-request',
    customerEmail: 'team.lead@collaborative.io',
    customerName: 'Amanda Torres',
    createdAt: hoursAgo(8),
    updatedAt: hoursAgo(8),
    resolvedAt: null,
    notes: [],
    tags: ['collaboration', 'notifications', 'mentions'],
  },
  {
    id: 'fb-012',
    title: 'Charts are not accessible to screen readers',
    content: 'I use a screen reader and the analytics charts don\'t have any alt text or ARIA labels. This makes the dashboard unusable for me.',
    status: 'new',
    priority: 'high',
    category: 'bug',
    customerEmail: 'accessibility@inclusive.org',
    customerName: 'Daniel Brown',
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
    resolvedAt: null,
    notes: [],
    tags: ['accessibility', 'a11y', 'screen-reader', 'charts'],
  },
  {
    id: 'fb-013',
    title: 'Duplicate email notifications',
    content: 'I\'m getting 2-3 copies of every notification email. Started about a week ago. Very annoying - my inbox is flooded.',
    status: 'resolved',
    priority: 'medium',
    category: 'bug',
    customerEmail: 'inbox.overflow@email.net',
    customerName: 'Patricia Miller',
    createdAt: daysAgo(6),
    updatedAt: daysAgo(3),
    resolvedAt: daysAgo(3),
    notes: [
      {
        id: 'note-010',
        content: 'Found duplicate email subscriptions in database. Cleaned up.',
        authorId: 'user-eng-1',
        authorName: 'Alex Rivera',
        createdAt: daysAgo(4),
      },
    ],
    tags: ['notifications', 'email', 'duplicates'],
  },
  {
    id: 'fb-014',
    title: 'API rate limits too restrictive',
    content: 'We\'re hitting rate limits with only 100 req/min. For enterprise customers, this should be much higher. Blocking our integration.',
    status: 'in-review',
    priority: 'high',
    category: 'improvement',
    customerEmail: 'api.heavy@integration.co',
    customerName: 'Robert Taylor',
    createdAt: daysAgo(3),
    updatedAt: daysAgo(1),
    resolvedAt: null,
    notes: [
      {
        id: 'note-011',
        content: 'Temporarily increased limits to 500/min for this customer.',
        authorId: 'user-eng-1',
        authorName: 'Alex Rivera',
        createdAt: daysAgo(2),
      },
    ],
    tags: ['api', 'rate-limits', 'enterprise'],
  },
  {
    id: 'fb-015',
    title: 'Date picker is confusing',
    content: 'The date range picker on reports is not intuitive. Took me 10 minutes to figure out. Maybe add presets like "Last 7 days", "Last month".',
    status: 'archived',
    priority: 'low',
    category: 'improvement',
    customerEmail: 'ux.feedback@design.studio',
    customerName: 'Jennifer Adams',
    createdAt: daysAgo(60),
    updatedAt: daysAgo(45),
    resolvedAt: null,
    notes: [
      {
        id: 'note-012',
        content: 'Added to design backlog for next quarter.',
        authorId: 'user-pm-1',
        authorName: 'Jessica Lee',
        createdAt: daysAgo(45),
      },
    ],
    tags: ['ux', 'date-picker', 'reports'],
  },
];

// Simulate network latency
export const simulateLatency = (min = 100, max = 500): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Simulate random failures (10% chance)
export const maybeFailRandomly = (): void => {
  if (Math.random() < 0.1) {
    throw new Error('Network error: Failed to fetch data');
  }
};
