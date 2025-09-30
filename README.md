# Quiz Maker

## Setup

The basic scaffold of the repo was made using Vite's `TypeScript` configuration. No optional choices were enabled.

- There is a `.node-version` file that specifies I'm using Node 22.20.0; this is used together with `fnm` for easy Node version switching when you `cd` into `frontend/`, but you can just directly install Node 22 on your machine without having to install a version switcher. (`fnm` also added the `packageManager` value as `npm@11.6.1`).

The `.env` file is committed to this repository as this is for demo purposes only.

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

My file organization structure currently puts globally reusable components (such as `<TextInput>`) into `src/components`; however, components specific to a Page, even if repeatedly used in that page, should belong to `src/pages/SpecificPage`. I did not bother making wrapper components for rarely used elements in here such as `<select>`, as it's only used two times in the entire repo.

`<TransitionButton>` is specifically created to show (at least in code) some way of handling loading and error states, as required in the specifications --- even if this is not easily visible when using locally hosted backend. I'm sure artificially slowing down responses will help with this.

Until such time as we detect performance issues by profiling the app, we do not prematurely need to optimize the app with `useCallback()` or memoization of components.

## External State (API)

We're using Tanstack query to help handle external state. It's important to note that to promote reusability of the same query across the app, we're making our own custom hooks under `src/hooks` to minimize repetition of code and to ensure we're avoiding typos with the query key, or paths, etc.

Given the shape of the backend API, the frontend mimics these routes and tries to aim for a good balancing act between persisting the user's partial work vs. limiting the number of network requests. For example, once a new question is added to the current quiz in Quiz Builder, a new question is immediately created through `POST /quizzes/:id/questions`. Similarly, when a question is deleted, the `DELETE` call is immediately invoked. However, we do not keep updating (through `PATCH /questions/:id`) every time the user makes a small change, such as changing the prompt or the correct answer. The user can press the [`Save Changes to Question`] button to save partial work.

## Further notes for potential future improvement

Some features are not included in this repository as they are not explicitly mentioned in the specifications.

### Quiz Builder notes

- Quiz Builder currently does not support reordering of drafted questions even though `position` update is possible to do in backend.
- Quiz Builder can potentially have locally saved state (such as through `LocalStorage` or `IndexedDB`) to help users incrementally create large quizzes across several browser sessions, or to avoid losing work when accidentally closing the browser tab. For now, however, they will need to either commit each question, or commit the entire quiz and end the quiz building process.
- All newly created quizzes will be simply marked as `isPublished: true` for now, as the specs do not mention publishing (or unpublishing) of quizzes.
- When persisting the entire quiz, right now the app applies a `PATCH` for all existing question drafts. However, a future improvement could be to do this more smartly, as larger datasets will incur a lot of parallel requests. My best idea is some implementation of a dirty/stale bit (mark it true for any question during modification of any data, and mark it false after mutation success). This way, we only need to PATCH the "unsaved" questions.

### Quiz Player notes

- Quiz timeout auto-submit is not yet implemented.
