import dom from "dom-template-strings";

class Component extends HTMLElement {
  constructor(data) {
    super();
    this.data = data;
  }

  connectedCallback() {
    const body = this.createBody();
    this.appendChild(body);
  }

  createBody() {
    return dom` <h4 class="tracker-item-title">${this.data.title}</h4>
                  <div class="tracker-item-tags">
                    ${this.data.tags.map((tag) => {
                      return dom`<span>${tag}</span>`
                    })}
                  </div>
                  <span class="tracker-item-total">${this.data.totalentries}</span>
                  <span class="tracker-item-lastentry">${this.data.lastentry}</span>
              `
  }
}

export default Component;
