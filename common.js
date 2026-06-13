function getUser(){
  return localStorage.getItem("saatpakeUser") || "Guest";
}

function getUserPhone(){
  return localStorage.getItem("saatpakeUserPhone") || "";
}

function logout(){
  localStorage.removeItem("saatpakeUser");
  localStorage.removeItem("saatpakeUserPhone");
  window.location.href = CONFIG.LOGIN_PAGE;
}

function goPage(page){
  window.location.href = page;
}

function showToast(message){
  alert(message);
}

function openWhatsApp(message){
  const phone = CONFIG.ADMIN_WHATSAPP;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

async function apiGet(type){
  const url = `${CONFIG.API_URL}?type=${type}&_=${Date.now()}`;
  const res = await fetch(url, { cache: "no-store" });
  return await res.json();
}

async function apiPost(data){
  await fetch(CONFIG.API_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(data)
  });
}

function bottomNav(active){
  document.write(`
    <nav class="bottom-nav">
      <a href="home.html" class="nav-item ${active === 'home' ? 'active' : ''}">
        <span>🏠</span>Home
      </a>
      <a href="search.html" class="nav-item ${active === 'search' ? 'active' : ''}">
        <span>🔍</span>Search
      </a>
      <a href="favourites.html" class="nav-item ${active === 'favourites' ? 'active' : ''}">
        <span>❤️</span>Favourites
      </a>
      <a href="register.html" class="nav-item ${active === 'register' ? 'active' : ''}">
        <span>➕</span>Register
      </a>
      <a href="profile.html" class="nav-item ${active === 'profile' ? 'active' : ''}">
        <span>👤</span>Profile
      </a>
    </nav>
  `);
}
function hasConsent(profile){
  const value =
    profile["Consent to Share Profile Information"] ||
    profile["I give permission to SaatPake to share my profile and contact details with interested members"] ||
    "";

  return String(value).trim().toLowerCase() === "i agree";
}

function getPublicProfiles(profiles){
  return profiles.filter(function(profile){
    return hasConsent(profile);
  });
}
