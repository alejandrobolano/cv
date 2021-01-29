import {Permission} from '../enum/permission.enum';

export interface UserFirebase {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

export interface User {
  uid: string;
  permission: Permission;
  isVisiblePrivate: boolean;
}

