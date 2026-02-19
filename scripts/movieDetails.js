(() => {
  function placeholderPoster() {
    return 'https://via.placeholder.com/300x450/222/FFFFFF?text=No+Image';
  }
  function ensureModalRoot() {
    let root = document.getElementById('modal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'modal-root';
      document.body.appendChild(root);
    }
    return root;
  }
  function renderModal(data) {
    const root = ensureModalRoot();
    root.innerHTML = '';
    const overlay = document.createElement('div');
    overlay.className = 'modal active';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.textContent = '×';
    const card = document.createElement('div');
    card.className = 'modal-card';
    const media = document.createElement('div');
    media.className = 'modal-media';
    const img = document.createElement('img');
    img.src = data.Poster && data.Poster !== 'N/A' ? data.Poster : placeholderPoster();
    img.alt = data.Title;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    media.appendChild(img);
    const body = document.createElement('div');
    body.className = 'modal-body';
    const title = document.createElement('h2');
    title.className = 'modal-title';
    title.textContent = data.Title || '';
    const meta = document.createElement('div');
    meta.className = 'modal-meta';
    const metaParts = [];
    if (data.Genre) metaParts.push(data.Genre);
    if (data.Year) metaParts.push(data.Year);
    if (data.Runtime) metaParts.push(data.Runtime);
    if (data.imdbRating) metaParts.push(`IMDb ${data.imdbRating}`);
    meta.textContent = metaParts.join(' • ');
    const plot = document.createElement('p');
    plot.className = 'modal-plot';
    plot.textContent = data.Plot || '';
    body.appendChild(title);
    body.appendChild(meta);
    body.appendChild(plot);
    overlay.appendChild(closeBtn);
    card.appendChild(media);
    card.appendChild(body);
    overlay.appendChild(card);
    root.appendChild(overlay);
    function close() {
      overlay.classList.remove('active');
      root.innerHTML = '';
    }
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
  }
  async function open(imdbID) {
    const { data } = await window.OMDbAPI.getMovieById(imdbID);
    if (!data) return;
    renderModal(data);
  }
  window.MovieDetails = { open };
})();
