# 📘 Project Documentation: Build a Mini JavaScript Framework (No Libraries)

---

## 🎯 Goal:

Create your own basic frontend framework that mimics core ideas behind React — without using any libraries. This will help you understand rendering, diffing, state, and DOM updates from the ground up.

---

## 🧠 Phase 1: Design Your `createElement` Function

### Concept:

This function acts like React's JSX transformer. You pass a tag name, props, and children, and it returns an object representing the virtual DOM.

### Output Shape (Virtual Node / VNode):

```js
{
  type: 'div',
  props: { id: 'app' },
  children: [
    { type: 'h1', props: {}, children: ['Hello'] }
  ]
}
```

### Hints:

- Accept three arguments: type, props, children
- `children` should always be an array
- If a child is a string, treat it as a text node
- Think recursively

### ✅ Deliverable:

A `createElement` function that returns a virtual node tree.

---

## 🧠 Phase 2: Create a Real DOM from VNodes

### Concept:

Now that you have a virtual DOM tree, you need a function to turn it into actual DOM elements and append to the document.

### Hints:

- Use `document.createElement` or `document.createTextNode`
- Loop through props and set them using `.setAttribute`
- Recursively append child nodes

### ✅ Deliverable:

A `render(vnode, container)` function that renders the virtual DOM to a real DOM node.

---

## 🧠 Phase 3: Implement Diffing & Re-rendering

### Concept:

If your state changes, you shouldn't re-render the entire DOM. You should only update parts that changed.

### Hints:

- Track previous vnode
- On update, compare new vnode to previous vnode
- If a tag or key changed, replace the whole node
- If just props or children changed, update in place

### ✅ Deliverable:

An `update()` function that compares new virtual tree to the old one and efficiently updates the DOM.

---

## 🧠 Phase 4: Add a Simple State System

### Concept:

Create a `useState`-like function that allows components to store and update state.

### Hints:

- Use an array to store state values
- Use a cursor/index to know which state you're accessing
- On state change, re-render the component
- Reset the cursor before every render

### ✅ Deliverable:

A `useState` function that tracks state per render and allows components to trigger re-renders.

---

## 🧠 Phase 5: Add Event Handling

### Concept:

Allow components to respond to user actions like clicks.

### Hints:

- Pass event listeners like `onClick` in the props
- While rendering, attach them via `.addEventListener`
- Strip `on` prefix to get event name

### ✅ Deliverable:

Your framework supports basic events like clicks, input, etc.

---

## 🧠 Phase 6: Optional Bonus Features

### Add Component Functions

- A component is just a function that returns a virtual node
- Allow nesting components

### Add Keys for Children

- Help track children during diffing
- Useful when mapping over lists

---

## 🧪 Testing It All Together

Build a simple app:

- A counter with a button
- Each click updates the count
- Render changes efficiently without full refresh

---

## ✅ Final Deliverables:

1. `createElement` function (JSX alternative)
2. `render` function to attach virtual DOM to real DOM
3. `update` diffing logic
4. `useState` logic
5. Event handling (like onClick)
6. Optional: support for function components, keys, and effects

---

## 🧭 Tips:

- Don’t focus on perfection. Focus on learning.
- Write logs at each step to understand what's happening.
- Build slowly. Debug deeply.

---

Once you're done, you'll understand how tools like React actually work internally. You won't just use them — you'll _own_ the logic behind them.
