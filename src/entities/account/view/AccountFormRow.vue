<template>
  <fieldset class="account-fieldset">
    <div class="fields-grid">
      <div class="form-group">
        <label :for="`labels-${account.id}`">Метки</label>
        <InputText
          :id="`labels-${account.id}`"
          v-model="labelsAsString"
          placeholder="XXX; YYYY"
          :maxlength="50"
          @blur="handleUpdate"
        />
      </div>

      <div class="form-group">
        <label :for="`type-${account.id}`">Тип записи</label>
        <Select
          :id="`type-${account.id}`"
          v-model="localAccount.type"
          :options="accountTypeOptions"
          @change="handleTypeChange"
        />
      </div>

      <div class="form-group">
        <label :for="`login-${account.id}`">Логин</label>
        <InputText
          :id="`login-${account.id}`"
          v-model="localAccount.login"
          placeholder="Значение"
          :maxlength="100"
          :class="{ 'p-invalid': !validationState.login }"
          @blur="handleUpdate"
        />
        <small v-if="!validationState.login" class="error-message"> Это обязательное поле. </small>
      </div>

      <div class="form-group">
        <label :for="`password-${account.id}`">Пароль</label>
        <Password
          v-if="localAccount.type === 'Локальная'"
          :id="`password-${account.id}`"
          v-model="localAccount.password"
          placeholder="******"
          :feedback="false"
          :toggleMask="true"
          :class="{ 'p-invalid': !validationState.password }"
          :input-props="{ maxlength: 100 }"
          @blur="handleUpdate"
        />
        <div v-else class="password-placeholder">Не используется</div>
        <small
          v-if="localAccount.type === 'Локальная' && !validationState.password"
          class="error-message"
        >
          Это обязательное поле.
        </small>
      </div>
    </div>
    <div class="actions-group">
      <DeleteAccountButton :account-id="account.id" :login="localAccount.login" />
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import Select from 'primevue/select';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { ref, computed, watch } from 'vue';
import type { Account, AccountType } from '@/entities/account';
import { DeleteAccountButton } from '@/features/account-delete';
import { useToast } from 'primevue/usetoast';

const props = defineProps<{ account: Account }>();
const emit = defineEmits<{ (e: 'update', account: Account): void }>();
const toast = useToast();

const localAccount = ref<Account>({ ...props.account });
const accountTypeOptions = ref<AccountType[]>(['Локальная', 'LDAP']);

const validationState = ref({
  login: props.account.login.trim().length > 0,
  password:
    props.account.type !== 'Локальная' ||
    (typeof props.account.password === 'string' && props.account.password.length > 0),
});

const labelsAsString = computed({
  get() {
    return localAccount.value.labels.map((label) => label.text).join('; ');
  },
  set(newValue: string) {
    localAccount.value.labels = newValue
      .split(';')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((text) => ({ text }));
  },
});

function validate() {
  validationState.value.login = localAccount.value.login.trim().length > 0;

  if (localAccount.value.type === 'Локальная') {
    validationState.value.password = typeof localAccount.value.password === 'string' && localAccount.value.password.length > 0;
  } else {
    validationState.value.password = true;
  }

  return validationState.value.login && validationState.value.password;
}

function handleUpdate() {
  const isValid = validate();

  if (!isValid) {
    return;
  }

  emit('update', { ...localAccount.value });

  toast.add({
    severity: 'success',
    summary: 'Сохранено',
    detail: `Запись для логина «${localAccount.value.login}» обновлена.`,
    life: 3000,
  });
}

function handleTypeChange() {
  if (localAccount.value.type === 'LDAP') {
    localAccount.value.password = null;
  }

  handleUpdate();
}

watch(
  () => props.account,
  (newAccount) => {
    localAccount.value = { ...newAccount };
  },
  { deep: true },
);
</script>

<style scoped>
.account-fieldset {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-m);
  background-color: var(--color-surface);
  padding: 16px;
  margin: 0 0 12px 0;
  transition: var(--transition-fast);
}
.account-fieldset:hover {
  border-color: var(--color-border-hover);
}
.fields-grid {
  flex-grow: 1;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 16px;
}
.actions-group {
  padding-top: 20px;
}
.form-group {
  position: relative;
  display: flex;
  flex-direction: column;
}
.form-group label {
  font-size: 12px;
  margin-bottom: 4px;
  color: var(--color-text-body);
}
.password-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  font-size: 14px;
  color: var(--color-text-body);
  opacity: 0.6;
  box-sizing: border-box;
}
:deep(.p-password),
:deep(.p-select) {
  height: 42px;
}
:deep(.p-inputtext),
:deep(.p-select) {
  width: 100%;
  height: 42px;
  background-color: var(--color-background-soft) !important;
  border: 1px solid var(--color-border) !important;
  color: var(--color-text-heading) !important;
  box-sizing: border-box;
  border-radius: var(--border-radius-s);
  display: flex;
  align-items: center;
}
:deep(.p-inputtext.p-invalid),
:deep(.p-password.p-invalid .p-inputtext) {
  border-color: var(--color-danger) !important;
}
:deep(input::placeholder) {
  color: var(--color-text-body);
  opacity: 0.5;
}
:deep(.p-inputtext.p-invalid::placeholder) {
  color: var(--color-text-body);
  opacity: 0.5;
}
:deep(.p-password-icon),
:deep(.p-select-dropdown) {
  color: var(--color-text-body) !important;
  cursor: pointer;
}
.error-message {
  color: var(--color-danger);
  font-size: 12px;
  margin-top: 4px;
  height: 14px;
}
</style>
