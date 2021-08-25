import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AppService {

    constructor(
        private afs: AngularFirestore,
        private authService: AuthService
    ) {
    }

    getFeedPosts(uid: string): Observable<Post[]> {
        return this.afs.collection<Post>('posts')
            .valueChanges({ idField: 'id' }).pipe(
                map(posts => posts.map(post => {
                    const curr_user_liked = post.users_liked[uid];
                    post.curr_user_liked = curr_user_liked;

                    const curr_user_saved = post.users_saved[uid];
                    post.curr_user_saved = curr_user_saved;

                    return post;
                }))
            );
    }

    async toggleLikePost(post: Post) {
        const uid: string | undefined = this.authService.uid;
        if (!uid) return;
        const updatePost = JSON.parse(JSON.stringify(post));
        if (updatePost.users_liked[uid]) {
            updatePost.users_liked[uid] = !updatePost.users_liked[uid];
        } else {
            updatePost.users_liked[uid] = true;
        }
        delete updatePost.curr_user_liked;
        delete updatePost.curr_user_saved;

        return this.afs.collection<Post>('posts').doc(updatePost.id).update(updatePost);
    }

    toggleSavePost(post: Post) {
        const uid: string | undefined = this.authService.uid;
        if (!uid) return;
        const updatePost = JSON.parse(JSON.stringify(post));
        if (updatePost.users_saved[uid]) {
            updatePost.users_saved[uid] = !updatePost.users_saved[uid];
        } else {
            updatePost.users_saved[uid] = true;
        }
        delete updatePost.curr_user_liked;
        delete updatePost.curr_user_saved;

        return this.afs.collection<Post>('posts').doc(updatePost.id).update(updatePost);
    }

}