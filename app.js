const cookieStorage = {
  getItem: (key) => {
    const cookies = document.cookie
      .split(';')
      .map(cookie => cookie.split('='))
      .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {})
    return
  },
  setItem: (key, value) => {
    document.cookie = `${key}=${value}`
  }
}

const storageType = localStorage; //change to suit storage
const consentPropertyName = 'tdcv_consent';

const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

window.onload = () => {
  const consentPopup = document.getElementById('consent-popup');
  const acceptBtn = document.getElementById('accept');

  const acceptFunction = event => {
    saveToStorage(storageType);
    consentPopup.classList.add('hidden'); //only has an effect if the hidden class has been removed
  }

  acceptBtn.addEventListener('click', acceptFunction);

  if (shouldShowPopup(storageType)) {
    setTimeout(() => {
      consentPopup.classList.remove('hidden');
    }, 2000)
  }
}