#!/usr/bin/env node

const fs = require('fs');
const prompt = require('prompt');
const { exec } = require('child_process');

const DEFAULT_NAME_SNAKE = 'use-custom-hook';
const DEFAULT_NAME_CAMEL = 'useCustomHook';

const filesWithSnake = [
  './package.json',
  'example/pages/index.js',
  `./${DEFAULT_NAME_SNAKE}/package.json`
];

const filesWithCamel = [
  'example/pages/index.js',
  `./${DEFAULT_NAME_SNAKE}/src/index.js`,
  `./${DEFAULT_NAME_SNAKE}/src/${DEFAULT_NAME_CAMEL}.js`
];

const filesToMove = [
  {
    originalLocation: `./${DEFAULT_NAME_SNAKE}/src/${DEFAULT_NAME_CAMEL}.js`,
    newLocation: `./${DEFAULT_NAME_SNAKE}/src/{nameCamelCase}.js`
  },
  {
    originalLocation: `./${DEFAULT_NAME_SNAKE}`,
    newLocation: `./{nameSnakeCase}`
  }
];

const packagesToCleanup = [
  'child_process',
  'fs',
  'prompt'
]

(async () => {
  prompt.start();

  console.log('What is the hook name in camelCase (ex: useCustomHook)?');

  const { nameCamelCase } = await getPrompt([
    {
      properties: {
        nameCamelCase: {
          description: 'Hook Name (camelCase)',
          required: true
        }
      }
    }
  ]);

  console.log('What is the hook name in snake-case (ex: use-custom-hook)?');

  const { nameSnakeCase } = await getPrompt([
    {
      properties: {
        nameSnakeCase: {
          description: 'Hook Name (snake-case)',
          required: true
        }
      }
    }
  ]);

  /**
   * replaceSnakeString
   */

  const snakeRegex = new RegExp(DEFAULT_NAME_SNAKE, 'g');

  function replaceSnakeString(original) {
    return original.replace(snakeRegex, nameSnakeCase);
  }

  /**
   * replaceCamelString
   */

  const camelRegex = new RegExp(DEFAULT_NAME_CAMEL, 'g');

  function replaceCamelString(original) {
    return original.replace(camelRegex, nameCamelCase);
  }

  console.log(`Updating instances of ${DEFAULT_NAME_SNAKE} with ${nameSnakeCase}...`);

  const snakePromises = filesWithSnake.map(filePath => {
    return promiseToModifyFile(filePath, replaceSnakeString)
  });

  await Promise.all(snakePromises);

  console.log(`Updating instances of ${DEFAULT_NAME_CAMEL} with ${nameCamelCase}...`);

  const camelPromises = filesWithCamel.map(filePath => {
    return promiseToModifyFile(filePath, replaceCamelString)
  });

  await Promise.all(camelPromises);

  console.log(`Moving files with default name with configured name...`);

  const movePromises = filesToMove.map(({originalLocation, newLocation} = {}) => {
    let replaced;
    replaced = newLocation.replace('{nameCamelCase}', nameCamelCase);
    replaced = newLocation.replace('{nameSnakeCase}', nameSnakeCase);
    return promiseToExec(`mv ${originalLocation} ${replaced}`)
  });

  await Promise.all(movePromises);

  console.log('Cleaning up setup scripts...');

  const packagesString = packagesToCleanup.join(' ');

  await promiseToExec(`yarn remove ${packagesString} -W`);

  console.log('Resetting git...')

  await promiseToExec('rm -rf .git');

  await promiseToExec('git init');

  await promiseToExec(`git add ./example ./${nameSnakeCase} package.json`);

  await promiseToExec('git commit -m "[use-custom-hook] Initailized Project"');

  console.log('Done.');
})();

/**
 * getPrompt
 * @description Promise to get user input given the prompt options
 */

function getPrompt(options) {
  const errorBase = 'Failed to get prompt';
  return new Promise((resolve, reject) => {
    if ( !Array.isArray(options) ) {
      reject(`${errorBase}: Invalid options`);
    }
    prompt.get(options, function (err, result) {
      if ( err ) {
        reject(`${errorBase}: ${err}`);
      }
      resolve(result);
    });
  });
}

/**
 * promiseToExec
 * @description Promise to execute a command
 */

async function promiseToExec(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({
        stdout,
        stderr
      });
    })
  })
}

/**
 * promiseToModifyFile
 * @description Promise to modify a file
 */

async function promiseToModifyFile(file, change) {
  const errorBase = 'Failed to modify file';
  let contents;

  try {
    contents = await promiseToReadFile(file);
  } catch(e) {
    throw new Error(`${errorBase}: Could not read file; ${e}`);
  }

  if ( typeof change === 'function' ) {
    try {
      contents = change(contents);
    } catch(e) {
      throw new Error(`${errorBase}: Could not change file; ${e}`);
    }
  } else {
    throw new Error(`${errorBase}: Could not change file; Invalid change function`)
  }

  try {
    await writeFile(file, contents);
  } catch(e) {
    throw new Error(`${errorBase}: Could not write file; ${e}`);
  }

  return contents;
}

/**
 * promiseToReadFile
 * @description Promise to read a file
 */

async function promiseToReadFile(file, options = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(file, options, (error, data) => {
      if ( error ) {
        reject(error);
        return;
      }
      resolve(data);
    });
  })
}

/**
 * writeFile
 * @description Promise to write a file
 */

async function writeFile(file, contents, options = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, contents, options, (error) => {
      if ( error ) {
        reject(error);
        return;
      }
      resolve(contents);
    });
  })
}