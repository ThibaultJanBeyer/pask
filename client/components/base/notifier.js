import html from "dom-template-strings";

class Component extends HTMLElement {
  constructor(container) {
    super();
    this.events = container.get("events");
    this.api = container.get("api");
  }

  connectedCallback() {
    this.events.on("info", this.displayInfo.bind(this));
  }

  displayInfo(data) {
    let typeClass = data.type == "info" ? "info" : "error",
      info = html`<div class='info-item ${typeClass}'>
                      <span>${data.msg}</span>
                    </div>`;

    this.appendChild(info);

    setTimeout(() => {
      this.removeChild(info);
    }, 6000);
  }
}

export default Component;
