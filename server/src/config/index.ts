export default {
    app: {
        port: 3000,
    },

    db: {
        name    : 'todolist',
        user    : 'root',
        password: '1234',
        port    : 3306,
        host    : '127.0.0.1',
    },

    cors: {
        origin : ["http://localhost:8080", 'http://192.168.43.17:8080'],
        methods: ["GET", "POST", "PUT", "DELETE", "UPDATE"]
    },
}