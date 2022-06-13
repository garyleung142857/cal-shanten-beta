import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './en'
import tc from './tc'

Vue.use(VueI18n)

const locale = 'tc'

const messages = {
  en: en,
  tc: tc,
}

const i18n = new VueI18n({
  locale, messages
})

export default i18n