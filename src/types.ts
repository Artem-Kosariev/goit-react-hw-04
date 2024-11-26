interface Photo {
  id: string;
  alt_description: string;
  urls: {
    small: string,
    full: string,
    regular: string,
  };
  user: {
    name: string,
    profile_image: {
      small: string,
    },
  };
}

interface ApiResponse {
  total: number;
  total_pages: number;
  results: Photo[];
}

interface Image {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

interface FormValues {
  query: string;
}

interface AppState {
  page: number;
  queryValue: string;
  gallery: Image[];
  isLoading: boolean;
  isError: boolean;
  totalPages: number;
  noResults: boolean;
  modalOpen: boolean;
  modalImage: string;
  alt: string;
}