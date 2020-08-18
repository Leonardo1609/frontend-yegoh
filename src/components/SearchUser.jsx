import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/User/userContext';
import { useForm } from '../hooks/useForm';
import { AlertContext } from '../context/Alert/alertContext';
import { useEffect } from 'react';
import { useRef } from 'react';

export const SearchUser = () => {
    
    const isSearched = useRef( false );
    const [ { search }, handleInputChange, , reset ] = useForm({ search: '' })
    const { setUsers, usersfound } = useContext( UserContext );
    const { setAlert } = useContext( AlertContext );

    const handleSubmit = e => {
        e.preventDefault();
        
        if( search.trim() !== '' ){
            setUsers( search );
        }
        
        isSearched.current = true;

        reset();
    }

    useEffect( () => {
        if( isSearched.current ){
            let alert;
            if( usersfound.length === 0 ){
                alert = {
                    message: 'No se encontró ningún usuario',
                    classes: 'alert-danger'
                }
            } else {
                alert = {
                    message: `${ usersfound.length } usuario(s) encontrado(s)`,
                    classes: 'alert-success'
                }
            }
            setAlert( alert );

            isSearched.current = false;
        }
        // eslint-disable-next-line
    }, [ usersfound ]);

    return (
        <div>
            <form onSubmit={ handleSubmit } className="d-flex">
                <input 
                    placeholder="Buscar..."
                    className="form-control"
                    type="text"
                    name="search"
                    value={ search }
                    onChange={ handleInputChange }
                />
                <button 
                    className="btn btn-primary"
                    type="submit"
                >
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </form>
        </div>
    )
}