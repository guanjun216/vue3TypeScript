/* jshint esversion: 6 */
export const getters = {
  sidebar: (state: any) => state.app.sidebar,
  size: (state: any) => state.app.size,
  device: (state: any) => state.app.device,
  visitedViews: (state: any) => state.tagsView.visitedViews,
  cachedViews: (state: any) => state.tagsView.cachedViews,
  errorLogs: (state: any) => state.errorLog.logs,
};
// export default { getters };
