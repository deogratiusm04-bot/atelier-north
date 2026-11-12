/* ============================================================
   Goodbite — Loader UI Component
   ============================================================ */
export const Loader = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-14 h-14 border-4',
  };
  return (
    <div
      className={['loader', sizes[size], className].filter(Boolean).join(' ').trim()}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Loader;
