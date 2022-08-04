import I18n from 'react-native-i18n';
import en from './locales/en';
import vi from './locales/vi';
import jp from './locales/jp';
I18n.fallbacks = true;
I18n.translations = {
    en,
    vi,
    jp
};

export default I18n;