import { useCustomHook } from 'use-custom-hook';

import { toCamel } from '../lib/util';

import config from '../../package.json';

export default function Index() {
  const { name, description } = config;

  const hookSettings = {
    message: 'Hello, custom hook!'
  }

  const { message } = useCustomHook(hookSettings);

  return (
    <main>
      <style jsx global>{`
        body {
          font-family: sans-serif;
          padding: 0;
          margin: 0;
        }

        main {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1em 0;
        }

        h1 {
          font-size: 2em;
        }

        img {
          max-width: 100%;
        }

        pre {
          overflow: auto;
          max-height: 15em;
          background-color: #eeeeee;
          padding: 1em;
        }

        section,
        footer {
          width: 100%;
          max-width: 50em;
          margin: 0 auto;
        }

        footer p {
          font-size: .9em;
        }

        footer p,
        footer a {
          color: #546e7a;
        }
      `}</style>

      <section>

        <h1>{ toCamel(name) }</h1>

        <p>{ description }</p>

        <p>
          <a href="https://github.com/colbyfayock/use-custom-hook">
            github.com/colbyfayock/use-custom-hook
          </a>
        </p>

        <h2>How to use</h2>

        <p>
          Find instructions for how to get started <a href="https://github.com/colbyfayock/use-custom-hook">on the repo</a>.
        </p>

        <h2>Examples</h2>

        <h3>Input / Output</h3>
        <p>{ message }</p>
        <pre>
          <code>
{`const hookSettings = {
  message: 'Hello, custom hook!'
}

const { message } = useCustomHook(hookSettings);`}
          </code>
        </pre>

      </section>

      <footer>
        <p>
          Made by <a href="https://twitter.com/colbyfayock">Colby Fayock</a>
        </p>
      </footer>

    </main>
  );

}