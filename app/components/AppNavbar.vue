<script setup lang="ts">
const navLinks = ["Sejarah", "Budaya", "Kuliner", "Wisata", "Teknologi"];
</script>

<template>
  <nav>
    <NuxtLink to="/" class="nav-logo">Jiwa <em>Nusantara</em></NuxtLink>
    <ul class="nav-links">
      <li v-for="link in navLinks" :key="link">
        <NuxtLink to="#">{{ link }}</NuxtLink>
      </li>
    </ul>
    <div class="nav-right">
      <span class="nav-issue">Vol. I · Yogyakarta</span>
      <a href="#" class="nav-lang">EN / ID</a>
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 60px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(246, 240, 229, 0.94);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--line);
}
.nav-logo {
  font-family: "Libre Baskerville", serif;
  font-size: 20px;
  font-weight: 400;
  color: var(--ink);
  text-decoration: none;
  letter-spacing: 0.04em;
}
.nav-logo em {
  font-style: italic;
  color: var(--terra);
}
.nav-links {
  display: flex;
  gap: 36px;
  list-style: none;
}
.nav-links a {
  font-family: "Josefin Sans", sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s;
}
.nav-links a:hover {
  color: var(--terra);
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 24px;
}
.nav-issue {
  font-family: "Josefin Sans", sans-serif;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--muted);
  border-right: 1px solid var(--line);
  padding-right: 24px;
}
.nav-lang {
  font-family: "Josefin Sans", sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--terra);
  text-decoration: none;
}
@media (max-width: 900px) {
  .nav-links {
    display: none;
  }
}
@media (max-width: 768px) {
  nav {
    padding: 0 20px;
    height: 60px;
  }
  .nav-right {
    gap: 12px;
  }
  .nav-issue {
    padding-right: 12px;
    font-size: 9px;
  }
  .nav-logo {
    font-size: 18px;
  }
}
</style>
