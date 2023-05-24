const path = require('path');

module.exports = function override(config, env) {
    config.entry = {
        main: path.resolve(__dirname, 'src/app/startApp/index.tsx')
    };
    return config;
};
