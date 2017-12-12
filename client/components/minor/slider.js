import html from "dom-template-strings";

class Component extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const body = this.createBody();
    this.appendChild(body);
  }

  createBody() {
    return html`<input type="range" />`;
  }
}

export default Component;
