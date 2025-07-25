function createElement(tag, props = {}, ...children) {
  const vNode = {
    type: tag,
    props: props,
    children: children.flat(), // make the array fully like this [] instead of this [[]]
  };

  return vNode;
}

function render(vNode) {
  const renderTag = document.createElement(vNode["type"]);

  for (let key in vNode.props) {
    renderTag.setAttribute(key, vNode["props"][key]);
  }

  for (let i = 0; i < vNode["children"].length; i++) {
    const child = vNode.children[i];

    if (typeof child === "object" && child !== null && "type" in child) {
      let childTag = render(child);

      renderTag.appendChild(childTag);
    } else {
      const textNode = document.createTextNode(child);
      renderTag.appendChild(textNode);
    }
  }

  return renderTag;
}

function update(newVNode, oldVNode, container) {
  // Check if there is a oldVNode
  if (!oldVNode) {
    const element = render(newVNode);
    container.appendChild(element);
    return element;
  }

  // Check and Update if the type/tag is different
  if (newVNode.type !== oldVNode.type) {
    const element = render(newVNode);
    container.replaceChild(element, container.firstChild);
    return element;
  }

  // Main element
  const element = container.firstChild;

  // Props adding
  for (let key in newVNode.props) {
    if (!(key in oldVNode.props)) {
      element.setAttribute(key, newVNode.props[key]);
    }
  }

  // Remover of props that not in newVNode
  for (let key in oldVNode.props) {
    if (!(key in newVNode.props)) {
      element.removeAttribute(key);
    }
  }

  // Children recursive update checking
  for (let i = 0; i < newVNode.children.length; i++) {
    const newChild = newVNode.children[i];
    const oldChild = oldVNode.children[i];

    if (typeof newChild === "object") {
      update(newChild, oldChild, element);
    } else if (newChild !== oldChild) {
      element.childNodes[i].textContent = newChild;
    }
  }

  return element;
}

let root = document.getElementById("root");

const main = createElement("h1", { id: "hello" }, "Hello!");

const mainRendering = render(main);

root.appendChild(mainRendering);

let prevVNode = main;
const newVNode = createElement("h1", { id: "HI" }, "HI!");

update(newVNode, prevVNode, root);
