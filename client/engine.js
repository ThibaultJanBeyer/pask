import route from 'roadtrip'

class Engine {
  constructor() {
    this.container = new Map();
    this.router = route;
  }

  render(name) {
    const Element = customElements.get(name),
      component = new Element(this.container);

    if (this.activeComponent) {
      document.body.removeChild(this.activeComponent);
      document.body.appendChild(component);
      this.activeComponent = component;
    } else {
      document.body.appendChild(component);
      this.activeComponent = component;
    }
  }

  register(items) {
    this.registerUtils(items["utils"]);
    this.registerComponents(items["components"]);
  }

  registerUtils(utils) {
    for (const key in utils) {
      this.container.set(key, utils[key]);
    }
    this.container.set("router", this.router);
  }

  registerComponents(components) {
    for (const key in components) {
      const name = `${key}-el`;
      customElements.define(name, components[key]);
    }
  }
}

export default new Engine();
