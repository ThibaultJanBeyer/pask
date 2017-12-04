class Engine {
  constructor() {
    this.container = new Map();
  }
  
  registerComponents(components) {
    this.registerUtils(components["utils"]);
    this.registerBaseComponents(components["baseComponents"]);
    this.registerMinorComponents(components["minorComponents"]);
  }
  
  registerUtils(utils) {
    for ( const key in utils) {
        this.container.set(key, utils[key]);
    }
  }
  
  registerBaseComponents(components) {
    
    for ( const key in components) {
        const name = `${key}-el`;
        customElements.define(name, components[key]);
        const Element = customElements.get(name);
        document.body.appendChild(new Element(this.container));      
    }
  }
  
  registerMinorComponents(components) {
    for ( const key in components) {
        const name = `${key}-el`;
        customElements.define(name, components[key]);   
    }
  }
}

export default new Engine();