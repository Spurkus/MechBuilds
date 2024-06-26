export type userStatus = "active" | "suspended" | "banned";
export type userRole = "user" | "mod" | "admin";

export interface UserProfileType {
  uid: string;
  email: string;
  username: string;
  displayName: string;
  profilePicture: string;
  premium: boolean;
  status: userStatus;
  role: userRole;
  joinedDate: Date;
  lastActive: Date;
  bio: string;
  socialLinks: string[];
  pronouns: [string, string];
}

export type EditUserProfileType = Partial<UserProfileType>;
