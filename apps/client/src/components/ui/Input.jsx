import { cn } from "../../lib/utils";

export function Input({ label, error, className, ...props }) {
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-sm text-muted">{label}</span>}
      <input
        className={cn(
          "w-full rounded-lg border border-cyan/10 bg-surface px-4 py-2.5 text-text outline-none transition focus:border-cyan/40 focus:ring-2 focus:ring-cyan/10",
          error && "border-danger/50",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-danger">{error}</span>}
    </label>
  );
}
