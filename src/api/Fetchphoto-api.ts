import axios from "axios";
import {Photo, ApiResponse } from '../types'

const ACCESS_KEY = "Z_Up2mg88R0ZPYkYxp_-rtaj90toor0Vz0Ss24xcspk";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers = {
  Authorization: `Client-ID ${ACCESS_KEY}`,
  "Accept-Version": "v1",
};



const fetchPhotos = async (
  query: string,
  page: number,
  perPage: number = 9,
  orientation: "landscape" | "portrait" | "squarish" = "landscape"
): Promise<ApiResponse> => {
  try {
 
    const response = await axios.get("/search/photos", {
      params: {
        query,
        page,
        per_page: perPage,
        orientation,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};

export default fetchPhotos;
