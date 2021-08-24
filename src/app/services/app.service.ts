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

    toggleLikePost(post: Post) {
        const updatePost = JSON.parse(JSON.stringify(post));
        if (updatePost.users_liked['YO5FGeN7EteqilcK9ehWy3KNPQu2']) {
            updatePost.users_liked['YO5FGeN7EteqilcK9ehWy3KNPQu2'] = !updatePost.users_liked['YO5FGeN7EteqilcK9ehWy3KNPQu2'];
        } else {
            updatePost.users_liked['YO5FGeN7EteqilcK9ehWy3KNPQu2'] = true;
        }
        delete updatePost.curr_user_liked;
        delete updatePost.curr_user_saved;

        return this.afs.collection<Post>('posts').doc(updatePost.id).update(updatePost);
    }

    toggleSavePost(post: Post) {
        const updatePost = JSON.parse(JSON.stringify(post));
        if (updatePost.users_saved['YO5FGeN7EteqilcK9ehWy3KNPQu2']) {
            updatePost.users_saved['YO5FGeN7EteqilcK9ehWy3KNPQu2'] = !updatePost.users_saved['YO5FGeN7EteqilcK9ehWy3KNPQu2'];
        } else {
            updatePost.users_saved['YO5FGeN7EteqilcK9ehWy3KNPQu2'] = true;
        }
        delete updatePost.curr_user_liked;
        delete updatePost.curr_user_saved;

        return this.afs.collection<Post>('posts').doc(updatePost.id).update(updatePost);
    }

}