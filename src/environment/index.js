
const env = (process.env.NODE_ENV);
if (!env) console.warn('process.env.NODE_ENV has not been set');

const mode = {
    env: (env),
    mock: (env === 'mock'),
    local: (env === 'local'),
    development: (env === 'development'),
    staging: (env === 'staging'),
    production: (env === 'production')
};

export default {
    env,
    mode
};
