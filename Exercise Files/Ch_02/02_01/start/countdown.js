#!/usr/bin/env node

/* *
 * Collect number of sec from the argv
 * Print stars in-line
 * Run a  timer and remove stars;
 */

const parseArgs = require('minimist');
const { time } = parseArgs(process.argv);
const { stdout: log } = require('single-line-log');
const Timer = require('tiny-timer');

if (!time) {
  throw new Error('--time is required');
}

if (!parseInt(time)) {
  throw new Error('--time must be a number');
}

const count = parseInt(time);

let message = '';

for (let i = 0; i < count; i++) {
  message += '*';
}

log(message);

const timer = new Timer({ interval: 1000 });

timer.on('tick', () => {
  log(message);
  message = message.slice(1);
});

timer.start(count * 1000);

