import { LitElement, html, css } from "lit-element";
import { get, set } from "idb-keyval";
import { fetchArtForArtist, fetchArtForAlbum } from "./fetchArt";
import { defaultArt } from "./defaultart";

class AlbumArt extends LitElement {
  static get properties() {
    return {
      artist: { type: String },
      album: { type: String },
      art: { type: String },
      cache: { type: Boolean },
    };
  }
  static get styles() {
    return css`
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `;
  }
  constructor() {
    super();
    this.art = defaultArt;
  }
  render() {
    return html`
      ${this.album
        ? html`
            <img src="${this.art}" alt="${this.artist} - ${this.album}" />
          `
        : html`
            <img src="${this.art}" alt="${this.artist}" />
          `}
    `;
  }
  async connectedCallback() {
    super.connectedCallback();
    if (!this.artist) {
      throw Error("You need to specify an artist");
    }
    const key = { artist: this.artist, album: this.album };
    const cache = await this.getArt(key);
    this.cache = !(this.getAttribute("cache") === "false");
    if (this.cache && cache) {
      this.art = cache;
    } else {
      this.updateArt(key);
    }
  }
  async getArt({ artist, album }) {
    if (!album) {
      return await get(`art-${artist}`);
    }
    return await get(`art-${artist}-${album}`);
  }
  async updateArt({ artist, album }) {
    let art = "";
    if (!album) {
      art = await fetchArtForArtist(this.artist);
      if (this.cache && art) {
        set(`art-${artist}`, art);
      }
    } else {
      art = await fetchArtForAlbum({ artist, album });
      if (this.cache && art) {
        set(`art-${artist}-${album}`, art);
      }
    }
    this.art = art || defaultArt;
    this.requestUpdate();
  }
}
// Register the new element with the browser.
customElements.define("album-art", AlbumArt);
