import { LANGUAGE_CHANGE_LOCALE, LANGUAGE_TOGGLE_LOCALE } from './actionTypes'

export const changeLocale = locale => ({
  type: LANGUAGE_CHANGE_LOCALE,
  locale,
})

export const toggleLanguage = () => ({
  type: LANGUAGE_TOGGLE_LOCALE,
})
