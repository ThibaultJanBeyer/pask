import html from "dom-template-strings";

class Component extends HTMLElement {
  constructor(container) {
    super();
    this.container = container;
    this.events = container.get("events");
    this.api = container.get("api");
    this.className = "container";
    this.saveData = this.saveData.bind(this);
    this.addSlider = this.addSlider.bind(this);
    this.trackers = [];
  }

  connectedCallback() {
    const body = this.createBody();

    body.forEach(child => {
      this.appendChild(child);
    });
  }

  addSlider(slider) {
    let Slider = customElements.get("slider-el"),
      container = document.getElementById("slider-container"),
      sliderElement = new Slider();

    this.trackers.push(sliderElement);
    container.appendChild(sliderElement);
  }

  saveData() {
    let trackerData = this.trackers.map(tracker => {
        return tracker.getData();
      }),
      optionsData = this.options.getData(),
      valid = true;

    trackerData.forEach(item => {
      if (!item.name) {
        valid = false;
      }
    });

    if (!valid) {
      this.events.emit("info", {
        msg: "Please fill required information!",
        type: "error"
      });
    } else {
      this.api.saveTracker({trackerData, optionsData});
    }
  }

  disconnectedCallback() {
    this.calender.destroy();
  }

  createBody() {
    let Comments = customElements.get("comments-el"),
      Options = customElements.get("options-el");
    this.comments = new Comments();
    this.options = new Options();

    let actions = html`<div id="actions">
                                <span>Create new tracker</span>
                                <span>Save</span>
                            </div>`;

    let slidersContainer = html`<section id="slider-container"></section>`;

    actions.children[0].onclick = this.addSlider;
    actions.children[1].onclick = this.saveData;

    return [this.options, actions, slidersContainer, this.comments];
  }
}

export default Component;
