const fetchArt = async artist => {
  const response = await fetch(
    `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${encodeURIComponent(
      artist
    )}`
  );
  if (response.status === 200) {
    const json = await response.json();
    const { artists } = json;
    if (artists) {
      return artists[0].strArtistFanart || artists[0].strArtistThumb;
    }
  }
  throw Error("no art found in provider audiodb");
};

export { fetchArt };
