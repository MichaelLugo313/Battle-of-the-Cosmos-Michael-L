import { useState } from 'react';
import { Save, Trash2 } from 'lucide-react';

export function SavePage() {
  const [saveSlots, setSaveSlots] = useState([
    { 
      id: 1, 
      isEmpty: false, 
      location: 'The Nebula Drift',
      date: '2025-11-06 14:32',
      health: 4,
      hullIntegrity: 85
    },
    { 
      id: 2, 
      isEmpty: false, 
      location: 'Unknown Planet Surface',
      date: '2025-11-05 09:15',
      health: 3,
      hullIntegrity: 72
    },
    { id: 3, isEmpty: true },
    { id: 4, isEmpty: true },
    { id: 5, isEmpty: true },
    { id: 6, isEmpty: true },
  ]);

  const handleSave = (slotId) => {
    console.log('Saving to slot:', slotId);
    // Save game logic would go here
    
    // Generate date in format: YYYY-MM-DD HH:MM
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    
    setSaveSlots(saveSlots.map(slot => 
      slot.id === slotId 
        ? { 
            ...slot, 
            isEmpty: false, 
            location: 'The Nebula Drift',
            date: formattedDate,
            health: 4,
            hullIntegrity: 85
          }
        : slot
    ));
  };

  const handleDelete = (slotId) => {
    console.log('Deleting slot:', slotId);
    setSaveSlots(saveSlots.map(slot => 
      slot.id === slotId 
        ? { id: slot.id, isEmpty: true }
        : slot
    ));
  };

  return (
    <div className="save-load-page">
      <h2>Save Game</h2>
      
      <div>
        {saveSlots.map((slot) => (
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
                  <div className="save-slot-location">{slot.location}</div>
                  <div className="save-slot-details">
                    {slot.date} • Health: {slot.health}/4 • Hull: {slot.hullIntegrity}%
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="save-slot-actions">
              <button
                onClick={() => handleSave(slot.id)}
                className="btn btn-primary btn-sm"
              >
                <div className="gap-2">
                  <Save className="icon-sm" />
                  <span>Save</span>
                </div>
              </button>
              
              {!slot.isEmpty && (
                <button
                  onClick={() => handleDelete(slot.id)}
                  className="btn btn-outline btn-sm"
                >
                  <div className="gap-2">
                    <Trash2 className="icon-sm" />
                    <span>Delete</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}