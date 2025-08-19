# Frontend Engineer Technical Test

## Overview

- ⏱ **Time Limit:** 3 hours.
- 📦 **Submission:** GitHub repo.
- ⚽️ **Goal:** Create a catalogue UI using a **micro-frontend** setup built with **Vite** and [**Module Federation**](https://module-federation.io/) using **React 19** and TypeScript.

### The project is structured as two applications:
- **Host App** (`apps/host`) – consumes components from remotes.
- **Remote Products App** (`apps/remote-products`) – exposes product-related components.

### You will:
1. Fetch and display product data in the **remote**.
2. Handle search (by name), filter (by category), and sort (by price) for product data.
3. Integrate the remote component into the **host**.
4. Style the UI using a **design system of your choice** (e.g., Radix UI, Ant Design, custom component library, etc.).
5. Demonstrate good engineering practices (code quality, component architecture, performance awareness).
6. Document your choices, decisions, and any todo's in **SUBMISSION.md**.

**If time allows**, then please add any optimizations or modifications that you think are appropriate for a catalogue style UI.

### Limitations
1. Do not use any meta frameworks

---

## Requirements

### Core Tasks
1. **Fetch Data**  
   - Use the provided `msw` mock API in the remote app for product data.
   - Display products in a suitable layout with name, description, and price.
     > Note: the seed data includes `name`, `price`, `category`, and `rating`. If a description is needed, add a small field or derive one.
   
2. **Host Integration**  
   - Host should load the `ProductList` component from the remote using Module Federation.
   - Pass `featureFlags` from the host to the remote (already scaffolded).

3. **Design System**  
   - Choose and integrate a design system of your choice.
   - Ensure a consistent look & feel across host and remote.
   - Demonstrate responsive design considerations.

4. **Component-Driven Approach**  
   - Build reusable UI components where appropriate.
   - Apply good separation of concerns.


### Accessibility Expectations

- Semantic HTML (e.g., lists, headings, buttons).
- Forms/controls with accessible labels.
- Keyboard support.
- Visible focus outlines.

### What We Evaluate

- Technical correctness: Does the host load the remote? Do features work?
- Code quality: Structure, naming, component boundaries, typed props.
- Design system usage: Consistency and clarity.
- Accessibility: Semantics & keyboard behavior.
- Performance awareness: Avoid unnecessary re-renders; sensible memoization.
- Scope management: 3-hour timebox respected; clear notes in SUBMISSION.md.


---

## Running locally

Both apps can be run from the repo root using a single command.

```bash
npm install
npm run dev

# Host runs on http://localhost:3001
# Remote runs on http://localhost:3002
```

---

## Project Structure

```
apps/
  host/
    index.html
    vite.config.ts             # consumes remote as ESM Module Federation remote
    src/
      main.tsx                 # lazy-loads ProductList from remote
      types/federation.d.ts    # TS types for 'products/ProductList'
  remote-products/
    index.html
    vite.config.ts             # exposes ./ProductList as ESM MF remote
    src/
      main.tsx                 # standalone dev page
      ProductList.tsx          # your main component (extend here)
      msw/
        browser.ts
        handlers.ts            # creates seed data and api
package.json                   # workspaces + scripts
tsconfig.base.json             # TS config (Bundler resolution + react-jsx)
```