<template>
  <Button
    aria-label="Удалить"
    icon="pi pi-trash"
    rounded
    severity="danger"
    text
    @click="onDelete"
  />
</template>

<script lang="ts" setup>
import Button from 'primevue/button';
import { useAccountsStore } from '@/entities/account';
import { useToast } from 'primevue/usetoast';

const props = defineProps<{
  accountId: number;
  login: string;
}>();

const accountsStore = useAccountsStore();
const toast = useToast();

function onDelete() {
  accountsStore.removeAccount(props.accountId);

  toast.add({
    severity: 'warn',
    summary: 'Запись удалена',
    detail: `Запись для логина ${props.login || 'без логина'} была удалена.`,
    life: 3000,
  });
}
</script>

<style scoped>
.p-button {
  width: 42px;
  height: 42px;
}
</style>
