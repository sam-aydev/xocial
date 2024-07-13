export function timeAgo(ISOString: any) {
  const date: any = new Date(ISOString);
  const now: any = new Date();

  const diff = now - date;

  const secondAgo = Math.floor(diff / 1000);
  const minutesAgo = Math.floor(secondAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  if (hoursAgo > 0) {
    return `${hoursAgo} hrs `;
  } else if (minutesAgo > 0) {
    return `${minutesAgo} mins ago`;
  } else if (daysAgo > 0) {
    return `${daysAgo}d`;
  } else {
    return `${secondAgo}s `;
  }
}
