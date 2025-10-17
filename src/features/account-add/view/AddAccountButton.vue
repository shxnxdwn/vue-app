<template>
  <Button icon="pi pi-plus" @click="onAdd" />
</template>

<script lang="ts" setup>
import Button from 'primevue/button';
import { useAccountsStore } from '@/entities/account';

const accountsStore = useAccountsStore();

function onAdd() {
  accountsStore.addAccount();
}
</script>

<style scoped>
.p-button {
  width: 42px;
  height: 42px;
}
</style>
