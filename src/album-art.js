import { LitElement, html, css } from "lit-element";
import { Store, get, set } from "idb-keyval";
import { fetchArtForArtist, fetchArtForAlbum } from "./fetchArt";
import { defaultAlbum, defaultArtist, defaultPixel } from "./defaultart";

class AlbumArt extends LitElement {
  static get properties() {
    return {
      artist: { type: String },
      album: { type: String },
      art: { type: String },
      cache: { type: Boolean },
      customStore: { type: Object },
      _cache: { type: Object },
      objectFit: { type: String }
    };
  }
  static get styles() {
    return css`
      img {
        width: 100%;
        height: 100%;
      }
      p {
        margin: 0;
      }
    `;
  }
  constructor() {
    super();
    this.art = defaultPixel;
    this._cache = {};
    this.customStore = new Store("album-art-db", "album-art-store");
    this.objectFit = "cover";
  }
  render() {
    return html`
      ${this.album
        ? html`
            <img
              src="${this.art}"
              alt="${this.artist} - ${this.album}"
              style="object-fit: ${this.objectFit}"
              loading="lazy"
            />
          `
        : html`
            <img
              src="${this.art}"
              alt="${this.artist}"
              style="object-fit: ${this.objectFit}"
              loading="lazy"
            />
          `}
    `;
  }
  async connectedCallback() {
    super.connectedCallback();
    if (!this.artist) {
      return;
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
  dispatch() {
    const evt = new CustomEvent("art", {
      detail: { art: this.art },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(evt);
  }
  updated(changedProperties) {
    changedProperties.forEach(async (oldValue, propName) => {
      console.log({propName});
      this.cache = !(this.getAttribute("cache") === "false");
      if (propName === "artist" || propName === 'album') {
        if (this._cache[`${this.artist}-${this.album}`]) {
          this.art = this._cache[`${this.artist}-${this.album}`];
          this.dispatch();
          return;
        } else {
          const key = { artist: this.artist, album: this.album };
          const cache = await this.getArt(key);
          if (this.cache && cache) {
            this.art = cache;
            this.dispatch();
          } else {
            this.updateArt(key);
          }
        }
      }
    });
  }
  isEmptyArt(art) {
    const base = `https://res.cloudinary.com/jsmusicdb-com/image/fetch/`;
    if (art === base || art === `${base}null`) {
      return true;
    }
    return false;
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
      try {
        art += await fetchArtForArtist(this.artist);
        if (this.isEmptyArt(art)) art = null;
      } catch (e) {
        art = null;
      }
      if (art) {
        this._cache[`${artist}-${album}`] = art;
        if (this.cache) {
          set(`${artist}`, art, this.customStore);
        }
      }
      this.art = art || defaultArtist;
    } else {
      try {
        art += await fetchArtForAlbum({ artist, album });
        if (this.isEmptyArt(art)) art = null;
      } catch (e) {
        art = null;
      }
      if (art) {
        this._cache[`${artist}-${album}`] = art;
        if (this.cache) {
          set(`${artist}-${album}`, art, this.customStore);
        }
      }
      this.art = art || defaultAlbum;
    }
    this.dispatch();
    this.requestUpdate();
  }
}
// Register the new element with the browser.
customElements.define("album-art", AlbumArt);
