module.exports = {
    webpack: {
        configure: {
            resolve: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    },
    devServer: (devServerConfig) => {
        return {
            ...devServerConfig,
            proxy: {
                '/api': 'http://localhost:4000',
                '/auth': 'http://localhost:4000',
            },
            allowedHosts: 'all',
        };
    }
};
