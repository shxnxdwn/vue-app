<template>
  <main class="accounts-page">
    <header class="page-header">
      <h1>Учетные записи</h1>
      <AddAccountButton />
    </header>

    <div class="info-banner">
      <i class="pi pi-info-circle" />
      <span>
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </span>
    </div>

    <AccountsList />
  </main>
</template>

<script lang="ts" setup>
import { AccountsList } from '@/widgets/accounts-list';
import { AddAccountButton } from '@/features/account-add';
</script>

<style scoped>
.accounts-page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 24px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
h1 {
  font-size: 28px;
  margin: 0;
}
.info-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: var(--color-surface);
  padding: 12px 16px;
  border-radius: var(--border-radius-m);
  margin-bottom: 24px;
  font-size: 14px;
}
.info-banner .pi {
  font-size: 20px;
  color: var(--color-accent);
}
</style>
