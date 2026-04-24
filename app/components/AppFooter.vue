<template>
  <footer>
    <span class="footer-brand"
      >Jiwa <em>Nusantara</em> — Portal Digital Yogyakarta</span
    >
    <span class="footer-meta"
      >Nusantara Digital City 2026 · Media Cloud Indonesia</span
    >
  </footer>
</template>

<style scoped>
footer {
  background: var(--ink);
  color: rgba(246, 240, 229, 0.7);
  padding: 40px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}
.footer-brand {
  font-family: "Libre Baskerville", serif;
  font-size: 18px;
  color: var(--parchment);
}
.footer-brand em {
  font-style: italic;
  color: var(--terra);
}
.footer-meta {
  font-family: "Josefin Sans", sans-serif;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(246, 240, 229, 0.35);
}
@media (max-width: 900px) {
  footer {
    padding: 32px 24px;
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}

@media (max-width: 768px) {
  footer {
    padding: 32px 20px;
  }
  .footer-brand {
    font-size: 16px;
  }
}
</style>
