/* ============================================================
   Goodbite — Badge UI Component
   ============================================================ */
export const Badge = ({ children, variant = 'neutral', className = '' }) => {
  const base = `badge badge-${variant}`;
  return (
    <span className={[base, className].filter(Boolean).join(' ').trim()}>
      {children}
    </span>
  );
};

export default Badge;
