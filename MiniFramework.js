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
  const updatedVNode = render(newVNode);

  if (oldVNode === null) {
    container.appendChild(updatedVNode);
  } else if (oldVNode.type !== newVNode.type) {
    container.replaceChild(updatedVNode, container.firstChild);
  } else if (oldVNode.props !== newVNode.props) {
    for (let key in newVNode.props) {
      updatedVNode.setAttribute(key, vNode["props"][key]);
    }
  } else if (oldVNode.children !== newVNode.children) {
    for (let i = 0; i < updatedVNode["children"].length; i++) {
      const child = updatedVNode.children[i];

      if (typeof child === "object" && child !== null && "type" in child) {
        let updatedChild = update(
          newVNode.children[i],
          oldVNode.children[i],
          updatedVNode
        );

        updatedVNode.appendChild(updatedChild);
      } else {
        const textNode = document.createTextNode(child);
        updatedVNode.appendChild(textNode);
      }
    }
  }

  container.appendChild(updatedVNode);
}

let root = document.getElementById("root");

const main = createElement("h1", { id: "hello" }, "Hello!");

const mainRendering = render(main);

root.appendChild(mainRendering);

let prevVNode = main;
const newVNode = createElement("h1", { id: "HI" }, "HI!");

update(newVNode, prevVNode, root);
