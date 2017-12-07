import dom from "dom-template-strings";

class Component extends HTMLElement {
  constructor(container) {
    super();
    this.container = container;
    this.events = container.get("events");
    this.className = "container";
  }

  connectedCallback() {
    this.createBody();
  }

  sendMessage() {
    this.events.emit("test");
  }

  createBody() {
    return dom`<button>Button</button>`;
  }
}

export default Component;
