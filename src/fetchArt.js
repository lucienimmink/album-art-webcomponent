import { getMetaInfo } from "./metainfo";

const FANARTAPIKEY = "639fca5adcf955a19f9a04f8985e9ded";

const fetchArtForArtist = async artist => {
  console.log(`fetch art for artist ${artist}`);
  const json = await getMetaInfo({ artist });
  const {
    artist: { mbid },
  } = json;
  let url = await getArtFromFanArt(mbid);
  if (url) {
    return url;
  }
  url = await getArtFromAudioDB(artist);
  if (url) {
    return url;
  }
};
const fetchArtForAlbum = async ({ artist, album }) => {
  console.log(`fetch art for album ${artist}-${album}`);
  const json = await getMetaInfo({ artist, album });
  const {
    album: { image },
  } = json;
  return image[image.length - 1]["#text"];
};
const getArtFromFanArt = async mbid => {
  const response = await fetch(`https://webservice.fanart.tv/v3/music/${mbid}&?api_key=${FANARTAPIKEY}&format=json`);
  if (response.status === 200) {
    const json = await response.json();
    const { artistbackground } = json;
    if (artistbackground) {
      return artistbackground[0].url;
    }
  }
  return null;
};
const getArtFromAudioDB = async artist => {
  const response = await fetch(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${encodeURIComponent(artist)}`);
  if (response.status === 200) {
    const json = await response.json();
    const { artists } = json;
    if (artists) {
      return artists[0].strArtistFanart;
    }
  }
  return null;
};

export { fetchArtForArtist, fetchArtForAlbum };
