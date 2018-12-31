const concurrently = require('concurrently');
const process = require('process');

if (process.platform !== 'win32') {
  process.stdout.write('\x1b]2; CAH Dev Server \x1b\x5c');
}

// Files watch
const fsext = [
  // 'ts',
  'js',
  'json',
  'yml'
];

concurrently([{
    command: 'npm:ts:watch',
    name: 'Typescript',
    prefixColor: ['white', 'bgBlue', 'bold']
  },
  {
    command: `node_modules/.bin/nodemon --ext ${fsext.join(',')} ./out/server`,
    name: 'Server',
    prefixColor: ['white', 'bgGreen', 'bold']
  }
], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
  restartTries: 3
});
