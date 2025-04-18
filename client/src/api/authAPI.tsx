import { UserLogin } from "../interfaces/UserLogin";
import Auth from "../utils/auth";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Login failed');
    }

    Auth.login(result.token);

    return result;  
  } catch (err) {
    console.error('Error from user login: ', err);
    return Promise.reject(err instanceof Error ? err.message : 'Could not fetch user info');
  }
};

export { login };
