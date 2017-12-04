import dom from "superdom";

class Component extends HTMLElement {
  constructor(container) {
    super();
    this.container = container;
    this.events = this.container.get("events")
  }

  connectedCallback() {
    this.createBody();
    this.events.on("test", this.addElement);
  }
  
  addElement() {
    const main = dom.id.items,
          data = dom`<p>new item</p>`;
          main.appendChild(data);  
  }

  createBody() {
    const containerElement = `<fieldset id="entry-container">
                                <legend>Options</legend>
                                <section id="items"></section>
                              </fieldset>`;

    this.innerHTML = containerElement;
  }
}

export default Component;