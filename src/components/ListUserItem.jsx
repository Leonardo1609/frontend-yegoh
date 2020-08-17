import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/User/userContext'

export const ListUserItem = ({ user, i }) => {

    const { selectUser } = useContext( UserContext ); 

    return (
        <tr>
            <th scope="row">{ i + 1 }</th>
            <td>{ user.names }</td>
            <td>{ user.lastnames }</td>
            <td>{ user.email }</td>
            <td>
            { user.state === 0 
                ? 'Eliminado' 
                : ( user.state === 1 
                    ? 'Bloqueado' 
                    : 'Activo' ) 
            }
            </td>
            <td>{ user.createdAt.slice( 0, 10 ) }</td>
            <td>{ user.updatedAt && user.updatedAt.slice( 0, 10 ) }</td>
            <td>
                <button
                    onClick={ () => { selectUser(user) } }
                    className="btn btn-primary"
                >
                    Editar
                </button>
            </td>
        </tr>
    )
}
