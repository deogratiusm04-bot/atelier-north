/* ============================================================
   Goodbite — Input UI Component
   Accessible by default:
   · <label htmlFor> ⇄ input id association
   · error state sets aria-invalid + aria-describedby → live hint
   · optional leftIcon / trailing slot (e.g. password show switch)
   ============================================================ */
export const Input = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  disabled = false,
  error = false,
  hint,
  className = '',
  leftIcon,
  trailing,
  ...props
}) => {
  const hintId = id && hint ? `${id}-hint` : undefined;

  return (
    <div className="form-group" style={{ marginBottom: '1rem' }}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {leftIcon && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'inline-flex',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          >
            {leftIcon}
          </span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={hintId}
          className={[
            'input',
            error ? 'border-red-500 focus:border-red-500' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')
            .trim()}
          style={{
            paddingLeft: leftIcon ? '2.25rem' : undefined,
            paddingRight: trailing ? '2.75rem' : undefined,
          }}
          {...props}
        />
        {trailing && (
          <span
            style={{
              position: 'absolute',
              right: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {trailing}
          </span>
        )}
      </div>
      {hint && (
        <p
          id={hintId}
          className="form-hint"
          style={error ? { color: 'var(--error)', fontWeight: 500 } : undefined}
          aria-hidden="false"
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
