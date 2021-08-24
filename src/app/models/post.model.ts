import { User } from "./user.model";

export interface Post {
    id: string;
    caption: string;
    type: string; // 'image' or 'video'
    media: string;
    creator: User;
    likes_count: number;
    users_liked: Array<{ uid: string }>;
    users_saved: Array<{ uid: string }>;
    created_at: Date;
}