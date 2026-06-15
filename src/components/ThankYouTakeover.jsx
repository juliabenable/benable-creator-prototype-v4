import { useEffect, useRef, useState } from 'react';
import PolaroidPostcard from './PolaroidPostcard.jsx';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// phase: 'sealed' | 'opening' | 'revealed' | 'flying' | 'dismissed'
export default function ThankYouTakeover({ postcard, post, brandName, onDismiss }) {
  const reduced = prefersReducedMotion();
  const [phase, setPhase] = useState(reduced ? 'revealed' : 'sealed');
  const [scrimOut, setScrimOut] = useState(false);
  const openTimerRef = useRef(null);
  const flyTimerRef = useRef(null);
  const dismissTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(openTimerRef.current);
      clearTimeout(flyTimerRef.current);
      clearTimeout(dismissTimerRef.current);
    };
  }, []);

  function openEnvelope() {
    if (phase !== 'sealed') return;
    setPhase('opening');
    openTimerRef.current = window.setTimeout(() => setPhase('revealed'), 650);
  }

  // Two dismiss paths: 'wall' (revealed -> flying -> unmount) and 'quick' (any -> dismissed -> unmount).
  function dismissToWall() {
    if (phase !== 'revealed') return;
    setPhase('flying');
    setScrimOut(true);
    flyTimerRef.current = window.setTimeout(onDismiss, 620);
  }
  function quickDismiss() {
    setPhase('dismissed');
    setScrimOut(true);
    dismissTimerRef.current = window.setTimeout(onDismiss, 320);
  }

  function onScrimClick(e) {
    if (phase !== 'revealed') return;
    if (e.target.closest('.tyt-envelope') || e.target.closest('button')) return;
    dismissToWall();
  }

  return (
    <div
      className={'tyt-scrim' + (scrimOut ? ' tyt-scrim--out' : '')}
      role="dialog"
      aria-modal="true"
      onClick={onScrimClick}
    >
      <div className={'tyt-stage tyt--' + phase}>
        <button
          type="button"
          className="tyt-envelope"
          onClick={openEnvelope}
          aria-label={phase === 'sealed' ? `Open the thank-you from ${brandName}` : 'Thank-you postcard'}
        >
          <span className="tyt-env-back" aria-hidden="true" />
          <span className="tyt-polaroid-wrap" aria-hidden={(phase === 'revealed' || phase === 'flying') ? undefined : true}>
            <PolaroidPostcard
              thumbnailUrl={post.thumbnailUrl}
              photos={post.photos}
              platform={post.platform}
              brandName={brandName}
              message={postcard.message}
              signoff={postcard.signoff}
              signerAvatar={postcard.signerAvatar}
            />
          </span>
          <span className="tyt-env-front" aria-hidden="true" />
          <span className="tyt-env-flap" aria-hidden="true" />
          <span className="tyt-seal" aria-hidden="true">♥</span>
          {[...Array(10)].map((_, i) => (
            <span key={i} className={'tyt-cp tyt-cp--' + (i + 1)} aria-hidden="true" />
          ))}
        </button>

        <p className="tyt-caption">
          {phase === 'sealed'
            ? `${brandName} sent you a thank-you`
            : phase === 'revealed'
              ? 'tap outside to put it on your wall'
              : ' '}
        </p>
        {phase === 'sealed' && (
          <button type="button" className="tyt-skip" onClick={quickDismiss}>Maybe later</button>
        )}
      </div>
    </div>
  );
}
