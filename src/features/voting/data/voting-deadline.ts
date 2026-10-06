// Dummy deadline: 72 hours from when the app loads, so a page refresh
// restarts the countdown. A real backend would return a fixed timestamp.
const VOTING_WINDOW_HOURS = 72;

export const VOTING_DEADLINE_ISO = new Date(
  Date.now() + VOTING_WINDOW_HOURS * 60 * 60 * 1000,
).toISOString();
