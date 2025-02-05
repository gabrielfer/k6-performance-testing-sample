import http from 'k6/http';
import { check, sleep } from 'k6';
import { options } from '../../k6-config.js';

export { options };

const USERNAME = `user_${Math.random().toString(36).substr(2, 5)}`;
const PASSWORD = 'test1234!';

export function setup() {
    let payload = JSON.stringify({ username: USERNAME, password: PASSWORD });
    let params = { headers: { 'Content-Type': 'application/json' } };

    let res = http.post('https://test-api.k6.io/user/register/', payload, params);
    
    let loginRes = http.post('https://test-api.k6.io/auth/token/login/', payload, params);
    let token = JSON.parse(loginRes.body).access;

    return { token };
}

export default function (data) {
    let headers = { headers: { Authorization: `Bearer ${data.token}` } };
    let res = http.get('https://test-api.k6.io/my/crocodiles/', headers);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response contains crocodiles': (r) => JSON.parse(r.body).length > 0,
    });

    sleep(1);
}