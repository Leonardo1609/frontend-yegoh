import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/User/userContext'
import { useEffect } from 'react';
import { ListUserItem } from './ListUserItem';

export const ListUsers = () => {

    const { getUsers, users, usersfound } = useContext( UserContext );

    useEffect( () => {
        getUsers();
        // eslint-disable-next-line
    }, []);
    if ( users.length === 0 ) return <p className="text-center font-weight-bold text-uppercase alert-info alert">Aún no hay usuarios registrados, por favor ingrese uno.</p>
    return (
        <div className="table-responsive">
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Email</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Creado en:</th>
                        <th scope="col">Modificado en:</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersfound.length > 0 
                        ?
                            usersfound.map( ( user, i ) => (
                                <ListUserItem 
                                    key={ user._id }
                                    user={ user } 
                                    i={i}
                                />
                            )) 
                        : 
                            users.map( ( user, i ) => (
                                <ListUserItem 
                                    key={ user._id }
                                    user={ user } 
                                    i={i}
                                />
                        )) 
                    }
                </tbody>
            </table>
        </div>
    )
}
