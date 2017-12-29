import html from "dom-template-strings";

class Component extends HTMLElement {
  constructor() {
    super();
    this.getData = this.getData.bind(this);
  }

  connectedCallback() {
    const body = this.createBody();
    this.appendChild(body);
  }

  getData() {
    let data = this.querySelector("#description-value");
    if (!data.innerHTML) {
      data.parentNode.classList.add("unvalid");
    }
    return data.innerHTML;
  }

  checkHashtag(event) {
    const testHash = new RegExp(/(#[^\s]*)/g);
    let descriptionValue = event.target;
    let range = document.createRange(),
      selection = window.getSelection();
    let text = event.target.textContent,
      newText = text.replace(testHash, '<span class="hashtag">$1</span>');
    descriptionValue.innerHTML = newText;
    range.selectNodeContents(descriptionValue);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);

    if (descriptionValue.parentNode.classList.contains("unvalid")) {
      descriptionValue.parentNode.classList.remove("unvalid");
    }
  }

  createBody() {
    let editor = html`<div
         class="text-input"
         placeholder="Please enter description..."
         id="description-value"
         type="text"
         contenteditable
       ></div>`,
      container = html`<section class="option" id="description">
                          <span class="label">Description</span>
                          ${editor}
                        </section>`;

    editor.oninput = this.checkHashtag;
    return container;
  }
}

export default Component;
