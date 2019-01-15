export function LogIn(user) {
    return {
        type: 'LOGIN',
        data: user
    }
}

export function LogOut() {
    return {
        type: 'LOGOUT',
        data: null
    }
}

export function UnLogged() {
    return {
        type: 'UNLOGGED',
        data: null
    }
}