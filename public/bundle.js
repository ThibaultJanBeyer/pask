(function () {
'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var superdom_min = createCommonjsModule(function (module) {
/* Superdom.js v1.3.0 by Francisco Presencia - MIT - https://github.com/franciscop/superdom.js */
let dom=(function nodeSelector(){let DOM=(...sel)=>DOM.api.array(DOM.api.selectors(sel.length <=1 ? sel[0]:sel));const derivated=(selector,orig)=>{return new Proxy(sel=>DOM(selector(sel)),{get:(orig,name)=>{return selector(name)},set:(orig,name,value)=>{DOM[selector(name)]=value;return true},deleteProperty:(orig,name)=>{delete DOM[selector(name)];return true}})};let getter=(orig,key)=>{if(key in orig)return orig[key];if(key in orig.api.selectors){return derivated(orig.api.selectors[key],orig)}return orig.api.array(orig.api.selectors(key))};let setter=(orig,key,value)=>{let cb=DOM.api.fn(value,true);DOM[key].each(node=>node.parentNode.replaceChild(cb(node)[0],node));};let deletter=(base,key)=>{DOM[key].forEach(n=>n.remove());return true};DOM.api={};DOM=new Proxy(DOM,{get:getter,set:setter,deleteProperty:deletter});return DOM})();dom=(function Attributes(DOM){DOM.api.fn=(value,parse=false)=>{let cb=node=>parse ? DOM(value):value;if(value instanceof Function)cb=value;return cb};DOM.api.proxify=(proxify,nodes,key)=>{proxify._={ref:nodes,attr:key};return DOM.api.values(proxify)};DOM.api.array=nodes=>{let getter=(orig,key)=>{if(key in orig){return orig[key]}if(key in DOM.api.nodes){let nodeCb=DOM.api.nodes[key];if(nodeCb.get)nodeCb=nodeCb.get;let newNodes=nodes.map((nodes,i,all)=>nodeCb(nodes,i,all));return DOM.api.proxify(newNodes,nodes,key)}if(key in DOM.api.navigate){let cb=DOM.api.navigate[key];let newNodes=nodes.map(cb).reduce((all,one)=>{return all.concat(one)},[]).filter(n=>n);return DOM.api.array(newNodes)}let newNodes=nodes.map(node=>node.getAttribute(key)|| '');return DOM.api.proxify(newNodes,nodes,key)};let setter=(orig,key,value)=>{let cb=DOM.api.fn(value);let nodeCb=DOM.api.nodes[key];if(nodeCb){if(nodeCb.set)nodeCb=nodeCb.set;orig.map((node,i,all)=>nodeCb(cb,node,i,all));return true}if(value instanceof Function){cb=(node,i,orig)=>value(node.getAttribute(key)|| '',i,orig);}else{cb=node=>value;}orig.forEach((node,i,orig)=>node.setAttribute(key,cb(node,i,orig)|| ''));};let deletter=(orig,key)=>{let cb=el=>el.removeAttribute(key);if(DOM.api.nodes[key] && DOM.api.nodes[key].del){cb=DOM.api.nodes[key].del;}orig.forEach(cb);return true};return new Proxy(nodes,{get:getter,set:setter,deleteProperty:deletter})};return DOM})(dom);dom=(function Values(DOM){let specialAttrs={_flat:lists=>[...new Set([].concat.apply([],lists))],_text:lists=>[...new Set([].concat.apply([],lists))].join(' ')};DOM.api.values=attributes=>{let getter=(orig,key)=>{if(key in orig || typeof orig[key] !=='undefined'){return orig[key]}let nodes=orig._.ref;let cb=DOM.api.attributes[orig._.attr];if(cb && cb.get){cb=cb.get;orig.map((attr,i,all)=>cb(attr,key,nodes[i],i,all));}if(key in specialAttrs){return specialAttrs[key](orig)}return specialAttrs._flat(orig).includes(key)};let setter=(orig,key,value)=>{let nodes=orig._.ref;let attrCb=DOM.api.attributes[orig._.attr];if(attrCb){if(attrCb.set)attrCb=attrCb.set;orig.map((attr,i,all)=>attrCb(DOM.api.fn(value),key,nodes[i],i,all));}return true};let deletter=(orig,key)=>{let nodes=orig._.ref;let attrCb=DOM.api.attributes[orig._.attr].del;if(attrCb){orig.map((attr,i,all)=>attrCb(key,nodes[i],i,all));}return true};return new Proxy(attributes,{get:getter,set:setter,deleteProperty:deletter})};return DOM})(dom);if(typeof module !=='undefined'){module.exports=dom;}dom.api.attributes={};dom.api.attributes.class={set:(cb,key,node,i,all)=>{let val=cb(node.classList.contains(key),i,all);node.classList[val ? 'add':'remove'](key);},del:(key,node)=>{node.classList.remove(key);}};dom.api.attributes.on=(cb,key,node)=>{dom.api.helpers.args(key).forEach(event=>node.addEventListener(event,cb));};dom.api.attributes.handle=(cb,key,node)=>{dom.api.helpers.args(key).forEach(event=>node.addEventListener(event,(...args)=>{args[0].preventDefault();cb(...args);}));};dom.api.attributes.trigger={get:(prevVal,key,node)=>{dom.api.helpers.args(key).forEach(event=>{let ev=new CustomEvent(event,{bubbles:true,cancelable:true});node.dispatchEvent(ev);});}};dom.api.helpers={};dom.api.helpers.args=val=>val.split(/[\s,]+/);dom.api.navigate={};dom.api.navigate.parent=node=>node.parentNode || false;dom.api.navigate.children=node=>node.children;dom.api.nodes={};dom.api.nodes.each=(cb,node,i,all)=>cb(node,i,all);dom.api.nodes.html={get:node=>node.innerHTML,set:(cb,node,i,all)=>node.innerHTML=cb(node.innerHTML,i,all)|| '',del:node=>node.innerHTML=''};dom.api.nodes.text={get:node=>node.textContent,set:(cb,node,i,all)=>node.textContent=cb(node.textContent,i,all)|| '',del:node=>node.textContent=''};dom.api.nodes.class={get:node=>Array.from(node.classList),set:(cb,node,i,all)=>{let val=cb(Array.from(node.classList),i,all);val=typeof val==='string' ? dom.api.helpers.args(val):val;val.forEach(one=>node.classList.add(one));}};dom.api.selectors=(sel=[])=>typeof sel==='string' ? /^\s*</.test(sel)? dom.api.selectors.generate(sel):[...(document.querySelectorAll(sel))]:sel instanceof Element ? [sel]:[...sel].map(el=>dom(el)).reduce((all,one)=>all.concat(one),[]);dom.api.selectors.generate=html=>{let type=/^\s*<t(h|r|d)/.test(html)? 'table':'div';let cont=document.createElement(type);cont.innerHTML=html.replace(/^\s*/,'').replace(/\s*$/,'');return [...cont.childNodes]};dom.api.selectors.id=name=>dom[`#${name}`];dom.api.selectors.class=name=>dom[`.${name}`];dom.api.selectors.attr=name=>dom[`[${name}]`];
});

