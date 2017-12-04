class Component extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.createBody();
  }

  createBody() {
    const containerElement = `<fieldset id="tracker-actions">
                                <legend>Actions</legend>
                              </fieldset>`;

    this.innerHTML = containerElement;
  }
}

export default Component;