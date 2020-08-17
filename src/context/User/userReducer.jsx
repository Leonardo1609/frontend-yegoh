export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload.users,
                usersfound: []
            }
        case 'ADD_USER':
            return {
                ...state,
                users: [ action.payload.user, ...state.users ]
            }
        case 'USER_MODIFY':
            return {
                ...state,
                users: state.users.map( user => {
                    if ( user._id === action.payload._id ){
                        return action.payload;
                    } else{
                        return user;
                    }
                }),
                userselected: null
            }
        case 'SELECT_USER':
            return{
                ...state,
                userselected: action.payload
            }
        case 'SEARCH_USER':
            return{
                ...state,
                usersfound: state.users.filter( user => {
                    // name
                    if( user.names.indexOf( action.payload ) >= 0){
                        return user;
                    }

                    // state
                    if( 'activo'.indexOf( action.payload.toLowerCase() ) >= 0 ){
                        return user.state === 2;
                    }

                    if( 'bloqueado'.indexOf( action.payload.toLowerCase() ) >= 0 ){
                        return user.state === 1;
                    }

                    if( 'eliminado'.indexOf( action.payload.toLowerCase() ) >= 0 ){
                        return user.state === 0;
                    }

                    // email
                    if( user.email.indexOf(action.payload) >= 0 ){
                        return user;
                    }
                })
            }
        default:
            return state
    }
}