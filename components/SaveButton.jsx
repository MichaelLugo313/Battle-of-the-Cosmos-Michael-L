import { Save } from 'lucide-react';

export function SaveButton({ onClick, disabled = false, children = 'Save', className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-primary btn-sm ${className}`}
      disabled={disabled}
    >
      <div className="flex items-center gap-2">
        <Save className="icon-sm" />
        <span>{children}</span>
      </div>
    </button>
  );
}