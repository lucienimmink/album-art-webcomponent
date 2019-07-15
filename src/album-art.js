import { LitElement, html, css } from "lit-element";
import { Store, get, set } from "idb-keyval";
import { fetchArtForArtist, fetchArtForAlbum } from "./fetchArt";
import { defaultArt } from "./defaultart";

class AlbumArt extends LitElement {
  static get properties() {
    return {
      artist: { type: String },
      album: { type: String },
      art: { type: String },
      cache: { type: Boolean },
      customStore: { type: Object }
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
    this.customStore = new Store("album-art-db", "album-art-store");
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
      return await get(`${artist}`, this.customStore);
    }
    return await get(`${artist}-${album}`, this.customStore);
  }
  async updateArt({ artist, album }) {
    let art = "";
    if (!album) {
      art = await fetchArtForArtist(this.artist);
      if (this.cache && art) {
        set(`${artist}`, art, this.customStore);
      }
    } else {
      art = await fetchArtForAlbum({ artist, album });
      if (this.cache && art) {
        set(`${artist}-${album}`, art, this.customStore);
      }
    }
    this.art = art || defaultArt;
    this.requestUpdate();
  }
}
// Register the new element with the browser.
customElements.define("album-art", AlbumArt);
