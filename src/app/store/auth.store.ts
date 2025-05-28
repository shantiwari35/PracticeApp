import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';



export interface AuthState {
    isAuthenticated: boolean;
    user: {
    userId:number|string;emailId:string;token:string;refreshToken:string
    }|null;
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
  //    withMethods((state, update) => ({
  //   login(data: {
  //     userId: number | string;
  //     emailId: string;
  //     token: string;
  //     refreshToken: string;
  //   }) {
  //     update((state) => ({
  //       user: {...data},
  //       isAuthenticated: true,
  //       isloading: false,
  //       token: data.token
  //     }));
  //   },

  //   logout() {
  //     update(() => ({
  //       user: null,
  //       isAuthenticated: false,
  //       isloading: false,
  //       token: ''
  //     }));
  //   },

  //   updateState(data: Partial<AuthState>) {
  //     update((prev) => ({ ...prev, ...data }));
  //   }
  // }))
)
