export const unit1ActivityTopics = {
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
export const unit2ActivityTopics = {
  c1: '2.1',
  c2: '2.2',
  c3: '2.3',
  c4: '2.3',
  c5: '2.4',
  c6: '2.4',
  c7: '2.4',
  c8: '2.5',
  c9: '2.5',
} as const;
export const unit1ExtendedActivityTopics = {
  d1: '1.10',
  d2: '1.10',
  d3: '1.10',
  d4: '1.10',
  d5: '1.11',
  d6: '1.11',
  d7: '1.12',
  d8: '1.13',
  d9: '1.13',
  d10: '1.14',
  d11: '1.14',
  d12: '1.15',
} as const;
export const activityTopics = {
  ...unit1ActivityTopics,
  ...unit1ExtendedActivityTopics,
  ...unit2ActivityTopics,
} as const;
export const worksheetIds = Object.keys(activityTopics).flatMap((id) => [
  `${id}-guided`,
  `${id}-independent`,
]);
