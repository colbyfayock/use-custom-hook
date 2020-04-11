# 🧰 useCustomHook

A starter template for creating a new React Hook.

## 🚀 Getting Started

### tl;dr
* Clone with new git history
* Update the name, author, and examples
* Publish

### Set up a new repository
* Clone the `useCustomHook` repo locally and navigate to the project
```
git clone https://github.com/colbyfayock/use-custom-hook [directory]
cd [directory]
```
* Remove the git history by removing the `.git`
```
rm -rf .git
```
* Optional: Initiate a new git project
```
git init
```
* Optional: Add project to a new Github repository
See [Adding an existing project to GitHub using the command line](https://help.github.com/en/github/importing-your-projects-to-github/adding-an-existing-project-to-github-using-the-command-line)
* Update the `package.json` file to include your hook's name, description, and your author information

### Setting up your new hook
To get started, run the following command:
```
yarn setup
```

This will prompt you for custom name configurations in both a camelCase and snake-case format.

This can only be ran once, as it will clean up the script files immediately after running.

Make sure you remember to update your email address, author URL, git addresses, and anything else within the [hook-name]/package.json file.

### Updating the example
* Update all examples in `example/pages/index.js` to use your new hook instead of `useCustomHook`
* Update the How to Use section in `example/pages/index.js` with documentation on how to use your hook

### Developing with your hook
Running `yarn watch` in the root of this project will kick off a watch command in both the `example` and hook workspaces. This means any time you make a change to the hook, it will build, and subsequently, your example page will refresh with that new hook build.

### Publishing
* Navigate to your hook directory (default is use-custom-hook)
```
cd [hook directory]
```
* Log in to npm
```
npm login
```
* Publish 🎉
```
npm publish
```

### Depliying your example
Running `yarn build` in the root directory will create a new static build of the example website available in the `example/out` folder. This is standard HTML that can be uploaded to any static hosting software.