import axios from 'axios';

// TODO: Move to a .env file
const API_KEY = 'AIzaSyCsof__3zgqWFUYwm3s0ED3jWHP8gHs06I';

export async function searchByQuery(query) {
  const params = {
    q: query,
    part: 'snippet',
    type: 'video',
    maxResults: 7,
    key: API_KEY,
  };

  return await axios.get('https://www.googleapis.com/youtube/v3/search', { params }).then(
    (res) => {
      const items = res.data.items;

      const data = items.map((item) => ({
        videoID: item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.default.url,
      }));

      return data;
    },
    (err) => {
      return [];
    }
  );
}
