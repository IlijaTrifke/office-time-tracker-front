export interface User {
  id: number;
  name: string;
  email: string;
  oauthProvider: "Google" | null;
  referenceNumber: string;
  role: "ROLE_USER" | "ROLE_ADMIN";
  phone: string | null;
}
