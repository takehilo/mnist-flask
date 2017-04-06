module.exports = (env) => {
  env = env || 'base';
  return require('./config/' + env)(env);
};
