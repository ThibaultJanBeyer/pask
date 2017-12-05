import dom from "dom-template-strings";

class Component extends HTMLElement {
  constructor(container) {
    super();
    this.events = container.get("events");
    this.api = container.get("api");
  }

  async connectedCallback() {
    const url = "https://api.myjson.com/bins/1ggk67",
      data = await this.api.get(url);
    if (data) {
      const body = this.createBody(data);
      this.appendChild(body);
    }
  }

  createBody(data) {
    const Tracker = customElements.get("tracker-el");
    return dom`${data.map(item => {
                    return new Tracker(item);
                  })}
            `;
  }
}

export default Component;
