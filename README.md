## Installation:

```
git clone https://github.com/markcrispo/CSFS1010-Lab-3
cd CSFS1010-Lab-3
npm i
npm run dev
```

# CFS1010 Lab 3

We'll continue building on the task tracker app that we started in Lab 2.

## Step 1 - Intro to `useMemo`

[useMemo](https://react.dev/reference/react/useMemo) is a React hook that skips "expensive" operations on subsequent re-renders if the inputs to the operation haven't changed. This is a concept in computer science called [memoization](https://en.wikipedia.org/wiki/Memoization).

`useMemo` introduces some overhead, so you wouldn't want to use this hook _everywhere_. From the docs:

> In general, unless you’re creating or looping over thousands of objects, it’s probably not expensive. `useMemo` won’t make the first render faster. It only helps you skip unnecessary work on updates.

## Step 2 - Focus inputs with `useRef`

A product manager suggested a UX improvement:

> When you add a a new task, you currently need to waste an extra click to focus the input before you start typing.

Tasks:

- When you add a new task or edit an existing task, the input should be focused automatically.
- The input can be focused with a combination of [useRef](https://react.dev/reference/react/useEffect), [useEffect](https://react.dev/reference/react/useRef), and [HTMLElement:focus()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)

## Step 3 - Personalization & Intro to `useEffect`

In order to personalize the task tracker, we'll simulate logging in and changing users.

- In `App.jsx`, add a Login button
- On click, the user should be prompted with "What's your name?"
  - For simplicity we'll use [window.prompt()](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt)
- After "signing in", the header should display "Username's Task Tracker" and the button should say "Change user"

Now the important part! **We'll want to reset the Task Tracker whenever the username changes**.

In this simple example, we could reset the state of `ToDoList` by [lifting state](https://legacy.reactjs.org/docs/lifting-state-up.html) to `App.jsx`, but that's not always practical. Instead, let's explore three alternative solutions:

### 3a) `useEffect`

- Add a `useEffect` in `ToDoList.jsx` that resets `todos` whenever `username` changes

### 3b) `useState`

- Add a `useState` in `ToDoList.jsx` that tracks the "previous" value of `username`, i.e. the value on the previous render
- Reset `todos` whenever `username !== prevUsername`
- This is more performant than `useEffect`, but is only allowed when a component is setting its own state.

### 3c) `key` prop

- Add a `key` prop to `ToDoList.jsx` to unmount and remount the component whenever `username` changes

## Step 4 - Data Fetching

The backend team has given you an endpoint to fetch a user's todos when they log in:
`https://64dd28c2e64a8525a0f7af4a.mockapi.io/todos/:username`

When a user logs in, make a `GET` request to the API above with the user's username.

If the user has to-dos saved, the endpoint will return status 200 and a JSON array of their `todos` state. The to-do list should be populated with their todos upon logging in.

Otherwise, the endpoint will return status 404 (not found), and the to-do list should display the current list of default to-dos.

For testing purposes, the following users have to-dos saved:

```
"mark"
"dave"
```

Hint: Here's how we made a network request in the lecture

```
const result = await fetch("https://64bc22537b33a35a4447124f.mockapi.io/cats")
const catsResult = await result.json()
setCats(catsResult)
```
