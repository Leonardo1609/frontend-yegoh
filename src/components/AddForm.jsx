import React from 'react'
import { useForm } from '../hooks/useForm'
import { useContext } from 'react';
import { UserContext } from '../context/User/userContext';
import { useEffect } from 'react';
import { AlertContext } from '../context/Alert/alertContext';
import { SearchUser } from './SearchUser';

export const AddForm = () => {

    const [ formValues, handleInputChange, setValues, reset ] = useForm({
        names: '',
        lastnames: '',
        email: '',
        password: '',
        state: ''
    });
    
    const { names, lastnames, email, password, state } = formValues;
    const { addUser, userselected, modifyUser, getUsers } = useContext( UserContext );
    const { setAlert } = useContext( AlertContext );
    
    const handleSubmit = e => {
        e.preventDefault();
        if ( names.trim() === '' || lastnames.trim() === '' || email.trim() === '' || password.trim() === '' || state === '' ){
            const alert = {
                message: 'Ingrese todos los campos',
                classes: 'alert-danger'
            };
            setAlert( alert );
            return;
        }
        if( userselected ){
            const alert = {
                message: 'Usuario Modificado',
                classes: 'alert-success'
            };
            modifyUser( formValues, userselected._id )
                .then( res => {
                    if( res === 'modified' ){
                        setAlert( alert )
                        reset();
                        getUsers();
                    }
                });
        } else {
            const alert = {
                message: 'Usuario Registrado',
                classes: 'alert-success'
            };
           
            addUser( formValues )
                .then( res => {
                    if( res === 'inserted' ){
                        setAlert( alert );
                        reset();
                        getUsers();
                    }

                });
        }

    };

    useEffect(() => {
        if( userselected ){
            setValues({
                names: userselected.names,
                lastnames: userselected.lastnames,
                email: userselected.email,
                password: '',
                state: userselected.state
            })
        }
        // eslint-disable-next-line
    }, [ userselected ])
    return (
        <>
            <div className="row">
                <div className="col d-flex justify-content-between align-items-center">
                    <button 
                        className="btn btn-info"
                        onClick= { getUsers }
                    >Limpiar filtros de búsqueda</button>
                    <SearchUser />
                </div>
            </div>
                <h1 
                    className="text-center mt-4"
                >
                    { userselected ? 'Editar Usuario' : 'Agregar usuario' }
                </h1>
            <hr/>
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <label htmlFor="names">Nombres</label>
                    <input 
                        type="text" 
                        name="names" 
                        id="names" 
                        className="form-control"
                        onChange={ handleInputChange }
                        value={ names }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastnames">Apellidos</label>
                    <input 
                        type="text" 
                        name="lastnames" 
                        id="lastnames" 
                        className="form-control"
                        onChange={ handleInputChange }
                        value={ lastnames }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="form-control"
                        onChange={ handleInputChange }
                        value={ email }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        className="form-control"
                        onChange={ handleInputChange }
                        value={ password }
                    />
                </div>
                <label>Estado</label>
                <select 
                    onChange={ handleInputChange } 
                    name="state" 
                    className="custom-select"
                    value={ state }
                >
                    <option defaultValue>--Selecciona--</option>
                    <option value="0">Eliminado</option>
                    <option value="1">Bloqueado</option>
                    <option value="2">Activo</option>
                </select>

                <div className="form-group">
                    <button type="submit" className="mt-3 btn btn-primary btn-block">
                        { userselected ? 'Guardar' : 'Agregar' }
                    </button>
                </div>
            </form>
        </>
    )
}
