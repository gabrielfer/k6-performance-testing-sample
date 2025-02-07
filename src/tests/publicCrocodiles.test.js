import http from 'k6/http';
import { check, sleep } from 'k6';
import { options } from '../k6-config.js';

export { options };

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time < 300ms': (r) => r.timings.duration < 300,
    });

    sleep(1);
}