import { useState } from 'react';
import PolaroidPostcard from '../components/PolaroidPostcard.jsx';
import PolaroidBackNote from '../components/PolaroidBackNote.jsx';

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
 * brand + campaign below. Tapping a card flips it in place to the brand's
 * private note (cards without a note don't flip).
 */
export default function ThankYouGrid({ collabs }) {
  const [flipped, setFlipped] = useState(() => new Set());

  function toggle(i) {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  const count = collabs.length;

  return (
    <div className="grid">
      <div className="grid__head">
        <span className="grid__count">{count} {count === 1 ? 'thank-you' : 'thank-yous'}</span>
        <span className="grid__sub">your collection so far</span>
      </div>

      <div className="grid__grid">
        {collabs.map((c, i) => {
          const canFlip = !!c.privateNote;
          const isFlipped = flipped.has(i);
          return (
            <div className="grid__cell" key={c.campaignId}>
              <button
                type="button"
                className={'grid__card' + (canFlip ? '' : ' grid__card--no-flip')}
                style={{ '--tilt': `${TILTS[i % TILTS.length]}deg` }}
                onClick={() => canFlip && toggle(i)}
                aria-label={canFlip
                  ? (isFlipped ? `Private note from ${c.brandName}, tap to flip back` : `Thank-you from ${c.brandName}, tap to read their private note`)
                  : `Thank-you from ${c.brandName}`}
              >
                <span className={'grid__flip' + (isFlipped ? ' is-flipped' : '')}>
                  <span className="grid__face grid__face--front">
                    <PolaroidPostcard {...frontProps(c)} />
                  </span>
                  <span className="grid__face grid__face--back">
                    {c.privateNote && (
                      <PolaroidBackNote
                        brandName={c.brandName}
                        message={c.privateNote.message}
                        signoff={c.privateNote.signoff}
                      />
                    )}
                  </span>
                </span>
              </button>
              <div className="grid__label">
                <b>{c.brandName}</b>
                <span>{c.campaignTitle}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
