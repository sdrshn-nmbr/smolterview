/**
 * FeedbackDetail Component
 *
 * TASK 2: Build this component
 *
 * Requirements:
 * - Show full feedback details when a feedback item is selected
 * - Display as a modal overlay
 * - Ability to change the feedback status via dropdown
 * - A notes field where team members can add internal notes
 * - Save changes to the API (optimistic updates preferred)
 *
 * The basic structure is provided - you need to implement the logic.
 */

import React, { useState } from 'react';
import { useFeedbackDetail } from '../hooks/useFeedback';
import { formatDateTime, getStatusColor, getPriorityColor } from '../utils/helpers';
import type { FeedbackStatus, FeedbackNote } from '../types/feedback';

export function FeedbackDetail() {
  const { selectedFeedback, selectFeedback, updateFeedbackInState } = useFeedbackDetail();

  // Local state for form
  const [newNote, setNewNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  // TODO: Add more local state as needed (e.g., for optimistic updates)

  // Don't render if no feedback selected
  if (!selectedFeedback) {
    return null;
  }

  const handleClose = () => {
    selectFeedback(null);
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as FeedbackStatus;

    // TODO: Implement status update
    // Requirements:
    // 1. Optimistically update the UI immediately
    // 2. Call updateFeedback API
    // 3. If API fails, revert the optimistic update
    // 4. Show appropriate feedback to user

    console.log('Status change not implemented:', newStatus);
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newNote.trim()) return;

    // TODO: Implement add note functionality
    // Requirements:
    // 1. Call addNote API
    // 2. Update the feedback in state with new note
    // 3. Clear the input
    // 4. Handle errors

    console.log('Add note not implemented:', newNote);
  };

  // TODO: Handle keyboard events for accessibility (Escape to close)

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-labelledby="feedback-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="modal-header">
          <h2 id="feedback-title">{selectedFeedback.title}</h2>
          <button
            className="close-button"
            onClick={handleClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Main Content */}
        <div className="modal-body">
          {/* Status and Priority Badges */}
          <div className="feedback-badges">
            <span className={`status-badge ${getStatusColor(selectedFeedback.status)}`}>
              {selectedFeedback.status}
            </span>
            <span className={`priority-badge ${getPriorityColor(selectedFeedback.priority)}`}>
              {selectedFeedback.priority}
            </span>
            <span className="category-badge">{selectedFeedback.category}</span>
          </div>

          {/* Customer Info */}
          <div className="customer-info">
            <strong>From:</strong> {selectedFeedback.customerName} (
            {selectedFeedback.customerEmail})
          </div>

          {/* Timestamps */}
          <div className="timestamps">
            <span>Created: {formatDateTime(selectedFeedback.createdAt)}</span>
            <span>Updated: {formatDateTime(selectedFeedback.updatedAt)}</span>
            {selectedFeedback.resolvedAt && (
              <span>Resolved: {formatDateTime(selectedFeedback.resolvedAt)}</span>
            )}
          </div>

          {/* Full Content */}
          <div className="feedback-content">
            <h3>Feedback</h3>
            <p>{selectedFeedback.content}</p>
          </div>

          {/* Tags */}
          {selectedFeedback.tags.length > 0 && (
            <div className="feedback-tags-full">
              <h3>Tags</h3>
              <div className="tags-list">
                {selectedFeedback.tags.map(tag => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Status Update Section */}
          <div className="status-update-section">
            <h3>Update Status</h3>
            <select
              value={selectedFeedback.status}
              onChange={handleStatusChange}
              disabled={isSaving}
            >
              <option value="new">New</option>
              <option value="in-review">In Review</option>
              <option value="resolved">Resolved</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Notes Section */}
          <div className="notes-section">
            <h3>Internal Notes ({selectedFeedback.notes.length})</h3>

            {/* Existing Notes */}
            <div className="notes-list">
              {selectedFeedback.notes.length === 0 ? (
                <p className="no-notes">No notes yet. Add one below.</p>
              ) : (
                selectedFeedback.notes.map(note => (
                  <NoteItem key={note.id} note={note} />
                ))
              )}
            </div>

            {/* Add New Note Form */}
            <form onSubmit={handleAddNote} className="add-note-form">
              <textarea
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                placeholder="Add an internal note..."
                rows={3}
                disabled={isSaving}
              />
              <button type="submit" disabled={isSaving || !newNote.trim()}>
                {isSaving ? 'Adding...' : 'Add Note'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Individual note display
 */
interface NoteItemProps {
  note: FeedbackNote;
}

function NoteItem({ note }: NoteItemProps) {
  return (
    <div className="note-item">
      <div className="note-header">
        <span className="note-author">{note.authorName}</span>
        <span className="note-date">{formatDateTime(note.createdAt)}</span>
      </div>
      <p className="note-content">{note.content}</p>
    </div>
  );
}
