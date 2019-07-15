import { getMetaInfo } from "./metainfo";
import { fetchArt as fanart } from "./provider/artist/fanart";
import { fetchArt as audiodb } from "./provider/artist/audiodb";
import { fetchArt as lastfm } from "./provider/album/lastfm";

const fetchArtForArtist = async artist => {
  const json = await getMetaInfo({ artist });
  const {
    artist: { mbid }
  } = json;

  const urls = await Promise.all([
    fanart(mbid).catch(error => {
      return null;
    }),
    audiodb(artist).catch(error => {
      return null;
    })
  ]);
  return urls.reduce(
    (accumulator, currentValue) => accumulator || currentValue
  );
};
const fetchArtForAlbum = async ({ artist, album }) => {
  return await lastfm({ artist, album });
};

export { fetchArtForArtist, fetchArtForAlbum };
