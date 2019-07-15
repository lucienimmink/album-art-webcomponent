import { getMetaInfo } from "./../metainfo";

const fetchArt = async ({ artist, album }) => {
  const json = await getMetaInfo({ artist, album });
  const {
    album: { image }
  } = json;
  return image[image.length - 1]["#text"];
};

export { fetchArt };
