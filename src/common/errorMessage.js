function errorMessage(errorCode) {
    switch (errorCode) {
        case 'auth/email-already-exists':
            return 'Email already in use';
        case 'auth/invalid-password':
            return 'Invalid Password'
        case 'auth/wrong-password':
            return 'Wrong Password'
        case ' auth/internal-error':
            return 'Internal Error'
        case 'auth/user-not-found':
            return 'User not found'
        default:
            return 'network error'
    }
}

export default errorMessage;