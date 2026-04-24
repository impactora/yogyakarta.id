<script setup lang="ts">
const features = [
  { id: "01", title: "Sejarah", sub: "1.200 tahun perjalanan" },
  { id: "02", title: "Budaya", sub: "Wayang · Batik · Gamelan" },
  { id: "03", title: "Kuliner", sub: "Gudeg · Bakpia · Kopi Joss" },
  { id: "04", title: "Wisata", sub: "Prambanan · Keraton · Merapi" },
  { id: "05", title: "Teknologi", sub: "21 Universitas · 300+ Startup" },
  { id: "06", title: "Peta", sub: "Navigasi interaktif kota" },
];
</script>

<template>
  <section class="hero">
    <div class="hero-left">
      <div class="hero-eyebrow">Nusantara Digital City 2026</div>
      <h1 class="hero-title">
        Kota yang<br />Tak Pernah<br /><em>Berhenti</em>
      </h1>
      <p class="hero-pull-quote">
        "Yogyakarta bukan tempat yang kamu kunjungi — ini tempat yang kamu
        pulang kepadanya, sekalipun baru pertama kali datang."
      </p>
      <div class="hero-byline">Yogyakarta · Java · Indonesia</div>
    </div>

    <div class="hero-right">
      <div class="feature-label">Enam Dimensi Kota</div>
      <div class="feature-grid">
        <div v-for="item in features" :key="item.id" class="feature-cell">
          <div class="feature-cell-num">{{ item.id }}</div>
          <div class="feature-cell-title">{{ item.title }}</div>
          <div class="feature-cell-sub">{{ item.sub }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 72px;
  z-index: 1;
}
.hero-left {
  background: var(--parchment);
  padding: 80px 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-right: 1px solid var(--line);
  position: relative;
}
.hero-left::before {
  content: "01";
  position: absolute;
  top: 80px;
  right: 40px;
  font-family: "Josefin Sans", sans-serif;
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.15em;
  color: var(--muted);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}
.hero-eyebrow {
  font-family: "Josefin Sans", sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--terra);
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 16px;
}
.hero-eyebrow::before {
  content: "";
  display: block;
  width: 32px;
  height: 1px;
  background: var(--terra);
}
.hero-title {
  font-family: "Libre Baskerville", serif;
  font-size: clamp(52px, 6vw, 80px);
  font-weight: 700;
  line-height: 1.08;
  color: var(--ink);
  margin-bottom: 32px;
}
.hero-title em {
  font-style: italic;
  color: var(--terra);
  display: block;
}
.hero-pull-quote {
  font-family: "Libre Baskerville", serif;
  font-size: 16px;
  font-style: italic;
  color: var(--muted);
  line-height: 1.7;
  border-left: 3px solid var(--terra);
  padding-left: 20px;
  margin-bottom: 48px;
}
.hero-byline {
  font-family: "Josefin Sans", sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 20px;
}
.hero-byline::before {
  content: "";
  display: block;
  width: 20px;
  height: 1px;
  background: currentColor;
}
.hero-right {
  background: var(--ink);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 60px;
  position: relative;
  overflow: hidden;
}
.hero-right::before {
  content: "";
  position: absolute;
  top: 40px;
  right: 40px;
  width: 200px;
  height: 200px;
  border: 1px solid rgba(196, 132, 10, 0.15);
  transform: rotate(45deg);
}
.hero-right::after {
  content: "";
  position: absolute;
  top: 70px;
  right: 70px;
  width: 140px;
  height: 140px;
  border: 1px solid rgba(196, 132, 10, 0.1);
  transform: rotate(45deg);
}
.feature-label {
  font-family: "Josefin Sans", sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(196, 132, 10, 0.8);
  margin-bottom: 24px;
}
.feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.feature-cell {
  padding: 28px 24px;
  background: var(--ink);
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
}
.feature-cell:hover {
  background: rgba(255, 255, 255, 0.04);
}
.feature-cell-num {
  font-family: "Josefin Sans", sans-serif;
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 20px;
}
.feature-cell-title {
  font-family: "Libre Baskerville", serif;
  font-size: 16px;
  color: rgba(246, 240, 229, 0.9);
  line-height: 1.3;
  margin-bottom: 8px;
}
.feature-cell-sub {
  font-size: 12px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.35);
  line-height: 1.6;
}
@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
  }
  .hero-right {
    min-height: 50vh;
  }
}

@media (max-width: 768px) {
  .hero {
    padding-top: 60px;
  }
  .hero-left {
    padding: 60px 20px 40px;
    border-right: none;
    border-bottom: 1px solid var(--line);
  }
  .hero-left::before {
    top: 40px;
    right: 20px;
  }
  .hero-right {
    padding: 40px 20px;
  }
  .hero-title {
    font-size: clamp(40px, 10vw, 52px);
    margin-bottom: 24px;
  }
  .feature-grid {
    grid-template-columns: 1fr;
  }
  .hero-right::before,
  .hero-right::after {
    opacity: 0.3;
  }
}
</style>
