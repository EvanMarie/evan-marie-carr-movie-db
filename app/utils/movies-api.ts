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
  const numMovies = 36;
  try {
    const params: any = { page };
    if (genre) params.genre = genre;
    params.limit = numMovies;
    const response = await apiClient.get(`/movies`, { params });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching movies:', error.response?.data || error.message || error);
    throw new Error('Failed to fetch movies');
  }
};

export const fetchMovieById = async (id: string) => {
  console.log('Fetching movie with ID:', id);
  try {
    const response = await apiClient.get(`/movies/${id}`);
    if (!response.data) {
      console.warn(`No data returned for movie ID: ${id}`);
      return null;
    }
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching movie:', error.response?.data || error.message || error);
    throw new Error('Failed to fetch movie');
  }
};

export const fetchGenres = async () => {
  try {
    const response = await apiClient.get('/genres/movies');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching genres:', error.response?.data || error.message || error);
    throw new Error('Failed to fetch genres');
  }
};

export const fetchMovieReviews = async (id: string) => {
  try {
    const response = await apiClient.get(`/movies/${id}/reviews`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching movie reviews:', error.response?.data || error.message || error);
    throw new Error('Failed to fetch movie reviews');
  }
};

export const fetchMovieCredits = async (id: string) => {
  try {
    const response = await apiClient.get(`/movies/${id}/credits`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching movie credits:', error.response?.data || error.message || error);
    throw new Error('Failed to fetch movie credits');
  }
};

export const fetchPersonById = async (id: string) => {
  try {
    const response = await apiClient.get(`/people/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching person:', error.response?.data || error.message || error);
    throw new Error('Failed to fetch person');
  }
};

export const fetchPersonCredits = async (id: string) => {
  try {
    const response = await apiClient.get(`/people/${id}/credits`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching person credits:', error.response?.data || error.message || error);
    throw new Error('Failed to fetch person credits');
  }
};

export const fetchPersonImages = async (id: string) => {
  try {
    const response = await apiClient.get(`/people/${id}/images`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching person images:', error.response?.data || error.message || error);
    throw new Error('Failed to fetch person images');
  }
};