class Component extends HTMLElement {
  constructor(container) {
    super();
    this.container = container;
    this.events = this.container.get("events");
  }

  connectedCallback() {
    this.createBody();
    this.events.on("test", this.addElement);
  }
  
  addElement() {
    const main = superdom_min.id.items,
          data = superdom_min`<p>new item</p>`;
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

class Component$2 extends HTMLElement {
  constructor(container) {
    super();
    this.container = container;
    this.events = container.get("events");
  }

  connectedCallback() {
    this.createBody();
  }

  createBody() {
    const containerElement = `<fieldset id="tracker-comments">
                                <legend>Comments</legend>
                              </fieldset>`;

    this.innerHTML = containerElement;
  }
}

class Component$4 extends HTMLElement {
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
    const button = superdom_min(`<button>Button</button>`);
          button.on.click = this.sendMessage;
    const containerElement = superdom_min(`<fieldset id="tracker-actions">
                                <legend>Trackers</legend>
                              </fieldset>`);
        this.appendChild(containerElement);
  }
}

class Component$6 extends HTMLElement {
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

// export {default as actions} from "./actions";


var baseComponents = Object.freeze({
	body: Component,
	comments: Component$2,
	trackers: Component$4,
	options: Component$6
});

class Component$8 extends HTMLElement {
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



var minorComponents = Object.freeze({
	actions: Component$8
});

class API {
  constructor() {
    this.url = "http://localhost:8080/api/";
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    this.post = this.post.bind(this);
    this.get = this.get.bind(this);
  }

  async get(url) {
    const method = "GET",
      response = await fetch(this.url + url, {
        method: method,
        headers: this.headers
      }).catch(err => console.log(err));
    return await response.json();
  }

  async post(url, data) {
    const method = "POST";
    response = await fetch(this.url + url, {
      method: method,
      headers: this.headers,
      body: data
    }).catch(err => console.log(err));
    return await response.json();
  }
}

var api = new API();

class EventEmmitter {
  constructor() {
    this.events = {};
  }

  on(name, fnc) {
    if (!this.events[name]) {
      this.events[name] = new Array();
    } else {
      this.events[name].push(fnc);
    }
  }

  emit(name, data) {
    if (this.events[name]) {
      this.events[name].forEach(callFunc => {
        callFunc.bind(this, data);
      });
    } else {
      console.log(`Emmiter ${name} not found`);
    }
  }
}

var eventEmiter = new EventEmmitter();



var utils = Object.freeze({
	api: api,
	events: eventEmiter
});

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

var Engine$1 = new Engine();

const components = {
  utils,
  baseComponents,
  minorComponents
};


Engine$1.registerComponents(components);

}());
