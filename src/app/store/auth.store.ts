import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';


export type User={
    userId:number|string;emailId:string;token:string;refreshToken:string
}
export interface AuthState {
    isAuthenticated: boolean;
    user: User|null;
    isloading: boolean;
    token: string;
}

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    isloading: false,
    token: ''
}

export const AuthStore = signalStore(
{providedIn: 'root'},
    withState<AuthState>(initialState),
     withMethods((store) => ({
    login(data: User) {
      patchState(store,{user:data,isAuthenticated:true,isloading:false,token:data.token});
    },
    setLoading(data: boolean) {
      patchState(store,{isloading:data});
    },
    logout() {
      patchState(store,{user:null,isAuthenticated:false,isloading:false,token:''});
    },

  }))
)
