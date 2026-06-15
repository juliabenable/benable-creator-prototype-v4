import { resetDemo } from '../utils/creatorStorage.js';

export default function ResetFab() {
  function onReset() {
    resetDemo();
    window.location.reload();
  }
  return (
    <button
      type="button"
      className="reset-fab"
      onClick={onReset}
      aria-label="Reset demo (replay the thank-you)"
      title="Reset demo — replay the thank-you"
    >
      <span aria-hidden="true">↺</span> Reset demo
    </button>
  );
}
