export interface SessionUser {
  role: 'teacher' | 'student';
  id: string;
  email: string;
  displayName: string;
}
export interface AppSession {
  user: SessionUser;
  expiresAt: string;
}
export type AuthErrorCode =
  'invalid_credentials' | 'rate_limited' | 'unavailable' | 'invalid_request';
