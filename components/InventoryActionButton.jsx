export function InventoryActionButton({ icon: Icon, onClick, title, className = '' }) {
  return (
    <button
      className={`btn btn-ghost btn-icon ${className}`}
      onClick={onClick}
      title={title}
    >
      <Icon className="icon-sm" />
    </button>
  );
}
