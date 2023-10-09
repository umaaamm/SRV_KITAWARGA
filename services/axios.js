const axios = require("axios")

const axiosInstance = axios.create({
    baseURL: 'https://api.xendit.co',
});

axiosInstance.interceptors.request.use(
    async (config) => {
        config.headers['Authorization'] = 'Basic eG5kX3Byb2R1Y3Rpb25fM1FDbTVZZW5oamI5VHBvcDZZUm01aGFiN3RhZWVhT3N1RTE4U3d2ZE82STg3WXdFNVNFSHJwTlY5dGtRYXJOOktsb3AxMjM0';
        config.headers['api-version'] = '2022-07-31';
        config.headers['with-fee-rule'] = 'xpfeeru_174c015b-2151-499c-88d6-d676190c7a1a'

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

module.exports = axiosInstance;
