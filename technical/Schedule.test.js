import { findAvailableTime, schedules } from './Schedule';

test('succeeds on finding available time slot', () => {
  const duration = 60;
  expect(findAvailableTime(schedules, duration)).toEqual(['12:15', '13:15']);
});

test('succeeds on returning null when no available time slot', () => {
  const duration = 90;
  expect(findAvailableTime(schedules, duration)).toEqual(null);
});
