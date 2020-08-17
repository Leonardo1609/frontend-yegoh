import React from 'react'
import { useContext } from 'react'
import { AlertContext } from '../context/Alert/alertContext'

export const Alert = () => {

    const { alert, showalert } = useContext( AlertContext ); 

    if ( !showalert ) return null;
    return (
        <div className= {`alert ${ alert.classes } text-center font-weight-bold text-uppercase`}>
           { alert.message }
        </div>
    )
}

