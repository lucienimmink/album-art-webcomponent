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
    };
  }
  static get styles() {
    return css`
      div {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center center;
      }
    `;
  }
  constructor() {
    super();
    this.art = defaultArt;
  }
  render() {
    return html`
      <style>
        div {
          background-image: url(${this.art});
        }
      </style>
      <div></div>
    `;
  }
  async connectedCallback() {
    super.connectedCallback();
    if (!this.artist) {
      throw Error("You need to specify an artist");
    }
    const key = { artist: this.artist, album: this.album };
    const cache = await this.getArt(key);
    if (cache) {
      console.log("cached lookup", cache);
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
    if (!album) {
      const art = await fetchArtForArtist(this.artist);
      if (art) {
        set(`art-${artist}`, art);
      }
      this.art = art || defaultArt;
    } else {
      const art = await fetchArtForAlbum({ artist, album });
      if (art) {
        set(`art-${artist}-${album}`, art);
      }
      this.art = art || defaultArt;
    }
    this.requestUpdate();
  }
}
// Register the new element with the browser.
customElements.define("album-art", AlbumArt);
