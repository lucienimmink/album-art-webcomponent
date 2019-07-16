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
      total: { type: Number, reflect: true }
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
    this.cachedItemLength = this.screenItemsLength * 4; // keep a cache // 6
  }
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "list") {
        this.total = this.list.length * this.itemHeight;
        this.renderChunk(0);
      }
    });
  }
  render() {
    return html`
      <div
        @scroll="${this.handleScroll}"
        style="height: ${this
          .height}px; overflow: auto; position: relative; padding: 0;"
      >
        ${this.chunk}
        <div
          style="opacity: 0; position: absolute; top 0; left: 0; width: 1px; height: ${this
            .total}px "
        ></div>
      </div>
    `;
  }
  handleScroll(e) {
    const scrollTop = e.target.scrollTop; // Triggers reflow
    if (
      !this.lastPaintY ||
      Math.abs(scrollTop - this.lastPaintY) > this.maxBuffer
    ) {
      // recalc
      const first =
        parseInt(scrollTop / this.itemHeight) - this.screenItemsLength;
      this.renderChunk(first < 0 ? 0 : first);
      this.lastPaintY = scrollTop;
    }
  }
  renderChunk(first) {
    let last = first + this.cachedItemLength;
    if (last > this.list.length) {
      last = this.list.length;
    }
    const list = this.list.slice(); // copy
    const chunk = list.splice(first, last - first);

    this.chunk = html`
      ${chunk.map(
        (artist, index) =>
          html`
            <album-art
              artist="${artist}"
              style="position: absolute; top: ${(first + index) *
                this.itemHeight}px"
            ></album-art>
          `
      )}
    `;
    this.requestUpdate();
  }
}

customElements.define("virtual-scroll", VirtualScroll);
