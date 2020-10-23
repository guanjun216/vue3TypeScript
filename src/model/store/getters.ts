/* jshint esversion: 6 */
export const getters = {
  sidebar: (state: any) => state.app.sidebar,
  size: (state: any) => state.app.size,
  device: (state: any) => state.app.device,
  visitedViews: (state: any) => state.tagsView.visitedViews,
  cachedViews: (state: any) => state.tagsView.cachedViews,
  errorLogs: (state: any) => state.errorLog.logs,
  showSettings: (state: any) => state.settings.showSettings,
  needTagsView: (state: any) => state.settings.tagsView,
  fixedHeader: (state: any) => state.settings.fixedHeader,
};
// export default { getters };
