// ========== Virtual DOM ========== //
function createElement(tag, props = {}, ...children) {
  if (typeof tag === "function") {
    // Functional component support
    return tag({ ...props, children });
  }

  return {
    type: tag,
    props,
    children: children.flat(),
  };
}

function render(vNode) {
  const element = document.createElement(vNode.type);

  for (let key in vNode.props) {
    if (key.startsWith("on") && typeof vNode.props[key] === "function") {
      // Real DOM event binding
      const eventType = key.slice(2).toLowerCase(); // e.g., onclick => click
      element.addEventListener(eventType, vNode.props[key]);
    } else {
      // Handle value separately for form elements
      if (
        key === "value" &&
        (element.tagName === "INPUT" || element.tagName === "TEXTAREA")
      ) {
        element.value = vNode.props[key];
      } else {
        element.setAttribute(key, vNode.props[key]);
      }
    }
  }

  for (let child of vNode.children) {
    if (typeof child === "object" && child !== null && "type" in child) {
      element.appendChild(render(child));
    } else {
      element.appendChild(document.createTextNode(child));
    }
  }

  return element;
}

function update(newVNode, oldVNode, container) {
  if (!oldVNode) {
    const element = render(newVNode);
    container.appendChild(element);
    return element;
  }

  if (newVNode.type !== oldVNode.type) {
    const element = render(newVNode);
    container.replaceChild(element, container.firstChild);
    return element;
  }

  const element = container.firstChild;

  // Update props
  for (let key in newVNode.props) {
    const newVal = newVNode.props[key];
    const oldVal = oldVNode.props[key];

    if (key.startsWith("on") && typeof newVal === "function") {
      const eventType = key.slice(2).toLowerCase();
      if (newVal !== oldVal) {
        element.removeEventListener(eventType, oldVal);
        element.addEventListener(eventType, newVal);
      }
    } else if (newVal !== oldVal) {
      element.setAttribute(key, newVal);
    }
  }

  // Remove old props
  for (let key in oldVNode.props) {
    if (!(key in newVNode.props)) {
      if (key.startsWith("on") && typeof oldVNode.props[key] === "function") {
        const eventType = key.slice(2).toLowerCase();
        element.removeEventListener(eventType, oldVNode.props[key]);
      } else {
        element.removeAttribute(key);
      }
    }
  }

  // Update children
  for (let i = 0; i < newVNode.children.length; i++) {
    const newChild = newVNode.children[i];
    const oldChild = oldVNode.children[i];

    if (typeof newChild === "object" && newChild !== null) {
      update(newChild, oldChild, element);
    } else if (newChild !== oldChild) {
      element.childNodes[i].textContent = newChild;
    }
  }

  return element;
}

// ========== useState System ========== //
let stateList = [];
let cursor = 0;
let root = document.getElementById("root");
let prevVNode = null;

function useState(initialValue) {
  const currentIndex = cursor;

  if (stateList[currentIndex] === undefined) {
    stateList[currentIndex] = initialValue;
  }

  function setState(newValue) {
    stateList[currentIndex] = newValue;
    rerender();
    console.log(newValue);
  }

  const value = stateList[currentIndex];
  cursor++;
  return [value, setState];
}

// ========== App + Re-render Logic ========== //
function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  return createElement(
    "div",
    {},
    Header(),
    createElement("h1", {}, `Count: ${count}`),
    createElement("button", { onclick: () => setCount(count + 1) }, "+"),
    createElement("br", {}),
    createElement("input", {
      type: "text",
      value: input,
      oninput: (e) => setInput(e.target.value),
    }),
    createElement("p", {}, `Typed: ${input}`)
  );
}

function Header() {
  return createElement("h1", {}, "Hello!");
}

function rerender() {
  cursor = 0;
  const newVNode = App();
  root.innerHTML = ""; // Clear previous DOM
  const newElement = render(newVNode);
  root.appendChild(newElement);
  prevVNode = newVNode;
}

prevVNode = App();
const initialRender = render(prevVNode);
root.appendChild(initialRender);
