/* ============================================================
   Goodbite — Button UI Component
   ============================================================ */
import { cloneElement, Children } from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  full = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  asChild = false,
  ...props
}) => {
  const base =
    'btn btn-' +
    variant +
    ' transition-colors ' +
    (full ? 'btn-full' : '') +
    (size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '');

  const classes = [base, className].filter(Boolean).join(' ').trim();

  // asChild: render the single child element (e.g. <Link>) with button styles
  if (asChild) {
    const child = Children.only(children);
    return cloneElement(child, {
      className: [classes, child.props.className || ''].filter(Boolean).join(' ').trim(),
      ...(disabled ? { style: { pointerEvents: 'none', opacity: 0.6 } } : {}),
    });
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};

export const IconButton = ({
  children,
  variant = 'ghost',
  size = 'md',
  onClick,
  className = '',
  title,
  ...props
}) => {
  const base = `btn-icon ${size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'} ${variant === 'primary' ? 'bg-brand text-white' : ''}`;
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={[base, className].filter(Boolean).join(' ').trim()}
      {...props}
    >
      {children}
    </button>
  );
};

Button.defaultProps = { type: 'button' };

export default Button;
