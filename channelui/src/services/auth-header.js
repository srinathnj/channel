export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    // for Node.js Express back-end
    // return {'Cookie':user.accessToken, 'Authorization': `Bearer ${user.accessToken}`,'x-access-token': user.accessToken };
    return { 'cookie': user.accessToken };

    // return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}
