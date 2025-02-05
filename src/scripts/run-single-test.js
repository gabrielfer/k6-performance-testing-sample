import { execSync } from 'child_process';

const testFile = process.argv[2]; // Pass the test file as an argument

if (!testFile) {
    console.error('Usage: node src/scripts/run-single-test.js <test-file>');
    process.exit(1);
}

try {
    execSync(`k6 run src/tests/${testFile}`, { stdio: 'inherit' });
} catch (error) {
    console.error(`Error running k6 test with the name ${testFile}:'`, error);
}