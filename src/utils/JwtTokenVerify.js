
import {jwtDecode} from 'jwt-decode';

 
  export function isTokenExpired(token) {
  if (!token) return true; 

  try {
    const decoded = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000); 
    return decoded.exp < now;
  } catch (error) {
    console.error("Invalid JWT:", error);
    return true; 
  }
}


export default isTokenExpired;
