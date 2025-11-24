import { Package, Play, Trash2 } from 'lucide-react';
import { InventoryActionButton } from './InventoryActionButton';

export function Inventory({ items, onUseItem, onDeleteItem, onShowDescription, usableItemIds = [], health = 4, maxHealth = 4, mode = 'Ship', currentPage }) {
  const inventoryLabel = mode === 'On Foot' ? 'Inventory' : 'Cargo Bay';
  
  return (
    <div className="space-y-4">
      {/* Health Hearts */}
      <div className="health-hearts">
        <div className="health-hearts-content">
          <span className="health-label">Health</span>
          {Array.from({ length: maxHealth }).map((_, index) => (
            <span key={index} className="heart-icon">
              {index < health ? '❤️' : '🤍'}
            </span>
          ))}
        </div>
      </div>

      {/* Cargo Bay / Inventory */}
      <div className="cargo-bay">
        <div className="cargo-header">
          <div className="cargo-title">
            <Package className="icon" />
            <span>{inventoryLabel}</span>
          </div>
          <span className="cargo-count">
            {items.length}/6
          </span>
        </div>
      
      {items.length === 0 ? (
        <p className="inventory-empty">No items stored</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const isQuantumScanner = item.name === 'Quantum Scanner';
            const shouldHighlight = isQuantumScanner && currentPage === 10;
            const isUsable = usableItemIds.includes(item.id);
            const itemClass = `inventory-item ${shouldHighlight || isUsable ? 'usable-item' : ''}`;
            return (
              <div
                key={item.id}
                className={itemClass}
              >
                <span className="inventory-item-icon">{item.icon}</span>
                <span className="inventory-item-name">{item.name}</span>
                <div className="inventory-item-actions">
                  <InventoryActionButton
                    icon={Play}
                    onClick={() => {
                      onShowDescription?.(item);
                      onUseItem?.(item.id);
                    }}
                    title="Use item"
                    disabled={!isUsable}
                  />
                  <InventoryActionButton
                    icon={Trash2}
                    onClick={() => onDeleteItem?.(item.id)}
                    title="Delete item"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
}