import html from "dom-template-strings";

class Component extends HTMLElement {
  constructor() {
    super();
    this.getData = this.getData.bind(this);
  }

  connectedCallback() {
    const body = this.createBody();
    this.appendChild(body);
    this.checkHashtag();
  }

  getData() {
    return this.querySelector("#description-value").innerHTML;
  }

  checkHashtag() {
    const descriptionValue = document.getElementById("description-value"),
      testHash = new RegExp(/(#[^\s]*)/g);
    descriptionValue.oninput = event => {
      const range = document.createRange(),
        selection = window.getSelection();
      const text = event.target.textContent,
        newText = text.replace(testHash, '<span class="hashtag">$1</span>');
      descriptionValue.innerHTML = newText;
      range.selectNodeContents(descriptionValue);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    };
  }

  createBody() {
    return html`<section class="option" id="description">
                          <span class="label">Description</span>
                          <div
                           class="text-input"
                           placeholder="Please enter description..."
                           id="description-value"
                           type="text"
                           contenteditable
                         ></div>
                        </section>`;
  }
}

export default Component;
