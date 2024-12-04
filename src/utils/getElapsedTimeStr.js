export function getElapsedTimeStr(initialTimeInMS) {
  // For preloaded comments
  if (!Number(initialTimeInMS)) return initialTimeInMS.toString();

  const currentTimeInMS = Date.now();
  const elapsedTimeInMS = currentTimeInMS - initialTimeInMS;
  const secs = Math.floor(elapsedTimeInMS / 1000);
  const mins = Math.floor(secs / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  return secs < 2
    ? "Just now"
    : secs < 60
    ? `${secs} seconds ago`
    : mins < 2
    ? "a minute ago"
    : mins < 60
    ? `${mins} minutes ago`
    : hours < 2
    ? "an hour ago"
    : hours < 24
    ? `${hours} hours ago`
    : days < 2
    ? "a day ago"
    : days < 7
    ? `${days} days ago`
    : weeks < 2
    ? "a week ago"
    : `${weeks} weeks ago`;
}
