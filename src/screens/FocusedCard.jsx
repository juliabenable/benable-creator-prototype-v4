import { useEffect, useRef, useState } from 'react';
import PolaroidPostcard from '../components/PolaroidPostcard.jsx';
import PolaroidBackNote from '../components/PolaroidBackNote.jsx';

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
function formatSentAt(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

/**
 * Focused lightbox — tapping a card in the grid brings it to the foreground
 * over a blurred, dimmed backdrop. Here the creator can flip the polaroid to
 * the brand's private note and move between cards (arrows / arrow keys), then
 * dismiss by tapping the backdrop, the close button, or Escape.
 */
export default function FocusedCard({ collabs, index, onClose, onIndex }) {
  const [flipped, setFlipped] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef(null);

  const c = collabs[index];
  const canFlip = !!c.privateNote;
  const atStart = index === 0;
  const atEnd = index === collabs.length - 1;

  // Reset the flip whenever a different card comes to the front.
  useEffect(() => { setFlipped(false); }, [index]);
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  function close() {
    setClosing(true);
    closeTimer.current = window.setTimeout(onClose, 200);
  }
  function nav(delta) {
    const n = Math.min(collabs.length - 1, Math.max(0, index + delta));
    if (n !== index) onIndex(n);
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') nav(1);
      else if (e.key === 'ArrowLeft') nav(-1);
      else if (e.key === 'Enter' || e.key === ' ') { if (canFlip) setFlipped((f) => !f); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div
      className={'focus' + (closing ? ' focus--out' : '')}
      role="dialog"
      aria-modal="true"
      aria-label={`Thank-you from ${c.brandName}`}
      onClick={close}
    >
      <button className="focus__close" onClick={(e) => { e.stopPropagation(); close(); }} aria-label="Close">×</button>

      {collabs.length > 1 && (
        <>
          <button
            className="focus__arrow focus__arrow--prev"
            disabled={atStart}
            onClick={(e) => { e.stopPropagation(); nav(-1); }}
            aria-label="Previous thank-you"
          >‹</button>
          <button
            className="focus__arrow focus__arrow--next"
            disabled={atEnd}
            onClick={(e) => { e.stopPropagation(); nav(1); }}
            aria-label="Next thank-you"
          >›</button>
        </>
      )}

      <div className="focus__center" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          key={index}
          className="focus__card"
          onClick={() => canFlip && setFlipped((f) => !f)}
          aria-label={canFlip
            ? (flipped ? `Private note from ${c.brandName}, tap to flip back` : `Tap to read the private note from ${c.brandName}`)
            : `Thank-you from ${c.brandName}`}
        >
          <span className={'focus__flip' + (flipped ? ' is-flipped' : '')}>
            <span className="focus__face focus__face--front">
              <PolaroidPostcard {...frontProps(c)} />
            </span>
            <span className="focus__face focus__face--back">
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

        <p className="focus__meta">
          <span className="focus__brand">{c.brandName}</span> · {c.campaignTitle}
          <span className="focus__date">{formatSentAt(c.postcard.sentAt)}</span>
        </p>

        {canFlip && (
          <button
            type="button"
            className="focus__hint"
            onClick={(e) => { e.stopPropagation(); setFlipped((f) => !f); }}
          >
            {flipped ? 'back to the photo' : 'tap the card to read their note'}
          </button>
        )}

        {collabs.length > 1 && (
          <div className="focus__dots" aria-hidden="true">
            {collabs.map((_, i) => <i key={i} className={i === index ? 'on' : ''} />)}
          </div>
        )}
      </div>
    </div>
  );
}
