<script lang="ts" setup>
const userStore = useUserStore();

const items = [
  [
    {
      label: "Odjava",
      icon: "i-heroicons-arrow-uturn-left-20-solid",
      click: userStore.logOut,
    },
  ],
];
</script>

<template>
  <nav class="top-0 w-full sticky bg-white z-[10] shadow-lg py-4">
    <UContainer class="flex justify-between items-center gap-8">
      <div class="flex gap-8 items-center">
        <div class="space-x-8">
          <NuxtLink class="text-green-600 font-semibold" to="/">Home</NuxtLink>
          <NuxtLink class="text-green-600 font-semibold" to="/about"
            >About</NuxtLink
          >
        </div>
      </div>
      <div>
        <UDropdown :items="items" :popper="{ arrow: true }">
          <UButton
            color="white"
            :label="userStore.user?.name"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          />
        </UDropdown>
      </div>
    </UContainer>
  </nav>
</template>
