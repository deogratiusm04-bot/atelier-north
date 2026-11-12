/* ============================================================
   Goodbite — Card UI Component
   ============================================================ */
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={['card', className].filter(Boolean).join(' ').trim()}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Image = ({ src, alt, className = '' }) => (
  <img src={src} alt={alt} className={['card-image', className].join(' ')} />
);

Card.Content = ({ children, className = '' }) => (
  <div className={['card-content', className].join(' ')}>{children}</div>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={['card-footer', className].join(' ')}>{children}</div>
);

export default Card;
