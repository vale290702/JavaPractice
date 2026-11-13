/** Public identifiers used to validate progress; no protected lesson content. */
const topicCounts = [15, 12, 9, 17] as const;
export const topicIds = topicCounts.flatMap((count, unit) =>
  Array.from({ length: count }, (_, topic) => `${unit + 1}.${topic + 1}`),
);
