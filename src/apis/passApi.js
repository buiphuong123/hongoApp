import axiosClient from '../apis/axiosClient';
class PassApi {
    postForgot = (params) => {
    const url = '/forgot';
    return axiosClient.post(url, { params });
    };
   }
   const passApi = new PassApi();
   export default passApi;