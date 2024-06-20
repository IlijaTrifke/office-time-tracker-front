import { defineStore } from "pinia";
import { TOKEN_KEY } from "~/constants";
import type { User } from "~/types/user";

export const useUserStore = defineStore("User", () => {
  const router = useRouter();
  const token = useCookie(TOKEN_KEY);

  const { data: user, refresh: fetchUser } = useApi<User>("/api/user", {
    lazy: true,
  });

  async function getUser() {
    try {
      await fetchUser();
    } catch (err) {
      console.error("Failed to get user", err);
    }
  }

  async function logOut() {
    user.value = null;
    token.value = null;

    router.push("/");
  }

  return { user, getUser, logOut };
});
