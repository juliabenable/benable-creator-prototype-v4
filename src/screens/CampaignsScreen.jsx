import { useState } from 'react';
import EmptyState from './EmptyState.jsx';
import ThankYouGrid from './ThankYouGrid.jsx';

const SUBTABS = ['New', 'Active', 'Finished'];

export default function CampaignsScreen({ collabs, onOpenCard }) {
  const [sub, setSub] = useState('Finished');

  return (
    <div className="campaigns">
      <div className="subtabs" role="tablist" aria-label="Campaign status">
        {SUBTABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={sub === t}
            className={'subtabs__item' + (sub === t ? ' subtabs__item--active' : '')}
            onClick={() => setSub(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="campaigns__body campaigns__body--wall">
        {sub === 'New' && <EmptyState kind="new" />}
        {sub === 'Active' && <EmptyState kind="active" />}
        {sub === 'Finished' && (
          collabs.length
            ? <ThankYouGrid collabs={collabs} onOpenCard={onOpenCard} />
            : <EmptyState kind="finished" />
        )}
      </div>
    </div>
  );
}
