module.exports = {
  // GH pages are served from a sub-path, which we have to accomodate for
  publicPath: process.env.NODE_ENV === 'production' ? '/FinderEditor/' : '/',
  lintOnSave: false,
};
