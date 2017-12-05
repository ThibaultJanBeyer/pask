import dom from "dom-template-strings";

class Component extends HTMLElement {
  constructor(container) {
    super();
    this.container = container;
    this.events = this.container.get("events");
    this.elements = ["data"];
  }

  connectedCallback() {
    const body = this.createBody();
    this.appendChild(body);
    this.events.on("test", this.addElement.bind(this));
  }

  addElement() {
    this.elements.push("new");
    const body = this.createBody();
    this.replaceChild(body, this.children[0]);
  }

  createBody() {
    const items = dom`${this.elements.map(item => {
        return dom`<span>${item}</span>`;
      })}`,
      containerElement = dom`<fieldset id="entry-container">
                                <legend>Options</legend>
                                <section id="items"></section>
                                ${items}
                              </fieldset>`;
    return containerElement;
  }
}

export default Component;
