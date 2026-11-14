export type TimeLeft = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

export function timeLeft(targetMs: number, nowMs: number): TimeLeft {
  const diff = targetMs - nowMs;
  if (!(diff > 0)) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: false,
  };
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}
