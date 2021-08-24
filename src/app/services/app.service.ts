import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AppService {

    constructor(
        private afs: AngularFirestore,
        private authService: AuthService
    ) {
    }

    getFeedPosts(): Observable<Post[]> {
        return this.afs.collection<Post>('posts')
            .valueChanges({ idField: 'id' }).pipe(
                map(posts => posts.map(post => {
                    const curr_user_liked = post.users_liked['YO5FGeN7EteqilcK9ehWy3KNPQu2'];
                    post.curr_user_liked = curr_user_liked;

                    const curr_user_saved = post.users_saved['YO5FGeN7EteqilcK9ehWy3KNPQu2'];
                    post.curr_user_saved = curr_user_saved;

                    return post;
                }))
            );
    }

    toggleLikePost(id: string, value: string) {
        const doc = this.afs.collection<Post>('posts', ref => ref.where('id', '==', id));
        // doc.snapshotChanges().pipe(
        //     map(actions => actions.map(a => {
        //         const data = a.payload.doc.data();
        //         const id = a.payload.doc.id;
        //         return { id, ...data };
        //     }))).subscribe((_doc: any) => {
        //         let id = _doc[0].payload.doc.id; //first result of query [0]
        //         this.afs.doc(`posts/${id}`).update({ rating: _value });
        //     })
    }

}