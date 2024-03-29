const FANARTAPIKEY = process.env.FANART_APIKEY!;

const fetchArt = async (mbid: string) => {
  if (!mbid) {
    throw Error('Cannot search without a proper mbid');
  }
  const response = await fetch(
    `https://webservice.fanart.tv/v3/music/${mbid}&?api_key=${FANARTAPIKEY}&format=json`
  );
  if (response.status === 200) {
    const json = await response.json();
    const { artistthumb } = json;
    if (artistthumb) {
      return artistthumb[0].url;
    }
  }
  throw Error('no art found in provider fanart');
};

export { fetchArt };
