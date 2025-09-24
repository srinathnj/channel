export default function authHeader_mp() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { "Content-Type": "multipart/form-data",'x-access-token': user.accessToken };
  } else {
    return {};
  }
}
