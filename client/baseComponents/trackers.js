import dom from "superdom";

class Component extends HTMLElement {
  constructor(container) {
    super();
    this.container = container;
    this.events = container.get("events");
    this.sendMessage = this.sendMessage.bind(this);
  }

  connectedCallback() {
    this.createBody();
  }
  
  sendMessage(){
    this.events.emit("test");
  }

  createBody() {
    const button = dom(`<button>Button</button>`);
          button.on.click = this.sendMessage;
    const containerElement = dom(`<fieldset id="tracker-actions">
                                <legend>Trackers</legend>
                              </fieldset>`);
    this.innerHTML = 
  }
}

export default Component;