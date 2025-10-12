#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd) {
	execSync(cmd, { stdio: 'inherit' });
}

const projectRoot = path.resolve(__dirname, '..');
process.chdir(projectRoot);

const nodeModulesPath = path.join(projectRoot, 'node_modules');

try {
	if (!fs.existsSync(nodeModulesPath)) {
		console.log('node_modules not found — running npm install...');
		run('npm install --no-audit --no-fund --no-progress');
	} else {
		console.log('node_modules present — skipping npm install.');
	}

	console.log('Running lint-staged...');
	run('npx --no-install lint-staged');
} catch (err) {
	console.error('\nPre-commit script failed:');
	console.error(err && err.message ? err.message : err);
	process.exit(1);
}
