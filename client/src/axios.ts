import axios, { AxiosError, AxiosResponse } from "axios";
import { Store } from "pinia";


const main = (
    storeToken: any,
) => {

    axios.interceptors.response.use(

        (res: AxiosResponse) => {
            return res;
        },

        async (error: AxiosError) => {
            const request = error.config;

            if(error && error.response && error.response.status == 401){

                const res = await axios.post('http://127.0.0.1:3000/auth/create-tokens', {}, {
                    withCredentials: true,
                });

                if(res.status === 200){

                    if(res.data.msg !== "refreshToken expired"){
                        storeToken.edit(res.data.accessToken);
                        request.headers!['Authorization'] = "Bearer " + res.data.accessToken;
                        request.withCredentials = true;
                        return axios.request(request);
                    }else{
                        storeToken.edit('');
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
