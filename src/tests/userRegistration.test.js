import http from 'k6/http';
import { check, sleep } from 'k6';
import { options } from '../../k6-config.js';

export { options };

export default function () {
    let payload = JSON.stringify({
        username: `user_${Math.random().toString(36).substr(2, 5)}`,
        password: 'test1234!',
    });

    let params = {
        headers: { 'Content-Type': 'application/json' },
    };

    let res = http.post('https://test-api.k6.io/user/register/', payload, params);

    check(res, {
        'status is 201': (r) => r.status === 201,
        'response contains username': (r) => JSON.parse(r.body).username !== undefined,
    });

    sleep(1);
}