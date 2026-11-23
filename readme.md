# 🔭 DevScope v2

> **Find the best developers through their code.** _Le code ne ment pas._

DevScope is a front-end web app for a fictional tech recruitment startup. A recruiter searches a developer by GitHub username, explores their profile and public repositories, and manages a shortlist of candidates saved on a REST API.

**Author:** Mohamed Qaddoura · **Version:** 2.0 · **Stack:** HTML5, Tailwind CSS, vanilla JavaScript (ES modules)

---

## 🎤 Presentation

Project presentation: https://canva.link/gqrz9dnk5ydd0fq

---

## 📸 Screenshots

|                 Home                 |                  Profile                   |                   Shortlist                    |
| :----------------------------------: | :----------------------------------------: | :--------------------------------------------: |
| ![Home](assets/screenshots/home.png) | ![Profile](assets/screenshots/profile.png) | ![Shortlist](assets/screenshots/shortlist.png) |

---

## 📖 About

Recruiters waste time looking up developers one by one on GitHub and tracking candidates in scattered files. DevScope puts everything in one place:

1. **Search** a developer by GitHub username.
2. **Analyze** their profile and public repositories.
3. **Shortlist** them as a candidate, then rate them, set a recruitment status and add notes.

The app uses **no framework and no build step**.

---

## ✨ Features

### Search

- Username validation **before** any request: letters, digits and hyphens, 1 to 39 characters, no hyphen at the start or end.
- Live feedback while typing. The "Analyser" button stays disabled until the name is valid.
- The search bar is also available on the profile page.

### Profile

- Photo, name, login, bio, location, member since, repositories, followers, following, and a link to the original GitHub profile.
- Repository cards with name, description, language, stars, forks and last update.
- One-click **Add to shortlist**, with **duplicate prevention** and clear success or "already added" messages.

### Shortlist

- Candidate list loaded from MockAPI, with the total count.
- **Search** by login.
- **Status tabs**: All, To contact, Interview, Hired, Rejected.
- **Edit** a candidate (status, rating out of 5, internal note) with `PUT`.
- **Delete** a candidate with a confirmation dialog and `DELETE`.
- Empty state when no candidate matches.

### Robustness

- Clear messages for **404** (user not found), **403 / 429** (GitHub rate limit) and other errors.
- Every request is protected with `try / catch`, and `response.ok` is checked before the data is used.
- **Local cache** of GitHub responses (10 minutes) to save the 60 requests per hour limit.

---

## 🆕 What's new in v2

| Area         | v1                        | v2                                                      |
| ------------ | ------------------------- | ------------------------------------------------------- |
| Shortlist    | Add and list candidates   | Edit status, rating and note · Delete with confirmation |
| Filtering    | Search                    | Search and status tabs combined in one function         |
| Performance  | Every visit calls GitHub  | `localStorage` cache with a 10-minute lifetime          |
| Architecture | `api.js` imported UI code | `api.js` talks only to the APIs                         |
| Feedback     | Console errors            | On-screen messages for success, duplicates and errors   |

---

## 🛠️ Tech stack

| Layer              | Technology                                            |
| ------------------ | ----------------------------------------------------- |
| Markup             | HTML5, semantic tags                                  |
| Styling            | Tailwind CSS v4, mobile-first                         |
| Logic              | Vanilla JavaScript, ES6 modules (`import` / `export`) |
| Data source        | GitHub REST API (profiles and repositories)           |
| Persistence        | MockAPI (shortlist: `GET`, `POST`, `PUT`, `DELETE`)   |
| Cache              | `localStorage`                                        |
| Icons              | Material Icons, Font Awesome                          |
| Project management | Jira (epics and tickets), Git and GitHub              |

---

## 🏗️ Architecture

### Folder structure

```
devscope/
├── index.html              Home page
├── pages/
│   ├── search.html         Search page
│   ├── profil.html         Profile page (?user=...)
│   └── shortlist.html      Shortlist page
├── css/
│   └── all.css             Custom styles Tailwind doesn't cover
├── js/
│   ├── config.js           Constants (MockAPI URL)
│   ├── api.js              MockAPI calls: create, delete, modify
│   ├── cache.js            localStorage cache with expiration
│   ├── search.js           Search page entry point
│   ├── search-func.js      Username validation and redirect
│   ├── profil.js           Profile page entry point
│   ├── profil-func.js      Fetch (with cache) and render profile and repos
│   ├── shortlist.js        Shortlist page entry point and events
│   ├── shortlist-func.js   Fetch, filter and render candidates
│   └── ui.js               Small UI helpers
└── README.md
```

### Module dependencies

Each page has one **entry point** that wires the events and calls a **functions file** that does the work. `api.js` and `cache.js` are shared and never touch a specific page.

```
search.js ────► search-func.js

profil.js ────► profil-func.js ───► cache.js
    │                 └───────────► api.js ───► config.js
    └──────────► search-func.js

shortlist.js ─► shortlist-func.js
    ├─────────► api.js ───► config.js
    ├─────────► config.js
    └─────────► ui.js
```

### Data flow with the cache

```
getData(username)
   │
   ├─ getCache(key) ── hit and under 10 min ──► render profile
   │
   └─ miss ─► fetch GitHub ─► response.ok ?
                                 ├─ no  ─► throw status ─► catch shows the message
                                 └─ yes ─► setCache(key, data) ─► render profile
```

Errors are **never cached**: `setCache` is only reached after `response.ok` is `true`.

Cache keys follow the format `devscope:user:<login>` and `devscope:repos:<login>`, with the login in lowercase.

### MockAPI data model (`candidats`)

