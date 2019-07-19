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
      customStore: { type: Object },
      _cache: { type: Object },
    };
  }
  static get styles() {
    return css`
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      p {
        margin: 0;
      }
    `;
  }
  constructor() {
    super();
    this.art = defaultArt;
    this._cache = {};
    this.customStore = new Store("album-art-db", "album-art-store");
  }
  render() {
    return html`
      ${this.album
        ? html`
            <img src="${this.art}" alt="${this.artist} - ${this.album}" />
            <p>${this.artist} - ${this.album}</p>
          `
        : html`
            <img src="${this.art}" alt="${this.artist}" />
            <p>${this.artist}</p>
          `}
    `;
  }
  async connectedCallback() {
    super.connectedCallback();
    if (!this.artist) {
      throw Error("You need to specify an artist");
    }
    const key = { artist: this.artist, album: this.album };
    if (this._cache[`${this.artist}-${this.album}`]) {
      this.art = this._cache[`${this.artist}-${this.album}`];
      return;
    }
    const cache = await this.getArt(key);
    this.cache = !(this.getAttribute("cache") === "false");
    if (this.cache && cache) {
      this.art = cache;
    } else {
      this.updateArt(key);
    }
  }
  updated(changedProperties) {
    changedProperties.forEach(async (oldValue, propName) => {
      if (propName === "artist") {
        if (this._cache[`${this.artist}-${this.album}`]) {
          this.art = this._cache[`${this.artist}-${this.album}`];
          return;
        } else {
          const key = { artist: this.artist, album: this.album };
          const cache = await this.getArt(key);
          if (this.cache && cache) {
            this.art = cache;
          } else {
            this.updateArt(key);
          }
        }
      }
    });
  }
  async getArt({ artist, album }) {
    if (!album) {
      return await get(`${artist}`, this.customStore);
    }
    return await get(`${artist}-${album}`, this.customStore);
  }
  async updateArt({ artist, album }) {
    let art = `https://res.cloudinary.com/jsmusicdb-com/image/fetch/`;
    if (!album) {
      art += await fetchArtForArtist(this.artist);
      if (art === `https://res.cloudinary.com/jsmusicdb-com/image/fetch/null`) art = null;
      if (art) {
        this._cache[`${artist}-${album}`] = art;
        if (this.cache) {
          set(`${artist}`, art, this.customStore);
        }
      }
    } else {
      art = await fetchArtForAlbum({ artist, album });
      if (art === `https://res.cloudinary.com/jsmusicdb-com/image/fetch/null`) art = null;
      if (art) {
        this._cache[`${artist}-${album}`] = art;
        if (this.cache) {
          set(`${artist}-${album}`, art, this.customStore);
        }
      }
    }
    this.art = art || defaultArt;
    this.requestUpdate();
  }
}
// Register the new element with the browser.
customElements.define("album-art", AlbumArt);
