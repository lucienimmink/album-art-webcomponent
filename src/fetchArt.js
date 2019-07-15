import { getMetaInfo } from "./provider/metainfo";
import { populate } from "./provider/populate";
import { config as albumConfig } from "./provider/album/config";
import { config as artistConfig } from "./provider/artist/config";
import { some } from "./utils/reducers";

const fetchArtForArtist = async artist => {
  const json = await getMetaInfo({ artist });
  const {
    artist: { mbid }
  } = json;
  const id = { mbid, artist };
  const urls = await Promise.all(populate(id, artistConfig));
  return urls.reduce(some);
};
const fetchArtForAlbum = async ({ artist, album }) => {
  const id = { artist, album };
  const urls = await Promise.all(populate(id, albumConfig));
  return urls.reduce(some);
};

export { fetchArtForArtist, fetchArtForAlbum };
