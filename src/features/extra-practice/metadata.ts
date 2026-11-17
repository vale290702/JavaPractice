export const activityTopics = {
  a1: '1.1',
  a2: '1.1',
  a3: '1.2',
  a4: '1.3',
  a5: '1.4',
  a6: '1.5',
  b1: '1.6',
  b2: '1.7',
  b3: '1.8',
  b4: '1.9',
  b5: '1.10',
  b6: '1.10',
  b7: '1.10',
  b8: '1.10',
} as const;
export const worksheetIds = Object.keys(activityTopics).flatMap((id) => [
  `${id}-guided`,
  `${id}-independent`,
]);
