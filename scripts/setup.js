#!/usr/bin/env node

const fs = require('fs');
const prompt = require('prompt');
const { exec } = require('child_process');

const DEFAULT_NAME_SNAKE = 'use-custom-hook';
const DEFAULT_NAME_CAMEL = 'useCustomHook';

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

  function replaceSnakeString(original) {
    const regex = new RegExp(DEFAULT_NAME_SNAKE, 'g');
    return original.replace(regex, nameSnakeCase);
  }

  function replaceCamelString(original) {
    const regex = new RegExp(DEFAULT_NAME_CAMEL, 'g');
    return original.replace(regex, nameCamelCase);
  }

  const filesWithSnake = [
    './package.json',
    `./${DEFAULT_NAME_SNAKE}/package.json`
  ]

  const snakePromises = filesWithSnake.map(filePath => {
    return promiseToModifyFile(filePath, replaceSnakeString)
  });

  await Promise.all(snakePromises);

  const filesWithCamel = [
  ];

  const camelPromises = filesWithCamel.map(filePath => {
    return promiseToModifyFile(filePath, replaceCamelString)
  });

  await Promise.all(camelPromises);

  const filesToMove = [
    {
      originalLocation: DEFAULT_NAME_SNAKE,
      newLocation: nameSnakeCase
    }
  ];

  const movePromises = filesToMove.map(({originalLocation, newLocation} = {}) => {
    return promiseToExec(`mv ${originalLocation} ${newLocation}`)
  });

  await Promise.all(movePromises);

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