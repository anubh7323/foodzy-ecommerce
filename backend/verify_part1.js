const http = require('http');

const request = (options, data) => {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body: JSON.parse(body || '{}') }));
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
};

async function run() {
    try {
        // 1. Seed Products
        console.log('Seeding products...');
        const seedRes = await request({
            hostname: 'localhost',
            port: 3000,
            path: '/products/seed',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        console.log('Seed response:', seedRes.statusCode, seedRes.body);

        // 2. Request OTP
        console.log('Requesting OTP...');
        const otpRes = await request({
            hostname: 'localhost',
            port: 3000,
            path: '/auth/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, { email: 'test@example.com' });
        console.log('OTP Request response:', otpRes.statusCode, otpRes.body);

    } catch (error) {
        console.error('Error:', error);
    }
}

run();
