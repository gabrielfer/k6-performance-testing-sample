import { execSync } from 'child_process';
import fs from 'fs';
const testFiles = fs.readdirSync('src/tests').filter(file => file.endsWith('.test.js'));

testFiles.forEach(file => {
    console.log(`Running test: ${file}`);
    try {
        execSync(`k6 run src/tests/${file}`, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Test failed: ${file}`, error);
    }
});