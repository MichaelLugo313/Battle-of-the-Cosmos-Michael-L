import { useState, useEffect } from 'react';
import { Save, Trash2 } from 'lucide-react';
import { ConfirmDialog } from './ConfirmDialog';
import { DeleteButton } from './DeleteButton';
import { SaveButton } from './SaveButton';
import { saveGameToSlot, deleteSaveSlot, getAllSaveSlots, formatSaveDate, getLocationName } from '../utils/saveLoadUtils';
import { storyPages } from '../data/storyPages';
import { toast } from 'sonner';
import { useGameState } from '../contexts/GameStateContext';

export function SavePage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState(null);
  const [saveSlots, setSaveSlots] = useState([]);
  const { loadGameState } = useGameState();

  // Load save slots from localStorage on mount
  useEffect(() => {
    loadSaveSlots();
  }, []);

  const loadSaveSlots = () => {
    const slots = getAllSaveSlots();
    setSaveSlots(slots);
  };

  const handleSave = (slotId) => {
    // Get current game state from in-memory context
    const currentGameState = loadGameState();
    
    if (!currentGameState) {
      toast.error('No active game to save. Please start a game first.');
      return;
    }

    try {
      const success = saveGameToSlot(slotId, currentGameState);
      
      if (success) {
        toast.success(`Game saved to Slot ${slotId}!`);
        loadSaveSlots(); // Refresh the save slots display
      } else {
        toast.error('Failed to save game. Please try again.');
      }
    } catch (error) {
      console.error('Error saving game:', error);
      toast.error('Failed to save game. Please try again.');
    }
  };

  const handleDelete = (slotId) => {
    setDeleteDialogOpen(true);
    setSlotToDelete(slotId);
  };

  const confirmDelete = () => {
    if (slotToDelete) {
      const success = deleteSaveSlot(slotToDelete);
      
      if (success) {
        toast.success(`Slot ${slotToDelete} deleted.`);
        loadSaveSlots(); // Refresh the save slots display
      } else {
        toast.error('Failed to delete save. Please try again.');
      }
    }
    setDeleteDialogOpen(false);
    setSlotToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setSlotToDelete(null);
  };

  return (
    <div className="save-load-page">
      <h2>Save Game</h2>
      
      <div>
        {saveSlots.map((slot) => {
          const location = slot.isEmpty ? null : getLocationName(slot.currentPage, storyPages);
          const formattedDate = slot.isEmpty ? null : formatSaveDate(slot.timestamp);
          
          return (
            <div
              key={slot.id}
              className="save-slot"
            >
              {/* Slot Number */}
              <div className="save-slot-number">
                Slot {slot.id}
              </div>

              {/* Slot Content */}
              <div className="save-slot-content">
                {slot.isEmpty ? (
                  <span className="save-slot-empty">Empty Slot</span>
                ) : (
                  <div>
                    <div className="save-slot-location">{location}</div>
                    <div className="save-slot-details">
                      {formattedDate} • Health: {slot.health}/{slot.maxHealth} • Hull: {slot.hullIntegrity}%
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="save-slot-actions">
                <SaveButton onClick={() => handleSave(slot.id)} />
                
                {!slot.isEmpty && (
                  <DeleteButton onClick={() => handleDelete(slot.id)} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {deleteDialogOpen && (
        <ConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={confirmDelete}
          title="Delete Save File?"
          description="Are you sure you want to delete this save file? This action cannot be undone."
          icon="🗑️"
        />
      )}
    </div>
  );
}