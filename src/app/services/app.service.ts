import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class AppService {

    constructor(private afs: AngularFirestore) { }

    getFeedPosts(): Observable<Post[]> {
        return this.afs.collection<Post>('posts')
            .valueChanges({ idField: 'id' });
    }

}