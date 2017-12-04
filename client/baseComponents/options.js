import dom from "superdom";

class Component extends HTMLElement {
  constructor(container) {
    super();
    this.container = container;
    this.events = container.get("events");
  }

  connectedCallback() {
    this.createBody();
  }

  createBody() {
    const containerElement = `<fieldset id="tracker-actions">
                                <legend>Options</legend>
                              </fieldset>`;

    this.innerHTML = containerElement;
  }
}

export default Component;