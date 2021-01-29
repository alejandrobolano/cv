import {User, UserFirebase} from '../../model/User';
import {Permission} from '../../enum/permission.enum';
import {Injectable, NgZone} from '@angular/core';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {UserService} from './user.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;

  constructor(public angularFirestore: AngularFirestore,
              public angularFireAuth: AngularFireAuth,
              public router: Router,
              public ngZone: NgZone,
              private userService: UserService
  ) {
    this.authState();
  }

  private authState(): any {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  googleAuth(): any {
    // tslint:disable-next-line:new-parens
    return this.authLogin(new auth.GoogleAuthProvider);
  }

  authLogin(provider): any {
    return this.angularFireAuth.signInWithPopup(provider)
      .then(() => {
        this.redirect();
      }).catch((error) => {
        console.log(error);
      });
  }

  signOut(): any {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.redirect();
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    // && user.emailVerified !== false
    return (user !== null && user.emailVerified !== false);
  }

  signIn(email, password): any {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.ngZone.run(() => {
          this.redirect();
        });
      }).catch((error) => {
        window.alert(error.message);
      });
  }


  setUserData(user): any {
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc('users/${user.uid}');
    const userData: UserFirebase = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  /*
  updateUser(newName: string): any {
    if (newName !== '') {
      this.angularFireAuth.authState.updateProfile({
        displayName: newName,
        photoURL: ''
      }).then(() => {
        const message = 'Updated to ' + newName;
        window.alert(message);
      }).catch(error => window.alert(error.message));
    }
  }*/

  signUp(email, password): any {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail().then(() =>
          window.alert(result.user)
        );
        this.setUserData(result.user);
        const userTable: User = {
          uid: result.user.uid,
          isVisiblePrivate: false,
          permission: Permission.guest
        };
        this.userService.create(userTable);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  sendVerificationMail(): any {
    return this.angularFireAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['email-verification']);
      });
  }

  forgotPassword(passwordResetEmail): any {
    return this.angularFireAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

  redirect(): any {
    this.router.navigate(['navigation/home']);
  }


}
