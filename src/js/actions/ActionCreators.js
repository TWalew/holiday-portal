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

export function GetUsers(users) {
    return {
        type: 'GETALLUSERS',
        data: users
    }
}

export function OnDayClicked(data) {
    return {
        type: 'ONDAYCLICKED',
        data: data
    }
}