export function LogIn(user) {
    return {
        type: 'LOGIN',
        data: user
    }
}
export function LogOut() {
    return {
        type: 'LOGOUT'
    }
}