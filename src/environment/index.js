const ENV = process.env.NODE_ENV;

if (!ENV) {
    console.warn('process.env.NODE_ENV not set');
}

const mode = {
    ENV,
    MOCK: (ENV === 'mock'),
    DEVELOPMENT: (ENV === 'development'),
    PRODUCTION: (ENV === 'production')
};

export default mode;
