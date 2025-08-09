## Project Guidance for AI Coding Agents

Purpose: React + Vite frontend for a Monday.com style board app (boards -> groups -> tasks with column values, optimistic updates, optional real-time via socket.io, local or remote persistence).

### Runtime / Build
* Dev server: `npm run dev` (Vite). Local-storage (mock) mode: `npm run dev:local` (sets `VITE_LOCAL=true`).
* Build: `npm run build`; Preview: `npm run preview`.
* Environment switches: `import.meta.env.VITE_LOCAL === 'true'` selects local async-storage service; otherwise uses HTTP API at `//localhost:3030/api/` (dev) or `/api/` (prod).
* Socket base URL: same host ('' in prod, `//localhost:3030` in dev).

### App Entry & Composition
* `src/index.jsx` mounts `<RootCmp/>` under `<Provider store>` and `<Router>`.
* `RootCmp.jsx` re-wraps with a second `<Provider>` (duplicate — preserve unless refactoring) and initializes data (`loginUserFromCookies`, `loadUsers`, `loadBoards`). It conditionally renders header/sidebar layout vs. auth/welcome routes.

### State Management (Redux - no middleware)
* Store: `src/store/store.js` combines `boardModule`, `userModule`, `systemModule` using legacy `createStore`; optional Redux DevTools only (no thunk, side effects done in action functions).
* Pattern: Async/optimistic logic resides in `src/store/actions/*.actions.js` (plain exported async functions calling services, then `store.dispatch`). This bypasses typical thunk; always import `store` directly.
* IMPORTANT: When adding async actions follow existing pattern: (1) snapshot original state if needing rollback, (2) dispatch an optimistic action, (3) persist via service, (4) dispatch final UPDATE action or rollback on error.

### Board Domain Model
* Board shape (see `services/board/index.js#getDefaultBoard`): `{ name, members, columns[], groups[], tasks[], activities[] }`.
* Groups: `{ _id, title, color, tasks: [] }` but canonical list of tasks actually lives in `board.tasks`; group objects are used mainly for ordering & metadata.
* Tasks: stored flat in `board.tasks` with `groupid` linking to a group, plus `column_values` keyed by column `_id` (e.g. `status_column`, `owners_column`, `due_date_column`). Some components may expect these exact IDs—do not rename: status_column, owners_column, due_date_column.
* Column types defined under `services/board/column-types/` each export `getDefaultValue()`; aggregated in `column-types/index.js`.

### Optimistic Update Conventions
* Dedicated reducer action types: `UPDATE_TASK_PROPERTY_OPTIMISTIC`, `UPDATE_TASK_COLUMN_OPTIMISTIC`, `UPDATE_GROUP_PROPERTY_OPTIMISTIC`, `ADD_GROUP_OPTIMISTIC`, `ADD_TASK_OPTIMISTIC`, plus comment actions.
* Flow example (task column update): dispatch optimistic action -> mutate in reducer -> save whole board (`boardService.saveBoard`) -> dispatch `UPDATE_BOARD` with server copy; on error restore original board via `SET_BOARD`.
* Always retrieve post-optimistic board from `store.getState().boardModule.board` before persisting.

### Persistence Layers
* Selection logic in `services/board/index.js`: chooses between `board.service.local` (Async LocalStorage) and `board.service.remote` (HTTP) via `VITE_LOCAL` flag.
* Local service seeds demo data from `demo-data-new.js` into storage key `BOARD` once. Remote service exposes: `query`, `getById`, `saveBoard`, `removeBoard`, `addBoardMsg`, `removeComment`.
* When creating new boards use `boardService.getDefaultBoard(title)` — it pre-populates groups, tasks, and columns with required IDs and default status label values.

### Real-Time (Socket.IO)
* Socket setup: `services/socket.service.js` auto-connects on import and logs connection events. Exposes room helpers: `joinBoard(boardId)`, `leaveBoard(boardId)`, `onBoardUpdated(cb)`, `offBoardUpdated(cb)`.
* If implementing live board sync, emit/handle `SOCKET_EVENT_BOARD_UPDATED` after successful persistence; follow existing naming constants at top of file.

