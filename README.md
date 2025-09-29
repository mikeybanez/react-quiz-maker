# Quiz Maker

## Setup

The basic scaffold of the repo was made using Vite's `TypeScript` configuration. No optional choices were enabled.

- There is a `.node-version` file that specifies I'm using Node 22.20.0; this is used together with `fnm` for easy Node version switching when you `cd` into `frontend/`, but you can just directly install Node 22 on your machine without having to install a version switcher. (`fnm` also added the `packageManager` value as `npm@11.6.1`).

To run the frontend, just do `npm run dev`.
To test the production version of the frontend, first do `npm run build` and then `npm run preview`.

For making new commits in the future, I recommend setting up prettier on your IDE with default settings. For now, I am not committing my workspace `.vscode` settings (and this is ignored in `.gitignore`), but this can be an option for larger teams that need unified setups.

## Code structure

Because the app is fairly simple, there is no need to use some routing library at the moment. A single `useState()` in the top-level `App` should suffice, with `setPage()` callbacks passed down to individual pages as props.

A few notes:

- pages should be defined in `src/pages`
- reusable components should be in `src/components`
- shared type definitions should be in `src/types`

## Components

Component styling is kept to a minimum of a few global CSS files, and some usage of inline styles.

My file organization structure currently puts globally reusable components (such as `<TextInput>`) into `src/components`; however, components specific to a Page, even if repeatedly used in that page, should belong to `src/pages/SpecificPage`.

Until such time as we detect performance issues by profiling the app, we do not prematurely need to optimize the app with `useCallback()` or memoization of components.

## External State (API)

We're using Tanstack query to help handle external state. It's important to note that to promote reusability of the same query across the app, we're making our own custom hooks under `src/hooks` to minimize repetition of code and to ensure we're avoiding typos with the query key.

## Further notes for potential future improvement

Some features are not included in this repository as they are not explicitly mentioned in the specifications.

- Quiz Builder currently does not support reordering of drafted questions.
- Quiz Builder can potentially have locally saved state (such as through `LocalStorage` or `IndexedDB`) to help users incrementally create large quizzes across several browser sessions, or to avoid losing work when accidentally closing the browser tab.
- There is currently no way to update quizzes and questions that have already been submitted to the Quiz Builder, as this was not specified in the docs. However, the backend APIs appear to already support PATCH endpoints for these.
- Quiz Player currently does not remember if you have submitted an answer for a question, when navigating between questions.

### ALL OF README BELOW WAS GENERATED FROM VITE'S INITIALIZATION

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
