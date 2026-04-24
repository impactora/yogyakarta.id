<script setup lang="ts"></script>

<template>
  <main>
    <HomeHero />

    <div class="hr-divider">
      <div class="hr-divider-text">Mengenal Yogyakarta</div>
    </div>

    <HomeEditorial />
  </main>
</template>

<style scoped>
.hr-divider {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  padding: 0 60px;
  margin: 80px 0 0;
}
.hr-divider::before,
.hr-divider::after {
  content: "";
  height: 1px;
  background: var(--line);
}
.hr-divider-text {
  font-family: "Josefin Sans", sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--muted);
  white-space: nowrap;
}
@media (max-width: 900px) {
  .hr-divider {
    padding-left: 24px;
    padding-right: 24px;
  }
}

@media (max-width: 768px) {
  .hr-divider {
    padding: 0 20px;
    margin: 40px 0 0;
    gap: 16px;
  }
}
</style>
