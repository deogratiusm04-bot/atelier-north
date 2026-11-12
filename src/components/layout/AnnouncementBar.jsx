/* ============================================================
   Goodbite — Announcement Bar
   Top announcement strip above the main navigation header
   ============================================================ */
export const AnnouncementBar = () => {
  return (
    <div className="announcement-bar" role="status" aria-live="polite">
      <span className="announcement-dot" aria-hidden="true" />
      <strong>Open now</strong> &nbsp;·&nbsp; Free delivery on orders over <strong>$30</strong> &nbsp;·&nbsp; 25–40 min delivery
    </div>
  );
};

export default AnnouncementBar;
