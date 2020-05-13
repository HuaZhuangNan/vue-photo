/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

/**
 * @description 加载语言文件
 * @returns 语言message数组
 */
function loadLocaleMessages() {
  const locales = require.context('./lang', false, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      const elementLocale = require(`element-ui/lib/locale/lang/${key.replace('./', '').replace('.json', '.js')}`);
      messages[locale] = Object.assign(elementLocale.default, locales(key));
    }
  });
  return messages;
}
const messages = loadLocaleMessages();
// 对象
const i18n = new VueI18n({
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages,
});

/**
 * @description 获取默认语言
 * @export
 * @returns {strong} 返回语言
 */
export function getLanguage() {
  const language = (navigator.language || navigator.browserLanguage).toLowerCase();
  const locales = Object.keys(messages);
  let locale = 'zh-CN'; // 默认的
  if (locales.indexOf(language) !== -1) locale = language;
  return locale;
}
/**
 * @description 设置语言
 * @export
 * @param {string} language
 */
export function setLanguage(language) {
  i18n.locale = language;
}

export default i18n;
