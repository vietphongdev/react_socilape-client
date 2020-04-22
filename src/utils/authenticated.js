import jwtDecode from 'jwt-decode';

export function authenticated(){
  const token = localStorage.token;
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      return false;
    } else {
      return true;
    }
  }else{
    return false;
  }
};
