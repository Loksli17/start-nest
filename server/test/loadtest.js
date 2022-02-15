
import http             from 'k6/http';
import { check, sleep } from 'k6';


export const options = {
    stages: [
        {duration: '10s', target: 200},
        {duration: '1m',  target: 200},
        {duration: '10s', target: 1400},
        {duration: '3m',  target: 1400},
        {duration: '10s', target: 200},
        {duration: '2m',  target: 200},
        {duration: '10s', target: 0},
    ],
    thresholds: {
'       http_req_duration': ['p(99)<1000'],
    },
}

export default () => {

    const response2 = http.get('http://localhost:3000/task/get-all');

    check(response2, {
        "task/get-all: is status 200": (req) => req.status === 200,
    });

    sleep(1);
  
};