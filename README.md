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
* Find all instances of `useCustomHook` in the project folder and replace it with your new hook name
* Find all instances of `use-custom-hook` in the project folder and replace it with your new hook name
* Rename `src/useCustomHook.js` to your new hook's name and update the location in `src/index.js`

### Updating the example
* Update all examples in `example/pages/index.js` to use your new hook instead of `useCustomHook`
* Update the How to Use section in `example/pages/index.js` with documentation on how to use your hook
* Update the name and description in `example/pages/index.js` to your new hook's name and description

### Testing your hook
* Build the hook locally. From the root of the project, run:
```
yarn build
```
* Refresh the dependency in the example. In the `example` folder, run:
```
yarn refresh
```
* Start the development server
```
yarn develop
```
* Build the static website
```
yarn package
```

### Publishing
* Log in to npm
```
npm login
```
* Publish 🎉
```
npm publish
```
