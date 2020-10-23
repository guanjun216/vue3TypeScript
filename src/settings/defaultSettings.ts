const title = "今天买买全球EOC";

/**
 * @type {boolean} true | false
 * @description Whether show the settings right-panel
 */
const showSettings = false;

/**
 * @type {boolean} true | false
 * @description Whether need tagsView
 */
const tagsView = true;

/**
 * @type {boolean} true | false
 * @description Whether fix the header
 */
const fixedHeader = true;

/**
 * @type {boolean} true | false
 * @description Whether show the logo in sidebar
 */
const sidebarLogo = false;

/**
 * @type {string | array} 'production' | ['production', 'development']
 * @description Need show err logs component.
 * The default is only used in the production env
 * If you want to also use it in dev, you can pass ['production', 'development']
 */
const errorLog = "production";
export default { title, showSettings, tagsView, fixedHeader, sidebarLogo };
