(() => {
  const USERS_KEY = 'streamx_users';
  const SESSION_KEY = 'streamx_current_user';
  function getUsers() {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  function getCurrentUser() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
  function setCurrentUser(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }
  function logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'login.html';
  }
  function handleLogin(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) return { ok: false, message: 'Invalid credentials' };
    setCurrentUser({ name: user.name, email: user.email });
    return { ok: true };
  }
  function handleSignup(name, email, password) {
    const users = getUsers();
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, message: 'Email already registered' };
    const user = { name, email, password };
    users.push(user);
    saveUsers(users);
    setCurrentUser({ name, email });
    return { ok: true };
  }
  function requireAuthOrRedirect() {
    const user = getCurrentUser();
    if (!user) window.location.href = 'login.html';
  }
  function init() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const logoutBtn = document.getElementById('logoutBtn');
    const errorEl = document.getElementById('auth-error');
    if (loginForm) {
      const emailEl = document.getElementById('login-email');
      const passEl = document.getElementById('login-password');
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const res = handleLogin(emailEl.value.trim(), passEl.value);
        if (res.ok) {
          window.location.href = 'index.html';
        } else {
          if (errorEl) errorEl.textContent = res.message;
        }
      });
      const user = getCurrentUser();
      if (user) window.location.href = 'index.html';
    }
    if (signupForm) {
      const nameEl = document.getElementById('signup-name');
      const emailEl = document.getElementById('signup-email');
      const passEl = document.getElementById('signup-password');
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const res = handleSignup(nameEl.value.trim(), emailEl.value.trim(), passEl.value);
        if (res.ok) {
          window.location.href = 'index.html';
        } else {
          if (errorEl) errorEl.textContent = res.message;
        }
      });
    }
    if (logoutBtn) {
      logoutBtn.addEventListener('click', logout);
    }
    const isHome = !!document.getElementById('hero');
    if (isHome) requireAuthOrRedirect();
  }
  window.StreamXAuth = { getCurrentUser, logout, requireAuthOrRedirect };
  window.addEventListener('DOMContentLoaded', init);
})();
