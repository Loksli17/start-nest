export default interface Message {
    id: number;
    time: string;
    date: string;
    content: string;
    userId: number;
    roomId: number;
    user: {
        login: string;
    }
}