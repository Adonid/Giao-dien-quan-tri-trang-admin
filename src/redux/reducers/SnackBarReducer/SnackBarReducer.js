const dataSnackBar = {
    type    : "info",
    content : "Hello Word"
}

const SnackBarReducer = (state = dataSnackBar, actions) => {

    switch (actions.type) {
        case 'OPEN_SNACKBAR':
            state = actions.data;
            return state

        default:
            return state
    }
}

export default SnackBarReducer;