import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import Knowhow from './model/Knowhow';

@Injectable({
  providedIn: 'root'
})
export class KnowhowService {

  private dbPath = '/knowhow';

  knowhowRef: AngularFirestoreCollection<Knowhow> = null;

  constructor(private db: AngularFirestore) {
    this.knowhowRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Knowhow> {
    return this.knowhowRef;
  }

  create(message: Knowhow): any {
    return this.knowhowRef.add({...message});
  }

  update(id: string, data: any): Promise<void> {
    return this.knowhowRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.knowhowRef.doc(id).delete();
  }
}
