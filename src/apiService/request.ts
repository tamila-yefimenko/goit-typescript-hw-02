import axios from 'axios';
import { GetPhotosResponse } from '../../src/components/App/App.types';

const ACCESS_KEY = '401q7YIUpv3zQTK-2Y1DgxjTDjRv66fq8cdK8Zu_7vg';

axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.headers.common['Authorization'] = `Client-ID ${ACCESS_KEY}`;
axios.defaults.params = {
  per_page: 12,
  orientation: 'landscape',
};

export const getPhotos = async (
  query: string,
  page: number
): Promise<GetPhotosResponse> => {
  const { data } = await axios.get(`search/photos`, {
    params: { query, page },
  });
  return data;
};
