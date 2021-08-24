import { User } from "./user.model";

export interface Post {
    id: string;
    caption: string;
    type: string; // 'image' or 'video'
    media: string;
    creator: User;
    likes_count: number;
    curr_user_liked?: boolean;
    users_liked?: any;
    curr_user_saved?: boolean;
    users_saved?: any;
    created_at: Date;
}