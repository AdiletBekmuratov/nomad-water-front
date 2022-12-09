import jwt_decode from 'jwt-decode';

export const isExpired = (token: string) => {
  if (token) {
    const decodedJwt: any = jwt_decode(token);
    return decodedJwt.exp * 1000 <= Date.now();
  }
  return false;
};
