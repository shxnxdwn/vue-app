import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Account } from './types';

let nextId = Date.now();

export const useAccountsStore = defineStore('accounts-entity', () => {
  const savedAccounts = localStorage.getItem('accounts-data');
  const accounts = ref<Account[]>(savedAccounts ? JSON.parse(savedAccounts) : []);

  function addAccount() {
    const newAccount: Account = {
      id: ++nextId,
      labels: [],
      type: 'Локальная',
      login: '',
      password: '',
    };

    accounts.value.push(newAccount);
  }

  function removeAccount(accountId: number) {
    accounts.value = accounts.value.filter((acc) => acc.id !== accountId);
  }

  function updateAccount(updatedAccount: Account) {
    const index = accounts.value.findIndex((acc) => acc.id === updatedAccount.id);

    if (index !== -1) {
      accounts.value[index] = updatedAccount;
    }
  }

  watch(
    accounts,
    (newAccounts) => {
      localStorage.setItem('accounts-data', JSON.stringify(newAccounts));
    },
    { deep: true },
  );

  return {
    accounts,
    addAccount,
    removeAccount,
    updateAccount,
  };
});
