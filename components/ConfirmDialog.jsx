export function ConfirmDialog({ 
  open, 
  onOpenChange, 
  onConfirm, 
  title = "Confirm Action",
  description,
  icon,
  confirmText = "Delete",
  cancelText = "Cancel"
}) {
  if (!open) return null;

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <div className="inventory-full-dialog" onClick={handleCancel}>
      <div className="inventory-full-content" onClick={(e) => e.stopPropagation()}>
        <div className="inventory-full-header">
          <h2 className="inventory-full-title">
            {icon && <span className="inventory-full-icon">{icon}</span>}
            {title}
          </h2>
        </div>
        <p className="inventory-full-description">
          {description}
        </p>
        <div className="inventory-full-footer">
          <button
            onClick={handleCancel}
            className="btn btn-outline"
            style={{ marginRight: '0.5rem' }}
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="inventory-full-button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
