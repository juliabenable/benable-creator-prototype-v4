# Benable Creator Prototype v4

iOS-style creator mobile prototype. The newest brand thank-you plays a
celebratory envelope-open takeover; the Campaigns → **Finished** tab is a
tilted grid of every thank-you the creator has collected.

Standalone with seeded mock data; storage shape is intentionally
byte-compatible with the brand prototype (`benable.creatorActions.v3`) so a
later iteration can read real brand-sent thank-yous.

## What's new in v4

The **Finished** tab is now a **Shelf Grid** (design-study direction C):

- **A tidy 2-up grid** of the creator's thank-yous, each polaroid given a
  small hand-placed tilt (cycled angles) so the wall feels pinned, not
  mechanical.
- **Brand + campaign label below each card** — the campaign reference stays
  off the polaroid face, as decided.
- **Tap a card → focused lightbox** (`FocusedCard`): the polaroid lifts to
  the foreground over a blurred, dimmed backdrop where you can flip it to the
  brand's private note, browse the collection (prev/next arrows or arrow
  keys), and dismiss via the close button, a backdrop tap, or Escape.
- A small **"N thank-yous · your collection so far"** header keeps the
  celebratory framing.

(v3 shipped the same collection as a swipeable Keepsake Deck — direction D.
This iteration swaps that for the grid.) Seeds five demo collabs from
different brands; `getFinishedCollabs()` reads them from the shared store and
the takeover plays the newest unseen one.

## What landed in v2 (still here)

The polaroid the creator receives now matches what the brand actually
composes & sends in `benable-brand-prototype-v23` (ported from its
`Postcards.jsx`):

- **Multi-photo layout** — all of the creator's campaign posts render as a
  single contained print (1), an offset "peek" (2), or a tilted pile (3+),
  instead of one cropped thumbnail.
- **True-aspect photos on a blurred backdrop** — photos sit at their real
  ratio over a blurred + scrimmed copy of the first photo, so faces and
  products are never cropped.
- **Die-cut wavy signer sticker** — a paper-cutout photo of the person who
  signed (read-only here; the creator only views it).
- **Personalized sign-off** — names the signer alongside the team.

The `postcard.signerAvatar` field and the `post.photos` array are the
brand-side shape (added after v4) that the creator app now reads.

## Dev
npm install && npm run dev

## Deploy
Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
