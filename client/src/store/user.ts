import { defineStore } from 'pinia';

export const useUserStore = defineStore({

    id: 'user',

    state: () => ({
        user: {
            login: localStorage.getItem('userLogin') ? localStorage.getItem('userLogin') : ''   as any,
            id   : localStorage.getItem('userId')    ? localStorage.getItem('userId')    : null as any
        }
    }),

    actions: {
        edit(newLogin: string, newId: number) {
            localStorage.setItem('userLogin', newLogin);
            localStorage.setItem('userId',    newId.toString());
            this.user.login = newLogin;
            this.user.id    = newId;
        }
    }
});