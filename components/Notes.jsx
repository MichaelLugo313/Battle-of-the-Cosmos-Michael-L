import { useState } from 'react';
import { FileText, Save, Edit, Trash2 } from 'lucide-react';
import { ConfirmDialog } from './ConfirmDialog';
import { DeleteButton } from './DeleteButton';
import { SaveButton } from './SaveButton';

export function Notes() {
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleSave = () => {
    setSavedNotes(notes);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setNotes(savedNotes);
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setNotes('');
    setSavedNotes('');
    setIsEditing(false);
    setDeleteDialogOpen(false);
  };

  const handleCancel = () => {
    setNotes(savedNotes);
    setIsEditing(false);
  };

  const showEditMode = isEditing || (!savedNotes && !isEditing);

  return (
    <div className="notes">
      <div className="notes-header">
        <div className="notes-title">
          <FileText className="icon" />
          <span>Captain's Log</span>
        </div>
        <div className="notes-actions">
          {showEditMode ? (
            <>
              <SaveButton
                onClick={handleSave}
                disabled={!notes.trim()}
              />
              {savedNotes && (
                <button
                  className="btn btn-outline btn-sm"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </>
          ) : (
            <>
              <button
                className="btn btn-outline btn-sm"
                onClick={handleEdit}
              >
                <div className="flex items-center gap-2">
                  <Edit className="icon-sm" />
                  <span>Edit</span>
                </div>
              </button>
              <DeleteButton onClick={handleDeleteClick} />
            </>
          )}
        </div>
      </div>

      {showEditMode ? (
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Record your observations and mission notes here..."
          className="notes-textarea"
        />
      ) : (
        <div className="notes-display">
          {savedNotes || <span className="notes-placeholder">No notes recorded</span>}
        </div>
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Captain's Log?"
        description="Are you sure you want to delete your Captain's Log? This action cannot be undone."
        icon="🗑️"
      />
    </div>
  );
}