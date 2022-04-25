import { defineStore } from 'pinia';

export const useUserLoginStore = defineStore({

    id: 'userLogin',

    state: () => ({
        userLogin: localStorage.getItem('userLogin') ? localStorage.getItem('userLogin') : '' as any,
    }),

    actions: {
        edit(newLogin: string) {
            localStorage.setItem('userLogin', newLogin);
            this.userLogin = newLogin;
        }
    }
});