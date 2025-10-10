# Story Components

Story components are web components we write to enhance our stories.

## Get started

Here is how to get started with a web component using Svelte + Panda CSS:

1. Duplicate the `example-svelte-panda` folder and rename it to fit your project. (`MY_COMPONENT`)
2. Update the `name` attribute of the `package.json` file so that the name matches your new folder name, with the
   `@story/` prefix. (
   `@story/MY_COMPONENT`)
3. Update the `tag` attribute of the `customElement` in the `src/index.svelte` file (in the `svelte:options` at the top)
   so that the tag of your custom element matches the name of your folder. (`tag: 'MY_COMPONENT',`).
4. The `src/index.svelte`file contains essential configuration code, notably to get Panda CSS to play nice with the
   rest of the setup. I don't recommended to poke it too much. Better to develop your component in separate
   files, like in the example. Don't forget to pass your input props to the child components.
5. Optional: Update the `README.md` file in your new folder with some documentation.
6. Install your dependencies with `pnpm install` (from the root of the monorepo).
7. Run `pnpm dev` from the project root to start the development server.
8. Use `index.html` to develop your component in the browser.

--

We also have an example of a web component built with vanilla JS in the `example-vanilla-js` folder, if this is more
your jam.

## Publish your component

1. Build your component by running `pnpm build` from the root of your project.
2. Use `index.html` to test the built component in the browser.
3. Commit and push your changes to the remote repository. Any changes pushed to the `main` branch will be deployed
   automatically to Vercel and be ready to link and use in Publikator.

## A Note of the Stack

Every story component is its own package in a monorepo managed with `pnpm`.

The component itself is responsible for its own stack, provided it builds into a web component. For instance: the one
example component was built wit vanilla JS (`story-components/example-vanilla-js`), the other one with Svelte and Panda
CSS (
`story-components/example-svelte-panda`). Both render as they should in Publikator.

The current setup uses Svelte because it looks easy and it's compatible with both web components and Panda CSS.

Panda CSS was chosen because we use it elsewhere in our codebase, meaning we were able to import our theme by copying
the existing `theme` package from elsewhere. Wrangling it to work with the rest of our setup was not the best part of my
week, so it might have been less effort to rewrite this in another framework, but now it seems happy.

Because of how web components work, the styles are encapsulated (they get applied to the shadowroot of the component),
so none of the styles from the article will interfere with the component styles, and vice versa.

Bottom line: you are not trapped in the stack, so if it makes you sad, feel free to write something different.