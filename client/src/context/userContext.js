import { createContext, useEffect, useReducer } from "react";


export const Context = createContext();

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: false,
}
export const Reducer = (state, action)=>{
    switch(action.type){
        case 'LOGIN_REQUEST':
            return{
                user: null,
                loading: true,
                error: false,
            };
        case 'LOGIN_SUCCESS':
            return{
                user: action.payload,
                loading: false,
                error: false,
            };
            case 'LOGIN_REJECTED':
                return{
                    user: null,
                    loading: false,
                    error: true,
                };
            case 'LOGOUT':
                return{
                    user: null,
                    loading: false,
                    error: false,
                };
                default:
                    return state;
    }
}
export const ContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(Reducer, initialState);

    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(state.user))

    }, [state.user]);

    return(
        <Context.Provider
        value={{
            user: state.user,
            loading: state.loading,
            error: state.error,
            dispatch,
        }}
        >
            {children}
        </Context.Provider>
    )
    }