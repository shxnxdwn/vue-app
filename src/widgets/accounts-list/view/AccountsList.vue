<template>
  <div class="accounts-list">
    <div v-if="!accounts.length" class="empty-state">
      <p>Список учетных записей пуст.</p>
      <p>Нажмите «+», чтобы добавить первую запись.</p>
    </div>

    <div v-else>
      <AccountFormRow
        v-for="account in accounts"
        :key="account.id"
        :account="account"
        @update="handleAccountUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { AccountFormRow, useAccountsStore, type Account } from '@/entities/account';

const accountsStore = useAccountsStore();
const { accounts } = storeToRefs(accountsStore);

function handleAccountUpdate(updatedAccount: Account) {
  accountsStore.updateAccount(updatedAccount);
}
</script>

<style scoped>
.accounts-list {
  display: flex;
  flex-direction: column;
}
.empty-state {
  padding: 48px 24px;
  text-align: center;
  background-color: var(--color-surface);
  border-radius: var(--border-radius-m);
  border: 1px dashed var(--color-border);
}
.empty-state p {
  margin: 0;
  color: var(--color-text-body);
}
.empty-state p:first-child {
  font-size: 18px;
  color: var(--color-text-heading);
  margin-bottom: 8px;
}
</style>
