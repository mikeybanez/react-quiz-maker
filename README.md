# Quiz Maker

## Setup

The basic scaffold of the repo was made using Vite's `TypeScript` configuration. No optional choices were enabled.

- There is a `.node-version` file that specifies I'm using Node 22.20.0; this is used together with `fnm` for easy Node version switching when you `cd` into `frontend/`, but you can just directly install Node 22 on your machine without having to install a version switcher. (`fnm` also added the `packageManager` value as `npm@11.6.1`).

To run the frontend, just do `npm run dev`.
To test the production version of the frontend, first do `npm run build` and then `npm run preview`.

## Code structure

Because the app is fairly simple, there is no need to use some routing library at the moment. A single `useState()` in the top-level `App` should suffice, with `setPage()` callbacks passed down to individual pages as props.

- pages should be defined in `src/pages`
- reusable components should be in `src/components`
- shared type definitions should be in `src/types`

## Components

Form components such as the TextInput have been memoized, to anticipate larger datasets (such as long quizzes). Additionally, `useCallback()` is used liberally to cache callback functions for repeating components (for example, the `Remove this question` callback for individual `Question` components). While these cases may be automatically optimized by React Compiler, I have chosen not to opt into React Compiler just yet, as it is not officially considered production-ready.

While there may be more components that have not been optimized (such as the navbar for the pages), I have chosen not to do so as these are very small components and are not at risk of becoming unscalable.

Component styling is kept to a minimum of a few global CSS files, and some usage of inline styles.

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
