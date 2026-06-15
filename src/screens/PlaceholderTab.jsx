export default function PlaceholderTab({ label }) {
  return (
    <div className="empty" style={{ paddingTop: 80 }}>
      <div className="empty__icon" aria-hidden="true">✨</div>
      <h2 className="empty__title">{label}</h2>
      <p className="empty__sub">Coming soon.</p>
    </div>
  );
}
