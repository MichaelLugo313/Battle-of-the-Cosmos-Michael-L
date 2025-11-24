import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Trash2 } from 'lucide-react';
import { ConfirmDialog } from './ConfirmDialog';
import { DeleteButton } from './DeleteButton';
import { LoadButton } from './LoadButton';
import { loadGameFromSlot, deleteSaveSlot, getAllSaveSlots, formatSaveDate, getLocationName } from '../utils/saveLoadUtils';
import { storyPages } from '../data/storyPages';
import { toast } from 'sonner';

export function LoadPage() {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState(null);
  const [saveSlots, setSaveSlots] = useState([]);

  // Load save slots from localStorage on mount
  useEffect(() => {
    loadSaveSlots();
  }, []);

  const loadSaveSlots = () => {
    const slots = getAllSaveSlots();
    setSaveSlots(slots);
  };

  const handleLoad = (slotId) => {
    const saveData = loadGameFromSlot(slotId);
    
    if (!saveData) {
      toast.error('Failed to load game. Save data not found.');
      return;
    }

    try {
      // Store the loaded game state in temporary storage
      localStorage.setItem('battle-cosmos-current-game', JSON.stringify(saveData));
      
      toast.success(`Game loaded from Slot ${slotId}!`);
      
      // Navigate to story page with loaded state
      navigate('/story', { state: { loadedGame: saveData } });
    } catch (error) {
      console.error('Error loading game:', error);
      toast.error('Failed to load game. Please try again.');
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
      <h2>Load Game</h2>
      
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
                <LoadButton
                  onClick={() => handleLoad(slot.id)}
                  disabled={slot.isEmpty}
                />
                
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