import Message from "./Message";
import User    from "./User";

export default interface Chat {
    id: number;
    img: string;
    messages: Array<Message>;
    name: string;
    userId: number;
    user: User;
    users: Array<User>;
}