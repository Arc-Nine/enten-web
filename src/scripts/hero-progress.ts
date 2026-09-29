export function scrollProgress(top: number, travel: number): number {
  if (!Number.isFinite(top) || !Number.isFinite(travel) || travel <= 0) return 0;
  return Math.min(1, Math.max(0, -top / travel));
}
export function frameTime(progress: number, duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  return Math.min(1, Math.max(0, progress)) * Math.max(0, duration - 1 / 30);
}
