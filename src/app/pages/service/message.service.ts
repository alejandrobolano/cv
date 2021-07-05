import { Injectable } from '@angular/core';
import Message from './model/Message';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private dbPath = '/messages';

  messagesRef: AngularFirestoreCollection<Message> = null;

  constructor(private db: AngularFirestore) {
    this.messagesRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Message> {
    return this.messagesRef;
  }

  create(message: Message): any {
    if (message.isRead === undefined) {
      message.isRead = false;
    }
    return this.messagesRef.add({ ...message });
  }

  update(id: string, data: any): Promise<void> {
    return this.messagesRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.messagesRef.doc(id).delete();
  }
}
