import 'babel-polyfill';
import path from 'path';
import i18n from 'i18n';
import ffiLoader from '../src/ffi/ffi_loader';

i18n.configure({
  locales: ['en'],
  directory: path.resolve(__dirname, '../', 'locales'),
  objectNotation: true
});

i18n.setLocale('en');

const init = () => {
  ffiLoader.loadLibrary()
    .catch(console.error);
};

init();
