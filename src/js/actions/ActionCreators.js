export function LogIn(user) {
    console.log(user);
    return {
        type: 'LOGIN',
        data: user
    }
}