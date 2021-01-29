import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {User} from '../../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';

  usersRef: AngularFirestoreCollection<User> = null;

  constructor(private db: AngularFirestore) {
    this.usersRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<User> {
    return this.usersRef;
  }

  create(user: User): any {
    return this.usersRef.add({ ...user });
  }

  update(id: string, data: any): Promise<void> {
    return this.usersRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.usersRef.doc(id).delete();
  }

}
