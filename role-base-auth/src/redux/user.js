export const addAction = (obj) => {
    return {
        type: 'ADD',
        payload: {
            id: obj.id,
            username: obj.username,
            password: obj.password,
        },
    }
}

export const readUser = () => {
    return {
        type: 'READ'
    }
}

export const removeUser = (obj) => {
    return {
        type: 'DELETE',
        payload: obj,
    }
}


const usersHandler = (state=[], action) => {
    switch(action.type){
        case 'ADD': {
            return [...state,
                {
                    id: action.payload.id,
                    username: action.payload.username,
                    password: action.payload.password,
                    permissions: {
                        SUPERUSER: false,
                        LOGIN: true,
                        EDITOR: false,
                        VIEWER: false,
                        DELETOR: false
                    }
                }];
            }

        case 'READ': {
            return state;
        }
        case 'DELETE': {
            let del = state.filter(user => action.payload !== user.username);
            return del;
        }
        default:
            return state;

    }
}

export default usersHandler;