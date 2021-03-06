import Quill from "quill";
import html from "dom-template-strings";

class Component extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const options = {
      placeholder: "Write comments about day...",
      theme: "snow"
    };

    const body = this.createBody();
    this.appendChild(body);

    this.editor = new Quill(document.getElementById("comments"), options);
  }

  createBody() {
    return html`<section id="comments"></section>`;
  }
}

export default Component;
