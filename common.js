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

function findValueByKey(profile, keyword){
  let value = "";

  Object.keys(profile || {}).forEach(function(key){
    if(String(key).toLowerCase().includes(keyword.toLowerCase())){
      value = profile[key];
    }
  });

  return value;
}

function hasConsent(profile){

  const consent = findValueByKey(profile, "consent");

  const status =
    profile["Status"] ||
    findValueByKey(profile, "status") ||
    "";

  return (
    String(consent).trim().toLowerCase() === "i agree" &&
    String(status).trim().toLowerCase() === "approved"
  );
}

function getPublicProfiles(profiles){
  return profiles.filter(function(profile){
    return hasConsent(profile);
  });
}
