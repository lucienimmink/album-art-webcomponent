import { LitElement, html, css } from "lit-element";

class VirtualScroll extends LitElement {
  static get properties() {
    return {
      list: { type: Array, reflect: true },
      height: { type: Number, reflect: true },
      lastPaintY: { type: Number, reflect: true },
      screenItemsLength: { type: Number, reflect: true },
      maxBuffer: { type: Number, reflect: true },
      cachedItemLength: { type: Number, reflect: true },
      pre: { type: Number, reflect: true },
      post: { type: Number, reflect: true },
    };
  }
  static get styles() {
    return css`
      album-art {
        width: 200px;
        height: 200px;
        margin: 20px 20px 0;
        display: block;
      }
    `;
  }
  constructor() {
    super();
    this.itemHeight = 220;
    this.height = this.itemHeight * 2; // 440
    this.screenItemsLength = Math.ceil(this.height / this.itemHeight); // 2
    this.maxBuffer = this.screenItemsLength * this.itemHeight; // 440
    this.cachedItemLength = this.screenItemsLength * 3; // keep a cache // 6
  }
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "list") {
        this.renderChunk(0);
      }
    });
  }
  render() {
    return html`
      <div @scroll="${this.handleScroll}" style="height: ${this.height}px; overflow: auto;">
        <div style="height: ${this.pre}px;"></div>
        ${this.chunk}
        <div style="height: ${this.post}px;"></div>
      </div>
    `;
  }
  handleScroll(e) {
    const scrollTop = e.target.scrollTop; // Triggers reflow
    //if (!this.lastPaintY || Math.abs(scrollTop - this.lastPaintY) > this.maxBuffer) {
    // recalc
    // const first = parseInt(scrollTop / this.itemHeight) - this.screenItemsLength;
    // console.log(parseInt(scrollTop / this.itemHeight), this.screenItemsLength);
    const first = parseInt(scrollTop / this.itemHeight);
    this.renderChunk(first < 0 ? 0 : first);
    //  this.lastPaintY = scrollTop;
    //}
  }
  renderChunk(first) {
    let last = first + this.cachedItemLength;
    if (last > this.list.length) {
      last = this.list.length;
    }
    console.log(`render chunck starting with ${first} and ending with ${last}`);
    const list = this.list.slice(); // copy
    const chunk = list.splice(first, last - first);
    this.pre = first * this.itemHeight;
    this.post = (this.list.length - 1 - last) * this.itemHeight;
    // this.requestUpdate();

    this.chunk = html`
      ${chunk.map(
        artist =>
          html`
            <album-art artist="${artist}"></album-art>
          `
      )}
    `;
    //this.requestUpdate();
  }
}

customElements.define("virtual-scroll", VirtualScroll);
