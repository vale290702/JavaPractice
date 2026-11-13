export interface StudentProgress {
  id: string;
  email: string;
  displayName: string;
  enabled: boolean;
  completed: string[];
  lastActivity: string | null;
}
