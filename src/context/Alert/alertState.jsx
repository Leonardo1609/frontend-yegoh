import React, { useReducer } from 'react'
import { AlertContext } from './alertContext';
import { AlertReducer } from './alertReducer';

export const AlertState = props => {

    const initialState = {
        alert: null,
        showalert: false
    }

    const [ state, dispatch ] = useReducer( AlertReducer, initialState );
    const setAlert = ( alert ) => {
        dispatch({
            type: 'SHOW_ALERT',
            payload: alert
        });
        
        setTimeout(() => {
            dispatch({
                type: 'HIDE_ALERT',
                payload: alert
            });
        }, 4000 );
    }

    return (
        <AlertContext.Provider value={{
            alert: state.alert,
            showalert: state.alert,
            setAlert
        }}>
            { props.children }
        </AlertContext.Provider>
    )
}
