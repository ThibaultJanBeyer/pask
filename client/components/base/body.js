import dom from "dom-template-strings";

class Component extends HTMLElement {
  constructor(container) {
    super();
    this.events = container.get("events");
    this.api = container.get("api");
    this.router = container.get("router");
    this.className = "container";
  }

  async connectedCallback() {
    const url = "https://api.myjson.com/bins/1ggk67",
      data = await this.api.get(url);
    if (data) {
      const body = this.createBody(data);
      this.appendChild(body);
    }
  }

  createNew() {
    this.router.goto("/new");
  }

  createBody(data) {
    const Tracker = customElements.get("tracker-el"),
      newTracker = dom`<div id="create-new-tracker">
                        <span>Create new Tracker</span>
                      </div>`;
    newTracker.onclick = this.createNew.bind(this);

    return dom`
      ${newTracker}
      ${data.map(item => {
        return new Tracker(item);
      })}`;
  }
}

export default Component;
