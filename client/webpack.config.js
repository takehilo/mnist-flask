module.exports = (env) => {
  env = env || 'development';
  return require('./config/' + env)(env);
};
