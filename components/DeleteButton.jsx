import { Trash2 } from 'lucide-react';

export function DeleteButton({ onClick, disabled = false, children = 'Delete', className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-outline btn-sm ${className}`}
      disabled={disabled}
    >
      <div className="flex items-center gap-2">
        <Trash2 className="icon-sm" />
        <span>{children}</span>
      </div>
    </button>
  );
}