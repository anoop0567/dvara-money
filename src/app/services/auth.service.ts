import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';


@Injectable({ providedIn: 'root' })
export class AuthService {

    uid: string | undefined;
    user$: Observable<User | null | undefined>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {
        // Get the auth state, then fetch the Firestore user document or return null
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                // Logged in
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    // Logged out
                    return of(null);
                }
            })
        )
        this.afAuth.authState.subscribe(user => {
            this.uid = user ? user.uid : undefined;
        });
    }

    async googleSignin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const credential = await this.afAuth.signInWithPopup(provider);
        if (credential && credential.user) {
            this.router.navigate(['/']);
            return this.updateUserData(credential.user);
        }
    }

    private updateUserData(user: any) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

        const data = {
            uid: user.uid,
            email: user.email,
            display_name: user.displayName,
            photo_url: user.photoURL
        }

        return userRef.set(data, { merge: true })

    }

    async signOut() {
        await this.afAuth.signOut();
        this.router.navigate(['/']);
    }

    getLoggedInUserId() {
        return this.afAuth.authState;
    }
}