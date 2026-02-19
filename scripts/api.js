(() => {
  const OMDB_API_BASE = 'https://www.omdbapi.com/';
  const OMDB_API_KEY = '3abdd6cf';
  async function searchMovies(query, page = 1) {
    const url = `${OMDB_API_BASE}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie&page=${page}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === 'True') {
        const results = Array.isArray(data.Search) ? data.Search : [];
        const totalResults = parseInt(data.totalResults || '0', 10);
        return { results, totalResults, error: null };
      } else {
        return { results: [], totalResults: 0, error: data.Error || 'Unknown error' };
      }
    } catch (e) {
      return { results: [], totalResults: 0, error: 'Network error' };
    }
  }
  async function getMovieById(imdbID) {
    const url = `${OMDB_API_BASE}?apikey=${OMDB_API_KEY}&i=${encodeURIComponent(imdbID)}&plot=full`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === 'True') {
        return { data, error: null };
      } else {
        return { data: null, error: data.Error || 'Unknown error' };
      }
    } catch (e) {
      return { data: null, error: 'Network error' };
    }
  }
  window.OMDbAPI = { searchMovies, getMovieById };
})(); 
