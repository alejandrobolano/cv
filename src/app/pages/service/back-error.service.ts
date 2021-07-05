import { Injectable } from '@angular/core';
import BackError from './model/BackError';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BackErrorService {

  private dbPath = '/errors';

  errorsRef: AngularFirestoreCollection<BackError> = null;

  constructor(private db: AngularFirestore) {
    this.errorsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<BackError> {
    return this.errorsRef;
  }

  create(error: BackError): any {
    if (error.isFixed === undefined) {
      error.isFixed = false;
    }
    return this.errorsRef.add({ ...error });
  }

  update(id: string, data: any): Promise<void> {
    return this.errorsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.errorsRef.doc(id).delete();
  }
}
