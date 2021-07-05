import {Permission} from '../enum/permission.enum';

export interface IUserFirebase {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  permission: Permission;
  isVisiblePrivate: boolean;
}

export interface IUser {
  uid: string;
  permission: Permission;
  isVisiblePrivate: boolean;
}

