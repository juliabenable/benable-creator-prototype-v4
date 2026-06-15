// Brand-compatible persistence. The KEY and the per-entry `postcard` shape are
// intentionally identical to benable-brand-prototype-v23 so a later iteration
// can read real brand-sent thank-yous with no refactor. The `seen` flag and
// the demo seed are creator-app-local and never written into the brand shape.
//
// v3: the creator now has a COLLECTION of finished collabs (the Finished tab
// is a swipeable keepsake deck). `post` media + brand/campaign metadata are
// NOT persisted in the shared store — they come from campaign data at render
// time, exactly as the brand app does — so only { postcard, privateNote } per
// key is stored, and the rest lives on the static collab definitions below.

const STORAGE_KEY = 'benable.creatorActions.v3';
const SEEN_PREFIX = 'benable.creator.seen.';

const U = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
const AV = (id) => `https://images.unsplash.com/photo-${id}?w=200&h=200&fit=crop&crop=faces&q=80`;

// The creator's finished collabs, newest first. Each entry's { postcard,
// privateNote } is what gets seeded into (and read back from) the shared,
// brand-compatible store; everything else (brand, campaign, post media) is
// render-time context.
export const DEMO_COLLABS = [
  {
    campaignId: 'pikora-bone-broth',
    creatorHandle: '@rmtfka',
    brandName: 'Pikora',
    campaignTitle: 'Instant Beef Bone Broth',
    post: {
      platform: 'Instagram Reel',
      thumbnailUrl: 'https://benable-followers.s3.amazonaws.com/ig-siennapierre-reel-3207770097225833451-full.jpg',
      photos: [
        'https://benable-followers.s3.amazonaws.com/ig-siennapierre-reel-3207770097225833451-full.jpg',
        U('1547592180-85f173990554'),
        U('1604908176997-125f25cc6f3d'),
      ],
    },
    postcard: {
      style: 'polaroid',
      message: 'this made our whole week — thank you for the magic ✨',
      signoff: '— Ana & the Pikora team',
      signerAvatar: AV('1544005313-94ddf0286df2'),
      sentAt: '2026-05-14T17:00:00.000Z',
    },
    privateNote: {
      message: "p.s. the way you opened the reel — totally disarming. that's exactly the energy we hoped someone would bring to this. excited to make more.",
      signoff: 'xx Ana, founder',
      sentAt: '2026-05-14T17:00:00.000Z',
    },
  },
  {
    campaignId: 'lumi-glow-serum',
    creatorHandle: '@rmtfka',
    brandName: 'Lumi Skin',
    campaignTitle: 'Glow Serum Launch',
    post: {
      platform: 'TikTok',
      thumbnailUrl: U('1556228720-195a672e8a03'),
      photos: [U('1556228720-195a672e8a03'), U('1598440947619-2c35fc9aa908')],
    },
    postcard: {
      style: 'polaroid',
      message: 'your skin, our serum — pure poetry 💧',
      signoff: '— Maya, Lumi',
      signerAvatar: AV('1438761681033-6461ffad8d80'),
      sentAt: '2026-04-09T15:00:00.000Z',
    },
    privateNote: {
      message: 'the close-up of the dropper hitting the light? we are still thinking about it. you have a real eye.',
      signoff: '— Maya',
      sentAt: '2026-04-09T15:00:00.000Z',
    },
  },
  {
    campaignId: 'brewbloom-cold-brew',
    creatorHandle: '@rmtfka',
    brandName: 'Brew & Bloom',
    campaignTitle: 'Cold Brew Summer',
    post: {
      platform: 'Instagram Story',
      thumbnailUrl: U('1461023058943-07fcbe16d735'),
      photos: [U('1461023058943-07fcbe16d735')],
    },
    postcard: {
      style: 'polaroid',
      message: 'you made cold brew look like art ☕',
      signoff: '— Diego & the B&B crew',
      signerAvatar: AV('1500648767791-00dcc994a43e'),
      sentAt: '2026-03-02T15:00:00.000Z',
    },
    privateNote: null,
  },
  {
    campaignId: 'terra-trail-capsule',
    creatorHandle: '@rmtfka',
    brandName: 'Terra Active',
    campaignTitle: 'Trail Capsule',
    post: {
      platform: 'Instagram Reel',
      thumbnailUrl: U('1551632811-561732d1e306'),
      photos: [
        U('1551632811-561732d1e306'),
        U('1454496522488-7a8e488e8606'),
        U('1469854523086-cc02fe5d8800'),
        U('1426604966848-d7adac402bff'),
      ],
    },
    postcard: {
      style: 'polaroid',
      message: 'you took us up the mountain with you ⛰️',
      signoff: '— Sam, Terra',
      signerAvatar: AV('1507003211169-0a1dd7228f2d'),
      sentAt: '2026-02-11T15:00:00.000Z',
    },
    privateNote: {
      message: 'three campaigns in and you keep raising the bar. consider yourself on the shortlist for the spring drop.',
      signoff: '— Sam',
      sentAt: '2026-02-11T15:00:00.000Z',
    },
  },
  {
    campaignId: 'petal-spring-box',
    creatorHandle: '@rmtfka',
    brandName: 'Petal & Co',
    campaignTitle: 'Spring Bouquet Box',
    post: {
      platform: 'TikTok',
      thumbnailUrl: U('1490750967868-88aa4486c946'),
      photos: [U('1490750967868-88aa4486c946')],
    },
    postcard: {
      style: 'polaroid',
      message: 'thank you for the blooms & the joy 🌸',
      signoff: '— Joy, Petal & Co',
      signerAvatar: AV('1534528741775-53994a69daeb'),
      sentAt: '2026-01-20T15:00:00.000Z',
    },
    privateNote: null,
  },
];

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}
function writeAll(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function makeKey(campaignId, creatorHandle) {
  return `${campaignId}::${creatorHandle}`;
}

export function getPostcard(campaignId, creatorHandle) {
  const entry = readAll()[makeKey(campaignId, creatorHandle)];
  return (entry && entry.postcard) || null;
}
export function getPrivateNote(campaignId, creatorHandle) {
  const entry = readAll()[makeKey(campaignId, creatorHandle)];
  return (entry && entry.privateNote) || null;
}

// Seed every demo collab's postcard only where NO entry exists yet — never
// overwrites a real brand-written entry (the connect-later goal).
export function seedDemoPostcardsIfMissing() {
  const all = readAll();
  let changed = false;
  for (const c of DEMO_COLLABS) {
    const key = makeKey(c.campaignId, c.creatorHandle);
    if (!all[key]) {
      all[key] = { postcard: c.postcard, privateNote: c.privateNote || null };
      changed = true;
    }
  }
  if (changed) writeAll(all);
}

// The full Finished collection: every demo collab that has a stored postcard,
// merged with its render-time context (brand, campaign, post media), newest
// first. This is what the keepsake deck renders.
export function getFinishedCollabs() {
  const all = readAll();
  return DEMO_COLLABS
    .map((c) => {
      const entry = all[makeKey(c.campaignId, c.creatorHandle)];
      if (!entry || !entry.postcard) return null;
      return { ...c, postcard: entry.postcard, privateNote: entry.privateNote || null };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.postcard.sentAt) - new Date(a.postcard.sentAt));
}

// The newest collab — the one whose thank-you the takeover plays on open.
export function newestCollab() {
  return getFinishedCollabs()[0] || null;
}

export function hasSeen(campaignId, creatorHandle) {
  return localStorage.getItem(SEEN_PREFIX + makeKey(campaignId, creatorHandle)) === '1';
}
export function markSeen(campaignId, creatorHandle) {
  localStorage.setItem(SEEN_PREFIX + makeKey(campaignId, creatorHandle), '1');
}

// Demo reset: remove ONLY the demo entries + their seen flags (never other
// entries — stays non-destructive for the connect-later scenario), then
// re-seed so the takeover auto-plays again on next Campaigns mount.
export function resetDemo() {
  const all = readAll();
  for (const c of DEMO_COLLABS) {
    delete all[makeKey(c.campaignId, c.creatorHandle)];
    localStorage.removeItem(SEEN_PREFIX + makeKey(c.campaignId, c.creatorHandle));
  }
  writeAll(all);
  seedDemoPostcardsIfMissing();
}
