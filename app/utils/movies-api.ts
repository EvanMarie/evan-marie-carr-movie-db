import axios from 'axios';

const BASE_URL = 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvcGVuSnd0MyIsIm5hbWUiOiJPcGVuSldUWzNdIn0.J43mgsvQlOK0zn7APkizIRkKphNIeXwtcabyKxoUnZo`,  
  },
});

export default apiClient;

export const fetchMovies = async (page = 1, genre?: string) => {
  try {
    const params: any = { page };
    if (genre) params.genre = genre;
    const response = await apiClient.get('/movies', { params });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching movies:', error.response?.data || error.message || error);
    throw new Error('Failed to fetch movies');
  }
};

export const fetchMovieById = async (id: string) => {
  try {
    const response = await apiClient.get(`/movies/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching movie:', error.response?.data || error.message || error);
    throw new Error('Failed to fetch movie');
  }
};

