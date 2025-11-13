import { useState } from 'react';
import { Upload, Trash2 } from 'lucide-react';

export function LoadPage() {
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

  const handleLoad = (slotId) => {
    console.log('Loading slot:', slotId);
    // Load game logic would go here
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
      <h2>Load Game</h2>
      
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
                onClick={() => handleLoad(slot.id)}
                className="btn btn-primary btn-sm"
                disabled={slot.isEmpty}
              >
                <div className="gap-2">
                  <Upload className="icon-sm" />
                  <span>Load</span>
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
