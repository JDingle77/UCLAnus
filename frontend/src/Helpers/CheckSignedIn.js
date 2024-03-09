import Cookies from 'js-cookie';

export default function alertSignedIn(action) {
 if (Cookies.get("userId") == null) {
  window.alert(`You must be signed in to ${action}.`);
 }
}
