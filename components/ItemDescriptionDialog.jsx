export function ItemDescriptionDialog({ 
  open, 
  onOpenChange, 
  item
}) {
  if (!open || !item) return null;

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <div className="inventory-full-dialog" onClick={handleClose}>
      <div className="inventory-full-content" onClick={(e) => e.stopPropagation()}>
        <div className="inventory-full-header">
          <h2 className="inventory-full-title">
            <span className="inventory-full-icon">{item.icon}</span>
            {item.name}
          </h2>
        </div>
        <p className="inventory-full-description">
          {item.description || 'No description available.'}
        </p>
        <div className="inventory-full-footer">
          <button
            onClick={handleClose}
            className="inventory-full-button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
