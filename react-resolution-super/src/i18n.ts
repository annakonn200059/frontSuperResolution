import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/i18n/{{ns}}/{{lng}}.json',
    },
    fallbackLng: 'en',
    //debug: true,
    ns: ['common', 'main', 'profile', 'api'],
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
  })

export default i18n
