import { useState, useEffect, useRef } from 'react';
import MobileShell from './shell/MobileShell.jsx';
import CampaignsScreen from './screens/CampaignsScreen.jsx';
import PlaceholderTab from './screens/PlaceholderTab.jsx';
import ThankYouTakeover from './components/ThankYouTakeover.jsx';
import FocusedCard from './screens/FocusedCard.jsx';
import ResetFab from './components/ResetFab.jsx';
import {
  seedDemoPostcardsIfMissing, getFinishedCollabs, newestCollab, hasSeen, markSeen,
} from './utils/creatorStorage.js';

const TAB_LABELS = { home: 'Home', discover: 'Discover', profile: 'Profile' };

export default function App() {
  const [tab, setTab] = useState('campaigns');
  const [takeoverOpen, setTakeoverOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(null);

  // Seed synchronously before children render so the grid has data on the
  // very first paint (idempotent + non-destructive — safe under StrictMode).
  const seeded = useRef(false);
  if (!seeded.current) {
    seedDemoPostcardsIfMissing();
    seeded.current = true;
  }

  const collabs = getFinishedCollabs();
  const newest = newestCollab();

  // The takeover plays the NEWEST thank-you the first time it's seen.
  useEffect(() => {
    if (tab !== 'campaigns') return;
    const n = newestCollab();
    if (n && !hasSeen(n.campaignId, n.creatorHandle)) setTakeoverOpen(true);
  }, [tab]);

  function dismissTakeover() {
    if (newest) markSeen(newest.campaignId, newest.creatorHandle);
    setTakeoverOpen(false);
  }

  const overlay = takeoverOpen && newest
    ? (
      <ThankYouTakeover
        postcard={newest.postcard}
        post={newest.post}
        brandName={newest.brandName}
        onDismiss={dismissTakeover}
      />
    )
    : focusedIndex != null && collabs[focusedIndex]
      ? (
        <FocusedCard
          collabs={collabs}
          index={focusedIndex}
          onClose={() => setFocusedIndex(null)}
          onIndex={setFocusedIndex}
        />
      )
      : null;

  return (
    <MobileShell
      title={tab === 'campaigns' ? 'Campaigns' : TAB_LABELS[tab]}
      activeTab={tab}
      onSelectTab={setTab}
      overlay={overlay}
      fab={<ResetFab />}
    >
      {tab === 'campaigns'
        ? <CampaignsScreen collabs={collabs} onOpenCard={setFocusedIndex} />
        : <PlaceholderTab label={TAB_LABELS[tab]} />}
    </MobileShell>
  );
}
