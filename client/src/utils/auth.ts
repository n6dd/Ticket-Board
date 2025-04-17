import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    try {
      return token ? jwtDecode<JwtPayload>(token) : null;
    } catch (err) {
      console.error("Error decoding token:", err);
      return null;
    }
  }

  loggedIn() {
    const token = this.getToken();
    const isLoggedIn = !!token && !this.isTokenExpired(token);
    console.log("User logged in:", isLoggedIn);
    return isLoggedIn;
  }
  
  isTokenExpired(token: string) {
    if (!token) return true;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true;

      const isExpired = decoded.exp * 1000 < Date.now();
      console.log("Token expiration time:", new Date(decoded.exp * 1000));
      console.log("Token expired:", isExpired);
      return isExpired;
    } catch (err) {
      console.error("Error decoding token for expiration check:", err);
      return true;
    }
  }

  getToken(): string {
    const token = localStorage.getItem('id_token') || '';
    console.log("Retrieved token:", token ? "Token found" : "No token found");
    return token;
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    console.log("Token set in localStorage:", idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    console.log("Token removed from localStorage");
    window.location.assign('/');
  }
}

export default new AuthService();
