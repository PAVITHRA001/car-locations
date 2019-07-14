import axios from 'axios';

export const callFetchApi = (...params) => callFetchAxios(...params);

function callFetchAxios(endpoint, params, method, reqbody = {}) {
    const axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
        },
    });

    switch (method) {
        case 'GET' :
            return axiosInstance.get(endpoint, {
                params: params,
            })
                .then((response) => response)
                .catch((error) => {
                    throw (error);
                });
        case 'POST' :
            return axiosInstance.post(endpoint, reqbody)
                .then((response) => response)
                .catch((error) => {throw (error);});
        case 'PUT' :
            return axiosInstance.put(endpoint, reqbody)
                .then((response) => response)
                .catch((error) => error);
        case 'DELETE':
            return axiosInstance.delete(endpoint)
                .then((response) => response)
                .catch((response) => response);
    }
}

export default callFetchApi;
