import PolaroidPostcard from '../components/PolaroidPostcard.jsx';

// Gentle, hand-placed tilts cycled by position so the grid feels pinned
// rather than mechanical. Kept small so the cards still read as a grid.
const TILTS = [-3, 2.5, -2.5, 3, -2, 3.5];

function frontProps(c) {
  return {
    thumbnailUrl: c.post.thumbnailUrl,
    photos: c.post.photos,
    platform: c.post.platform,
    brandName: c.brandName,
    message: c.postcard.message,
    signoff: c.postcard.signoff,
    signerAvatar: c.postcard.signerAvatar,
  };
}

/**
 * Shelf Grid (design study direction C) — the creator's finished thank-yous
 * as a tidy 2-up grid of slightly tilted polaroids, each labelled with its
 * brand + campaign below. Tapping a card opens it in the focused lightbox
 * (see FocusedCard) where it can be flipped and browsed.
 */
export default function ThankYouGrid({ collabs, onOpenCard }) {
  const count = collabs.length;

  return (
    <div className="grid">
      <div className="grid__head">
        <span className="grid__count">{count} {count === 1 ? 'thank-you' : 'thank-yous'}</span>
        <span className="grid__sub">your collection so far</span>
      </div>

      <div className="grid__grid">
        {collabs.map((c, i) => (
          <div className="grid__cell" key={c.campaignId}>
            <button
              type="button"
              className="grid__card"
              style={{ '--tilt': `${TILTS[i % TILTS.length]}deg` }}
              onClick={() => onOpenCard(i)}
              aria-label={`Open thank-you from ${c.brandName}`}
            >
              <span className="grid__card-inner">
                <PolaroidPostcard {...frontProps(c)} />
              </span>
            </button>
            <div className="grid__label">
              <b>{c.brandName}</b>
              <span>{c.campaignTitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
