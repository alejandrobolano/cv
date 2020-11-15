import { Injectable } from '@angular/core';
import Message from '../model/Message';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private dbPath = '/messages';

  tutorialsRef: AngularFirestoreCollection<Message> = null;

  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Message> {
    return this.tutorialsRef;
  }

  create(message: Message): any {
    return this.tutorialsRef.add({ ...message });
  }

  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
}
