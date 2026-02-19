(() => {
  function placeholderPoster() {
    return 'https://via.placeholder.com/300x450/222/FFFFFF?text=No+Image';
  }
  function createCard(item) {
    const poster = item.Poster && item.Poster !== 'N/A' ? item.Poster : placeholderPoster();
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.imdbid = item.imdbID;
    const img = document.createElement('img');
    img.className = 'movie-poster';
    img.src = poster;
    img.alt = item.Title;
    const info = document.createElement('div');
    info.className = 'movie-info';
    const title = document.createElement('h3');
    title.className = 'movie-title';
    title.textContent = item.Title;
    const year = document.createElement('div');
    year.className = 'movie-year';
    year.textContent = item.Year;
    info.appendChild(title);
    info.appendChild(year);
    card.appendChild(img);
    card.appendChild(info);
    card.addEventListener('click', () => {
      if (window.MovieDetails && typeof window.MovieDetails.open === 'function') {
        window.MovieDetails.open(item.imdbID);
      }
    });
    return card;
  }
  function setLoading(key, isLoading) {
    const el = document.getElementById(`loading-${key}`);
    if (!el) return;
    el.innerHTML = '';
    if (isLoading) {
      el.classList.add('active');
      const sp = document.createElement('div');
      sp.className = 'spinner';
      el.appendChild(sp);
    } else {
      el.classList.remove('active');
    }
  }
  async function loadRow(key, query) {
    setLoading(key, true);
    const container = document.getElementById(`row-${key}`);
    if (!container) return;
    const { results } = await window.OMDbAPI.searchMovies(query, 1);
    container.innerHTML = '';
    results.forEach(item => {
      container.appendChild(createCard(item));
    });
    setLoading(key, false);
    return results;
  }
  async function setupHero(seed) {
    const heroBg = document.getElementById('hero-bg');
    const titleEl = document.getElementById('hero-title');
    const metaEl = document.getElementById('hero-meta');
    const plotEl = document.getElementById('hero-plot');
    if (!seed || !seed.length) {
      heroBg.style.backgroundImage = 'linear-gradient(180deg, #141414, #141414)';
      titleEl.textContent = '';
      metaEl.textContent = '';
      plotEl.textContent = '';
      return;
    }
    const pick = seed[0];
    const { data } = await window.OMDbAPI.getMovieById(pick.imdbID);
    const poster = data && data.Poster && data.Poster !== 'N/A' ? data.Poster : placeholderPoster();
    heroBg.style.backgroundImage = `url("${poster}")`;
    titleEl.textContent = data ? data.Title : pick.Title;
    const meta = [];
    if (data && data.Genre) meta.push(data.Genre);
    if (data && data.Year) meta.push(data.Year);
    if (data && data.Runtime) meta.push(data.Runtime);
    metaEl.textContent = meta.join(' • ');
    plotEl.textContent = data && data.Plot ? data.Plot : '';
  }
  async function initHome() {
    const isHome = !!document.getElementById('hero');
    if (!isHome) return;
    const categories = [
      { key: 'trending', name: 'Trending', query: 'avengers' },
      { key: 'action', name: 'Action', query: 'action' },
      { key: 'drama', name: 'Drama', query: 'drama' },
      { key: 'scifi', name: 'Sci-Fi', query: 'sci-fi' }
    ];
    const trending = await loadRow('trending', categories[0].query);
    setupHero(trending);
    await loadRow('action', categories[1].query);
    await loadRow('drama', categories[2].query);
    await loadRow('scifi', categories[3].query);
  }
  window.addEventListener('DOMContentLoaded', initHome);
})();
