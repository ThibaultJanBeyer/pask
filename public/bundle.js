(function () {
'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var domTemplateStrings = createCommonjsModule(function (module) {
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = domify;
  } else {
    Node.prototype.dom = domify;
    Document.prototype.dom = domify;
  }

  /**
   * Just generates some kind-of-random ID. It just needs to be distinguishable from regular IDs
   * @return {string}  The generated ID
   */
  var counter = 0;
  function generateId() {
    counter++;
    return 'p-' + counter + '-' + Date.now();
  }

  /**
   * Generates an array of DOM Nodes
   * @param  {...any} partials   Might be anything. DOM Nodes are handled, arrays are iterated over and then handled, everything else just gets passed through
   * @return {Node[]}            An array of DOM Nodes
   */
  function generateNodes(doc) {
    // Array of placeholder IDs
    var placeholders = [];
    // Generate regular HTML string first
    function reducer(carry, partial) {
      if (partial && partial.nodeType == Node.DOCUMENT_FRAGMENT_NODE) {
        partial = partial.childNodes;
      }
      if (Array.isArray(partial)) {
        carry.concat(partial);
      } else if ((typeof partial === 'undefined' ? 'undefined' : _typeof(partial)) === 'object' && partial instanceof Node) {
        var id = generateId();
        placeholders.push({ id: id, node: partial });
        return carry.concat('<' + partial.nodeName + ' id="' + id + '"></' + partial.nodeName + '>');
      } else if (partial && typeof partial.item == "function" && typeof partial.length == "number") {
        return carry.concat(Array.prototype.reduce.call(partial, reducer, []));
      } else {
        return carry.concat(partial);
      }
    }

    for (var _len = arguments.length, partials = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      partials[_key - 1] = arguments[_key];
    }

    var html = partials.reduce(reducer, []).join('').replace(/^\s*</, "<").replace(/>\s*$/, ">");

    // Wrap in temporary container node
    var template = doc.createElement('template');
    template.innerHTML = html;
    var container = template.content;

    // Replace placeholders with real Nodes
    placeholders.forEach(function (_ref) {
      var id = _ref.id,
          node = _ref.node;

      var placeholder = container.querySelector(node.nodeName + '#' + id);
      placeholder.parentNode.replaceChild(node, placeholder);
    });

    var shouldBeFragment = false;
    for (var i = 0; i < partials.length; i++) {
      if (partials[i] == "") {
        continue;
      } else if (partials[i] instanceof Node) {
        shouldBeFragment = true;
        break;
      } else {
        break;
      }
    }

    if (container.childNodes.length == 1 && !shouldBeFragment) {
      var child = container.firstChild;
      container.removeChild(child);
      return child;
    } else {
      return container;
    }
    return container;
  }

  /**
   * A function that is suitable to be used as a function for tagged template strings
   * @param  {string[]}    strings  The literal parts of the template string
   * @param  {...values}   values   The interpolated parts of the template string
   * @return {Node[]}               An array of DOM Nodes
   */
  function taggedTemplateHandler(doc, strings) {
    for (var _len2 = arguments.length, values = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      values[_key2 - 2] = arguments[_key2];
    }

    // Create an array that puts the values back in their place
    var arr = strings.reduce(function (carry, current, index) {
      return carry.concat(current, index + 1 === strings.length ? [] : values[index]);
    }, []);

    return generateNodes.apply(undefined, [doc].concat(_toConsumableArray(arr)));
  }

  function domify(strings) {
    var doc = document;
    if (this) {
      if (this.nodeType == Node.DOCUMENT_NODE) doc = this;else if (this.ownerDocument) doc = this.ownerDocument;
    }

    for (var _len3 = arguments.length, values = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      values[_key3 - 1] = arguments[_key3];
    }

    return taggedTemplateHandler.apply(undefined, [doc, strings].concat(values));
  }
})();
});

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
    return domTemplateStrings`${data.map(item => {
                    return new Tracker(item);
                  })}
            `;
  }
}

// export {default as actions} from "./actions";

// export {default as comments} from "./comments";
// export {default as trackers} from "./trackers";
// export {default as options} from "./options";


var baseComponents = Object.freeze({
	body: Component
});

class Component$2 extends HTMLElement {
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

class Component$4 extends HTMLElement {
  constructor(data) {
    super();
    this.data = data;
  }

  connectedCallback() {
    const body = this.createBody();
    console.log(this.data);
    this.appendChild(body);
  }

  createBody() {
    return domTemplateStrings` <h4 class="tracker-item-title">${this.data.title}</h4>
                  <div class="tracker-item-tags">
                    ${this.data.tags.map((tag) => {
                      return domTemplateStrings`<span>${tag}</span>`
                    })}
                  </div>
                  <span class="tracker-item-total">${this.data.totalentries}</span>
                  <span class="tracker-item-lastentry">${this.data.lastentry}</span>
              `
  }
}



var minorComponents = Object.freeze({
	actions: Component$2,
	tracker: Component$4
});

class API {
  constructor() {
    this.url = "http://localhost:8080/api/";
    this.settings = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      mode: "cors",
      cache: "default"
    };
    this.post = this.post.bind(this);
    this.get = this.get.bind(this);
  }

  async get(url) {
    const method = "GET",
      settings = this.settings;
    settings.method = method;
    const response = await fetch(url, settings).catch(err => console.log(err));
    return await response.json();
  }

  async post(url, data) {
    const method = "POST",
      settings = this.settings;
    settings.method = method;
    const response = await fetch(url, this.settings).catch(err =>
      console.log(err)
    );
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
      this.events[name].push(fnc);
    } else {
      this.events[name].push(fnc);
    }
  }

  destroy(name) {
    if (this.events[name]) {
      delete this.events[name];
    }
  }

  emit(name, data) {
    if (this.events[name]) {
      this.events[name].forEach(callFunc => {
        callFunc.apply(this, data);
      });
    } else {
      console.log(`Emit reciever for ${name} not found!`);
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
    for (const key in utils) {
      this.container.set(key, utils[key]);
    }
  }

  registerBaseComponents(components) {
    for (const key in components) {
      const name = `${key}-el`;
      customElements.define(name, components[key]);
      const Element = customElements.get(name);
      document.body.appendChild(new Element(this.container));
    }
  }

  registerMinorComponents(components) {
    for (const key in components) {
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
