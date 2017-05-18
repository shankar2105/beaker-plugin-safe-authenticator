import classNames from 'classnames';
import CONSTANTS from '../constants.json';

export const isUserAuthorised = () => window.safeAuthenticator.getAuthenticatorHandle();

export const checkAuthorised = (nextState, replace, callback) => {
  if (!isUserAuthorised()) {
    replace('/login');
  }
  callback();
};

export const getStrengthMsg = (strength) => {
  switch (true) {
    case (strength === 0): {
      return '';
    }
    case (strength < CONSTANTS.PASSPHRASE_STRENGTH.VERY_WEAK):
      return CONSTANTS.PASSPHRASE_STRENGTH_MSG.VERY_WEAK;
    case (strength < CONSTANTS.PASSPHRASE_STRENGTH.WEAK):
      return CONSTANTS.PASSPHRASE_STRENGTH_MSG.WEAK;
    case (strength < CONSTANTS.PASSPHRASE_STRENGTH.SOMEWHAT_SECURE):
      return CONSTANTS.PASSPHRASE_STRENGTH_MSG.SOMEWHAT_SECURE;
    case (strength >= CONSTANTS.PASSPHRASE_STRENGTH.SECURE):
      return CONSTANTS.PASSPHRASE_STRENGTH_MSG.SECURE;
    default:
  }
};

export const parseAppName = (name) => (
  name.split('_').map((i) => `${i[0].toUpperCase()}${i.slice(1)}`).join(' ')
);

export const getAppIconClassName = (i) => {
  const index = (i + 1) % 6;
  return classNames(
    'app-list-i-h',
    'app-icon',
    `app-icon-clr-${index || 6}`
  );
};
