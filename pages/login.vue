<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from "#ui/types";
import { TOKEN_KEY } from "~/constants";

definePageMeta({
  layout: "unsigned",
});

const state = reactive({
  email: undefined,
  password: undefined,
});

const authCookie = useCookie(TOKEN_KEY);
const toast = useToast();

const userStore = useUserStore();
const router = useRouter();

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  try {
    const response = await api<{ token: string }>("/api/signin", {
      method: "POST",
      body: state,
    });

    authCookie.value = response.token;

    setTimeout(async () => {
      await userStore.getUser();

      if (userStore.user && userStore.user.role === "ROLE_ADMIN") {
        router.push("/users");
      } else {
        toast.add({
          title: "Greška",
          description: `Došlo je do greške prilikom prijave.`,
          color: "red",
          icon: "i-heroicons-information-circle-20-solid",
        });
      }
    }, 500);
  } catch (err) {
    console.error(err);
    toast.add({
      title: "Greška",
      description: `Došlo je do greške prilikom prijave. ${
        err?.data?.errorMessage ?? ""
      }`,
      color: "red",
      icon: "i-heroicons-information-circle-20-solid",
    });
  }
}
</script>

<template>
  <UContainer class="h-screen flex items-center justify-center">
    <UCard class="max-w-xl min-w-[370px] block">
      <template #header><div class="font-bold text-xl">Sign in</div></template>
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton block type="submit"> Sign in </UButton>
      </UForm>
    </UCard>
  </UContainer>
</template>
