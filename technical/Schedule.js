import moment from 'moment';

const startWorkingTime = moment('09:00', 'HH:mm');
const endWorkingTime = moment('19:00', 'HH:mm');

export const schedules = [
  [
    ['09:00', '11:30'],
    ['13:30', '16:00'],
    ['16:00', '17:30'],
    ['17:45', '19:00'],
  ],
  [
    ['09:15', '12:00'],
    ['14:00', '16:30'],
    ['17:00', '17:30'],
  ],
  [
    ['11:30', '12:15'],
    ['15:00', '16:30'],
    ['17:45', '19:00'],
  ],
];

export function findAvailableTime(schedules, duration) {
  // Flatten arrays
  const flattenedSchedule = schedules
    .flat()
    .sort((a, b) => moment(a[0], 'HH:mm').diff(moment(b[0], 'HH:mm')));

  for (let i = 1; i < flattenedSchedule.length; i++) {
    const prevEnd = moment(flattenedSchedule[i - 1][1], 'HH:mm');
    const currentStart = moment(flattenedSchedule[i][0], 'HH:mm');

    if (currentStart.diff(prevEnd, 'minutes') >= duration) {
      if (
        prevEnd.isAfter(startWorkingTime) &&
        prevEnd.isBefore(endWorkingTime)
      ) {
        return [
          prevEnd.format('HH:mm'),
          prevEnd.add(duration, 'minutes').format('HH:mm'),
        ];
      }
    }
  }

  return null;
}

const duration = 60; // Duration in minutes
const availableTimeSlot = findAvailableTime(schedules, duration);

if (availableTimeSlot) {
  console.log(
    `Available time slot: ${availableTimeSlot[0]} - ${availableTimeSlot[1]}`
  );
} else {
  console.log('No available time slot found.');
}
