
import { createSelector } from "@ngrx/store";
import { Action } from "../actions";
import { USER_ADD, USER_DELETE, USER_LIST_ERROR, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_UPDATE } from "../actions/user-action";
import { User } from "../models/user";
import { StoreUtility } from "../utils/store-utils";

export interface UserReducerState {

    loading: boolean;
    loaded: boolean;
    error: boolean;
    // users: User[];

    entities: { [id: number]: User };
    ids: number[];



}


const initialState: UserReducerState = {

    loading: false,
    loaded: false,
    error: false,
    // users: []

    entities: {},
    ids: []
}


export function UserReducer(state = initialState, action: Action): UserReducerState {
    console.warn("////////////////////////", action)
    switch (action.type) {
        case USER_LIST_REQUEST: {
            return { ...state, loading: true };
        }
        case USER_LIST_SUCCESS: {

            // const updatedUsers = state.users.concat(action.payload.data);

            // return {...state , loading : false , loaded : true , users : updatedUsers , error : false};

            const users = action.payload.data;

            const obj = StoreUtility.normalize(users);

            const newEntities = { ...state.entities, ...obj };


            const ids = users.map((user: any) => user.id)

            const newIds = StoreUtility.filterDuplicateIds([...state.ids, ...ids]);

            return { ...state, ...{ loading: false, loaded: true, entities: newEntities, ids: newIds } }
        }
        case USER_LIST_ERROR: {
            return { ...state, error: true, loading: false };
        }
        case USER_DELETE: {
            // const users = state.users.filter((data)=> data.id !== action.payload.id)
            // return {...state , ...{users}}

            const id = action.payload.id;
            const newIds = state.ids.filter(elem => elem! == id);
            const newEntities = StoreUtility.removeKey(state.entities, id) // will remove this id from entites
            return { ...state, ...{ entities: newEntities, ids: newIds } }
        }
        case USER_UPDATE: {
            //    const users = state.users.filter((data)=> data.id !== action.payload.data.id);
            //    const updatedUser = users.concat(action.payload.data);

            //    return {...state , ...{users :  updatedUser}}


            const user = action.payload.data;

            const entity = { [user.id]: user };

            const updatedEntities = { ...state.entities, ...entity };

            return { ...state, ...{ entities: updatedEntities } };


        }
        case USER_ADD: {

            // const users = state.users.concat(action.payload.data);

            // return {...state , ...{users} }


            const user = action.payload.data;

            const entity = { [user.id]: user };

            const newEntities = { ...state.entities, ...entity };

            const newIds = StoreUtility.filterDuplicateIds([...state.ids, user.id])


            return { ...state, ...{ entities: newEntities, ids: newIds } };
        }
        default: {
            return state;
        }
    }




}


//selectors

export const getLoading = (state: UserReducerState) => state.loading;

export const getLoaded = (state: UserReducerState) => state.loaded;

// export const getUsers = (state: UserReducerState) => state.users;

export const getError = (state: UserReducerState) => state.error;



export const getEntities = (state: UserReducerState) => state.entities;

export const getIds = (state: UserReducerState) => state.ids;

export const getUsers = createSelector(getEntities,
  (entities) => StoreUtility.unNormalized(entities));