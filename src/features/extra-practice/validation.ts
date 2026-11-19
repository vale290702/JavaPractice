import { worksheetIds } from './metadata';
import type { WorksheetWork } from './types';
export const maxWorksheetBytes = 65536;
export const maxWorkBytes = 65024;
export function isAccountId(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      value,
    )
  );
}
export function isWorksheetId(value: unknown): value is string {
  return typeof value === 'string' && worksheetIds.includes(value);
}
export function editableFiles(id: string): string[] {
  const activity = id.split('-')[0];
  if (activity === 'd10')
    return [
      id.endsWith('-independent')
        ? 'DecorationRunner.java'
        : 'BalloonRunner.java',
      'Balloon.java',
    ];
  const worksheetFilePairs: Record<string, [string, string]> = {
    c1: ['Algorithm.txt', 'Algorithm.txt'],
    c2: ['Goals.java', 'ReadingGoal.java'],
    c3: ['Bill.java', 'ParkingFee.java'],
    c4: ['DrinkOrder.java', 'DeliveryOrder.java'],
    c5: ['SmoothieRunner.java', 'PrintMode.java'],
    c6: ['TemperatureClassifier.java', 'BatteryStatus.java'],
    c7: ['TheaterDiscounts.java', 'LibraryAccess.java'],
    c8: ['Salmon.java', 'SchoolTerm.java'],
    c9: ['FindMedian.java', 'MiddleReading.java'],
    d1: ['LogRunner.java', 'BackupLog.java'],
    d2: ['UnitRunner.java', 'TravelUnits.java'],
    d3: ['HelloRunner.java', 'WelcomeTeam.java'],
    d4: ['CalculatorRunner.java', 'SurveyCalculator.java'],
    d5: ['RandomGenerator.java', 'QueueNumbers.java'],
    d6: ['TrafficEngineer.java', 'RampCheck.java'],
    d7: ['RectangleRunner.java', 'PosterRunner.java'],
    d8: ['SystemRunner.java', 'BranchRunner.java'],
    d9: ['CameraRunner.java', 'CameraKit.java'],
    d11: ['BottleRunner.java', 'HikeBottle.java'],
    d12: ['NameTagGenerator.java', 'BadgeGenerator.java'],
  };
  if (Object.hasOwn(worksheetFilePairs, activity))
    return [worksheetFilePairs[activity][id.endsWith('-independent') ? 1 : 0]];
  return activity === 'a2'
    ? ['Main.java', 'Debugging.txt']
    : [
        {
          b5: 'LogRunner.java',
          b6: 'UnitRunner.java',
          b7: 'HelloRunner.java',
          b8: 'CalculatorRunner.java',
        }[activity] ?? 'Main.java',
      ];
}
export function exactKeys(
  value: unknown,
  keys: string[],
): value is Record<string, unknown> {
  return (
    !!value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.keys(value).length === keys.length &&
    keys.every((key) => Object.hasOwn(value, key))
  );
}
export function validWork(
  id: string,
  value: unknown,
  completed: boolean,
): value is WorksheetWork {
  if (
    !isWorksheetId(id) ||
    !exactKeys(value, [
      'prediction',
      'trace',
      'files',
      'results',
      'explanation',
    ])
  )
    return false;
  if (new TextEncoder().encode(JSON.stringify(value)).byteLength > maxWorkBytes)
    return false;
  for (const key of ['prediction', 'trace', 'results', 'explanation']) {
    const note = value[key];
    if (
      typeof note !== 'string' ||
      note.length > 8000 ||
      (completed && !note.trim())
    )
      return false;
  }
  const names = editableFiles(id);
  const files = value.files;
  if (!exactKeys(files, names)) return false;
  return names.every(
    (name) =>
      typeof files[name] === 'string' &&
      files[name].length <= 32000 &&
      (!completed || !!files[name].trim()),
  );
}