```json
{
  "id": "1",
  "login": "octocat",
  "name": "The Octocat",
  "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
  "html_url": "https://github.com/octocat",
  "language": "JavaScript",
  "status": "Entretien",
  "note": "Strong portfolio",
  "rating": 4,
  "createdAt": "2026-11-06T13:58:18.286Z"
}
```

### Error handling

| Case                   | Source     | Behavior                                  |
| ---------------------- | ---------- | ----------------------------------------- |
| Invalid username       | Validation | Message under the field, no request sent  |
| `404`                  | GitHub     | "Utilisateur introuvable" message         |
| `403` / `429`          | GitHub     | Rate limit message                        |
| Network or other error | Any        | Generic error message                     |
| Already shortlisted    | MockAPI    | "Already in shortlist" message, no `POST` |
| No candidate           | Shortlist  | Empty-state message                       |

---

## 🚀 Getting started

### Prerequisites

- A modern browser.
- A local server. **ES modules do not load from `file://`**, so use the VS Code _Live Server_ extension or `npx serve`.
- A free MockAPI account.

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd devscope

# 2. Start a local server (pick one)
npx serve .
# or open the folder in VS Code and click "Go Live"
```

### Configure MockAPI

1. Create a project and a resource named **`candidats`** with these fields: `login`, `name`, `avatar_url`, `html_url`, `language`, `status`, `note`, `rating`, `createdAt`.
2. Put the resource URL in `js/config.js`:

```js
export const MOCKAPI_URL = "https://<your-id>.mockapi.io/api/v1/candidats";
```

No GitHub token is needed. Unauthenticated requests are limited to **60 per hour**, which is why the cache exists.

---

## 🎓 What I learned

### JavaScript and the network

- **`fetch` only rejects on network failure.** A `404` or `403` is still a "successful" request, so `response.ok` must be checked before using the data.
- **`async / await` with `try / catch`** makes asynchronous code read like synchronous code, and one `catch` handles every kind of failure.
- **HTTP methods and status codes**: `GET` reads, `POST` creates, `PUT` updates, `DELETE` removes. `200`, `404`, `403` and `429` each mean something different to the user.
- **Sending JSON**: `JSON.stringify(body)` plus the `Content-Type: application/json` header.
- **Throwing the status code** (`throw new Error(response.status)`) lets one `switch` in the `catch` choose the right message.

### DOM and security

- **`textContent` instead of `innerHTML`** for API data, so a malicious bio or repository name can't inject HTML (XSS).
- **`<template>` and `cloneNode`**: a template's content is not part of the page, so I query inside the **clone** and append it to a **visible container**.
- **Event delegation**: one listener on the list container plus `closest()` handles every card, even those created later. `closest()` only looks **up** the tree, never at siblings.
- **Default values** for `null` data coming from GitHub (no bio, no location, no description).

### Data handling

- **`filter`, `map`, `sort`, `some`** to search, transform and check lists, with several filters combined in one function that always starts from the full list.
- **`localStorage` cache with an expiration time**: storing `{ data, savedAt }`, comparing with `Date.now()`, and building unique, normalized keys.
- **Slimming data before caching**: a GitHub repository has about 80 fields and the page uses 6, while `localStorage` holds only about 5 MB.

### Architecture

- **Module side effects**: importing a file _runs_ it. One import in `api.js` loaded the shortlist page's code on the profile page and crashed it.
- **Separation of concerns**: an API file talks to APIs only. The page decides when to refresh the UI (`await deleteCandidat(id)`, then `getShortlist()`).
- **Circular imports** (`shortlist.js` and `shortlist-func.js`) work by luck and should be avoided.

### Workflow

- **Jira**: organizing work in epics and tickets and keeping the board up to date.
- **Git**: small, regular commits with the ticket key in the message, for example `DEV-12: add username validation`.
- **Reading the console**: the error line shows where the error was _caught_, not always where it _happened_. `console.error(error)` gives the full stack, unlike `error.message`.

### Bugs that taught me the most

| Bug                                                                               | Cause                                                                                          | Fix                                                                                  |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Profile page blank, `Cannot read properties of null (reading 'addEventListener')` | `api.js` imported `shortlist-func.js`, which loaded `shortlist.js` on every page               | Remove UI imports from `api.js` and refresh the list in `shortlist.js` after `await` |
| Cache never hit                                                                   | Typo: `savedAT` written, `savedAt` read, so `NaN < duration` was always `false`                | Use the same property name on both sides                                             |
| Shortlist cards never displayed                                                   | `querySelector` on `document` instead of the clone, and the clone appended to the `<template>` | `clone.querySelector(...)` and append to a visible container                         |
| Language tag disappeared from the card                                            | `textContent` on a parent erased its child `<small>`                                           | Put the text in its own `<span>`                                                     |
| "To contact" filter showed nothing                                                | Candidates saved with `status: ""` but filtered with `"A Contacter"`                           | Save a real default status                                                           |
| Click handler crashed                                                             | `closest()` returned `null` outside a card, and `.note` is a sibling, not an ancestor          | Guard with `if (!card) return` and search inside the card                            |

---

## 🧭 Roadmap

- [ ] Loading spinner during every request
- [ ] "Réessayer" button on network errors
- [ ] Shortlist search by **name** as well as login
- [ ] Shortlist sort (name or date added)
- [ ] Repository search, language filter, sort and pagination (6 per page)
- [ ] GitHub rate limit counter in the navbar (`x-ratelimit-remaining` header)
- [ ] Remove the circular import between `shortlist.js` and `shortlist-func.js`
- [ ] Full accessibility pass and W3C validation of every page

---

## 👤 Author

**Mohamed Qaddoura** · Front-end training project, November 2026
