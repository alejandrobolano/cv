import { Injectable } from '@angular/core';
import BackError from '../model/BackError';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private dbPath = '/errors';

  tutorialsRef: AngularFirestoreCollection<BackError> = null;

  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<BackError> {
    return this.tutorialsRef;
  }

  create(error: BackError): any {
    if (error.fixed === undefined) {
      error.fixed = false;
    }
    return this.tutorialsRef.add({ ...error });
  }

  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
}
