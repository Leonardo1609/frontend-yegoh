import React, { useReducer } from 'react'
import { UserContext } from './userContext';
import axios  from 'axios';
import { UserReducer } from './userReducer'
import { useContext } from 'react';
import { AlertContext } from '../Alert/alertContext';

export const UserState = props => {

    const initialState = {
        users: [],
        userselected: null,
        usersfound: []
    }

    const [ state, dispatch ] = useReducer( UserReducer, initialState );

    const { setAlert } = useContext( AlertContext );

    const addUser = async ( data ) => {
        try {
            const result = await axios.post( 'http://0.0.0.0:80/api/users', data );
            dispatch({
                type: 'ADD_USER',
                payload: result.data
            })

            return 'inserted';
        } catch (error) {
            const alert = {
                message: error.response.data.msg,
                classes: 'alert-danger'
            }

            setAlert( alert );
        }
    }

    const getUsers = async () => {
        try {
            const result = await axios.get( 'http://0.0.0.0:80/api/users' );
            dispatch({
                type:'GET_USERS',
                payload: result.data
            })

        } catch (error) {
            console.log( error.response );
        }
    }

    const selectUser = ( user ) => {
        dispatch({
            type: 'SELECT_USER',
            payload: user
        })
    }

    const modifyUser = async ( data, id ) => {
        try {
            const result = await axios.post( `http://0.0.0.0:80/api/users/modify/${ id }`, data );
            dispatch({
                type: 'USER_MODIFY',
                payload: result.data
            });

            return 'modified';
        } catch (error) {
            const alert = {
                message: error.response.data.msg,
                classes: 'alert-danger'
            }
            setAlert( alert );
        }   
    }

    const setUsers = ( text ) => {
        dispatch({
            type: 'SEARCH_USER',
            payload: text
        })
    }
    return (
        <UserContext.Provider
            value = {{
                users: state.users,
                userselected: state.userselected,
                usersfound: state.usersfound,
                addUser,
                getUsers,
                selectUser,
                modifyUser,
                setUsers
            }}
        >
            { props.children }
        </UserContext.Provider>
    )
}
