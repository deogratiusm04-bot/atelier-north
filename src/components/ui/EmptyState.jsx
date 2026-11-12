/* ============================================================
   Goodbite — EmptyState UI Component
   ============================================================ */
import { Button } from './Button';

export const EmptyState = ({ icon = '📭', title, description, action, actionLabel }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div
        style={{
          fontSize: '4rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="text-muted mt-2 max-w-xs">{description}</p>}
      {action && actionLabel && (
        <Button variant="primary" onClick={action} className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
