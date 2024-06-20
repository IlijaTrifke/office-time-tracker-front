export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();

  if (!userStore.user) {
    try {
      await userStore.getUser();
    } catch (err) {
      console.error(err);
    }
  }

  if (!userStore.user || userStore.user.role !== "ROLE_ADMIN") {
    console.log("Redirecting to login");
    return navigateTo("/login");
  }
});