### Utilities & IDs
* ID generation: `util.service.makeId(length, prefix)` wraps `nanoid`. Many optimistic paths create IDs client-side; server responses may later replace entities (ensure final `UPDATE_BOARD` uses authoritative IDs).
* Acceptable default column value for unset status/priority is literal string `'Default'` (not null) — match reducer & creation logic.

### Styling & Assets
* Single entry stylesheet: `src/assets/styles/main.scss` orchestrates layered imports (setup -> basics -> pages -> components -> group). Add new partials under the appropriate folder and import them there (avoid extra global imports elsewhere).
* Setup partials (`setup/_variables.scss`, `_mixins.scss`, `_functions.scss`, `_typography.scss`) define design tokens. Reuse existing `$clr*` palette & breakpoint vars; do not redefine colors ad‑hoc inside components—extend variables or add semantic aliases if needed.
* Use provided mixins for responsiveness: `for-mobile-layout`, `for-narrow-layout`, `for-normal-layout`, `for-wide-layout`. Wrap component-specific responsive rules instead of writing raw media queries to stay consistent.
* Animations: prefer the shared `fade-in` mixin or define new keyframes inside a central partial (`basics/_animations.scss`) rather than per-component duplication.
* Component scss naming mirrors component folders (`components/Items/Label.scss` etc.). Group-related styling aggregated via `components/group/_group.scss` which re-imports its sub-partials—add new group sub-styles there to keep load order predictable.
* Avoid importing SCSS directly inside leaf components; rely on the global cascade from `main.scss`. Only create a new top-level import if the style is globally reused.
* SVG assets: imported either as files (backgrounds) or as React components via `vite-plugin-svgr` (`import Icon from 'path/icon.svg?react'`). Prefer the `?react` form for interactive/colored icons.

### Linting / Code Style
* ESLint config (`eslint.config.js`) uses flat config + React rules. Avoid unused vars; prefix with uppercase/underscore if intentionally unused per `'varsIgnorePattern': '^[A-Z_]'`.
* ESNext target (vite + esbuild) allows modern syntax; modules use explicit `.js/.jsx` extensions.

### Adding New Domain Features (Example Checklist)
1. Extend column types: create `services/board/column-types/<type>.js` exporting `{ getDefaultValue }`; register in `column-types/index.js` and add to `getDefaultColumns()` if universally required.
2. For new task field editable inline: add optimistic reducer case mirroring existing task/group patterns; create action that dispatches it then persists.
3. Keep task flat storage; don't embed tasks inside groups beyond existing placeholder `group.tasks` arrays unless refactoring both services + reducers.

### Common Pitfalls
* Double Provider: Avoid reading store before initialization inside `RootCmp` subtrees; data-load already occurs in `useEffect` of RootCmp. If refactoring, remove the inner `<Provider>` first (outer one in `index.jsx` is sufficient).
* Ensure optimistic rollback path dispatches `SET_BOARD` with original snapshot; do not directly mutate original references before cloning.
* Do not change reserved column IDs; UI logic & default board seeding rely on them.
* Adding SCSS without updating `main.scss` (or the relevant aggregator partial like `group/_group.scss`) means styles won't load—ensure import is present.
* Duplicating color hex codes instead of reusing `$clr*` variables leads to inconsistent themes; introduce new token in `_variables.scss` if truly missing.

### Quick Reference (Key Files)
* Entry / layout: `src/index.jsx`, `src/RootCmp.jsx`
* Store: `src/store/store.js`, reducers under `reducers/`, async patterns under `actions/`
* Board domain & persistence: `src/services/board/`
* HTTP layer: `src/services/http.service.js`
* Real-time: `src/services/socket.service.js`
* Utilities: `src/services/util.service.js`
* Hooks example (animations): `src/hooks/useBoardAnimations.js` (delayed DOM-ready animation pattern)

### When Unsure
Prefer mimicking an existing action (e.g., `updateTaskDirectProperty`) for shape & rollback behavior. Confirm final state shape matches reducer expectations before persisting.

---
Feedback welcome: identify unclear sections or missing patterns (tests, authentication flow, board filtering) to iterate.
