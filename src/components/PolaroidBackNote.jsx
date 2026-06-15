/**
 * Back face of the polaroid: a paper-textured rectangle in the same
 * dimensions, rendering a private handwritten note from the brand.
 */
export default function PolaroidBackNote({ brandName, message, signoff }) {
  return (
    <div className="pc pc-polaroid pc-polaroid--back">
      <div className="pc-polaroid__tape" />
      <div className="pc-back__header">a private note from {brandName.toLowerCase()}</div>
      <div className="pc-back__message">{message}</div>
      <div className="pc-back__signoff">{signoff}</div>
      <div className="pc-back__deco" aria-hidden="true">✦</div>
    </div>
  );
}
