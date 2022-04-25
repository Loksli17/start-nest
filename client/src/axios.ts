import axios, { AxiosError, AxiosResponse } from "axios";

const main = () => {
    axios.interceptors.response.use(

        (res: AxiosResponse) => {
            return res;
        },

        async (error: AxiosError) => {
            const request = error.config;

            if(error && error.response && error.response.status == 401){

                const res = await axios.post('http://127.0.0.1:3000/auth/create-tokens');

                if(res.status === 200){

                    if(res.data.msg !== "refreshToken expired"){
                        localStorage.setItem('accessToken', res.data.accessToken);
                        axios.defaults.headers.common['Authorization'] = res.data.accessToken;
                        request.headers!['Authorization'] = res.data.accessToken;
                        return axios.request(request);
                    }else{
                        // store.commit('setUserIdentity', null);
                        localStorage.setItem('accessToken', '');
                        return Promise.reject(error);
                    }
                }else{
                    return Promise.reject(error);
                }
            }
        }
    )
}

export default main;
