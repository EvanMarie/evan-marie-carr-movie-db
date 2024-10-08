export const BASE_URL = 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com';

const headers =  {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvcGVuSnd0MyIsIm5hbWUiOiJPcGVuSldUWzNdIn0.J43mgsvQlOK0zn7APkizIRkKphNIeXwtcabyKxoUnZo`,
        'Content-Type': 'application/json',
      }


      // --------------------------- MOVIE FETCHER --------------------------- //
export const fetchMovies = async (page = 1, genre?: string, search?: string) => {
  const numMovies = 36;
  try {
    const params: any = { page, limit: numMovies };
    if (genre) params.genre = genre;
    if (search) params.search = search;

    const response = await fetch(
      `${BASE_URL}/movies?page=${page}&limit=${numMovies}${genre ? `&genre=${genre}` : ''}${search ? `&search=${search}` : ''}`,
      {
        headers,
      }
    );
    return await response.json();
  } catch (error: any) {
    console.error('Error fetching movies:', error.response?.data || error.message || error);
    throw new Error('Failed to fetch movies');
  }
};

      // --------------------------- MOVIE BY ID --------------------------- //

export const fetchMovieById = async (id: string) => {
  console.log('Fetching movie with ID:', id);
  try {
    const response = await fetch(`${BASE_URL}/movies/${id}` , { headers,
    });
    if (!response.json) {
      console.warn(`No data returned for movie ID: ${id}`);
      return null;
    }
     return await response.json();
  } catch (error: any) {
    console.error('Error fetching movie:', error.response?.data || error.message || error);
    throw new Error('Failed to fetch movie');
  }
};

      // --------------------------- GENRES FETCHER --------------------------- //
export const fetchGenres = async () => {
  try {
       const response = await fetch(`${BASE_URL}/genres/movies`, {
      headers,
    });
      
    return await response.json();
  } catch (error: any) {
    console.error('Error fetching genres:', error.response?.data || error.message || error);
    throw new Error('Failed to fetch genres');
  }
};

