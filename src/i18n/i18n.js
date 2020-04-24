import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import vi from './locales/vi'
import en from './locales/en'

const resources = {
  en: {
    translation: () => en
  },
  vi: {
    translation: () => vi
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "vi",
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  })
export default i18n