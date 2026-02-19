(() => {
  const PROXY_BASE = '';
  async function searchMovies(query, page = 1) {
    const url = `${PROXY_BASE}/api/search?s=${encodeURIComponent(query)}&page=${page}`;
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
    const url = `${PROXY_BASE}/api/movie?i=${encodeURIComponent(imdbID)}`;
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
