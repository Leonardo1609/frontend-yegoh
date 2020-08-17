export const AlertReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_ALERT':
            return {
                ...state,
                alert: action.payload,
                showalert: true
            }
        case 'HIDE_ALERT':
            return{
                ...state,
                alert: null,
                showalert: false
            }
        default:
            return state
    }
}