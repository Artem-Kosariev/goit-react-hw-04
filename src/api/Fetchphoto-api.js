import axios from "axios";

const ACCESS_KEY = "Z_Up2mg88R0ZPYkYxp_-rtaj90toor0Vz0Ss24xcspk";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers = {
  Authorization: `Client-ID ${ACCESS_KEY}`,
  "Accept-Version": "v1",
};
const fetchPhotos = async (
  query,
  page,
  perPage = 9,
  orientation = "landscape"
) => {
  const response = await axios.get("/search/photos", {
    params: {
      query,
      page,
      per_page: perPage,
      orientation,
    },
  });
  return response.data;
};

export default fetchPhotos;
