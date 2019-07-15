import { getMetaInfo } from "./metainfo";
import { fetchArt as fanart } from "./provider/artist/fanart";
import { fetchArt as audiodb } from "./provider/artist/audiodb";

const fetchArtForArtist = async artist => {
  const json = await getMetaInfo({ artist });
  const {
    artist: { mbid },
  } = json;

  const urls = await Promise.all([
    fanart(mbid).catch(error => {
      return null;
    }),
    audiodb(artist).catch(error => {
      return null;
    }),
  ]);
  return urls.reduce((accumulator, currentValue) => accumulator || currentValue);
};
const fetchArtForAlbum = async ({ artist, album }) => {
  const json = await getMetaInfo({ artist, album });
  const {
    album: { image },
  } = json;
  return image[image.length - 1]["#text"];
};

export { fetchArtForArtist, fetchArtForAlbum };
