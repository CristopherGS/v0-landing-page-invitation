const { execSync } = require('child_process');

try {
  console.log('Running pnpm install to update lockfile...');
  const output = execSync('pnpm install --no-frozen-lockfile', {
    encoding: 'utf-8',
    stdio: 'pipe',
    cwd: process.cwd()
  });
  console.log(output);
  console.log('Lockfile updated successfully!');
} catch (error) {
  console.error('Error:', error.message);
  if (error.stdout) console.log('stdout:', error.stdout);
  if (error.stderr) console.log('stderr:', error.stderr);
}
