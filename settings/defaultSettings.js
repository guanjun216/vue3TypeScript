/*
 * @Author: 江文浩
 * @Date: 2020-07-28 17:27:12
 * @LastEditTime: 2020-07-29 17:36:51
 * @LastEditors: 江文浩
 * @Description: 描述信息
 * @FilePath: \jtmm_scm3-feature-basicInformation-luofu-2020072410410001\src\settings.js
 */

module.exports = {
  title: "今天买买全球EOC",

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: "production"
};
