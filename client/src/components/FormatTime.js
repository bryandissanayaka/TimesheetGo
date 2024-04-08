export default function formatTime(s) {
  // removes seconds from hours:minutes:seconds
  return s.substring(0, 5);
}
