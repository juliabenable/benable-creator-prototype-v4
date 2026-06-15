export default function EmptyState({ kind }) {
  if (kind === 'new') {
    return (
      <div className="empty">
        <div className="empty__icon" aria-hidden="true">🔔</div>
        <h2 className="empty__title">Stay tuned!</h2>
        <p className="empty__sub">We'll notify you when a campaign is ready.</p>
        <div className="empty__expect">
          <div className="empty__expect-h">What to Expect</div>
          {[
            ['🤝', 'Brand Match', 'Get matched with brands that align with your content style.'],
            ['📄', 'Campaign Brief', 'Receive a detailed brief.'],
            ['🎁', 'Products you love', 'Get products shipped to you.'],
            ['🎬', 'Create & Submit', 'Create authentic content and submit for review.'],
            ['💸', 'Get Compensated', 'Earn products, and unlock more.'],
          ].map(([emoji, t, d]) => (
            <div className="empty__row" key={t}>
              <span className="empty__row-emoji" aria-hidden="true">{emoji}</span>
              <span><b>{t}</b><br /><span className="empty__row-d">{d}</span></span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  const copy = kind === 'active'
    ? ['No active campaigns yet', "When you jump into a campaign, you'll see it right here."]
    : ['No finished campaigns yet', 'Your completed collabs will live here. Go rewatch some magic!'];
  return (
    <div className="empty">
      <div className="empty__icon" aria-hidden="true">🗂️</div>
      <h2 className="empty__title">{copy[0]}</h2>
      <p className="empty__sub">{copy[1]}</p>
    </div>
  );
}
