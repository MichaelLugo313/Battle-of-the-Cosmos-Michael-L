import { Upload } from 'lucide-react';

export function LoadButton({ onClick, disabled = false, children = 'Load', className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-primary btn-sm ${className}`}
      disabled={disabled}
    >
      <div className="flex items-center gap-2">
        <Upload className="icon-sm" />
        <span>{children}</span>
      </div>
    </button>
  );
}