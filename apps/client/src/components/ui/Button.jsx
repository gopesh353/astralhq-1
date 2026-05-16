import { cn } from "../../lib/utils";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  loading,
  ...props
}) {
  const variants = {
    primary:
      "bg-cyan text-bg font-semibold hover:shadow-[0_0_24px_rgba(0,229,255,0.4)] disabled:opacity-50",
    secondary:
      "glass text-text hover:border-cyan/30 glow-cyan-hover",
    ghost: "text-muted hover:text-cyan hover:bg-cyan/5",
    danger: "bg-danger/20 text-danger hover:bg-danger/30",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
}
