const axios = require("axios")

const axiosInstanceD = axios.create({
    baseURL: 'https://api.xendit.co',
});

axiosInstanceD.interceptors.request.use(
    async (config) => {
        config.headers['Authorization'] = 'Basic eG5kX3Byb2R1Y3Rpb25fRGZKd1hIVDh6bEhTQWh2N3liWVNBUGlFOHVsZUlIY0dNNzV4ZWhCRUJPWWFKYk5GVVQzcHc5bFZDc1RhWXM6S2xvcDEyMzQ=';
        config.headers['api-version'] = '2022-07-31';
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstanceD.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

module.exports = axiosInstanceD;
