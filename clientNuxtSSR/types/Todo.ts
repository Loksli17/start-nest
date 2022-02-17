export default interface Todo {
    id: number;
    date: string;
    taskTypeId: number;
    text: string;
    time: string;
    type: {
        id: number;
        name: string;
    }
}