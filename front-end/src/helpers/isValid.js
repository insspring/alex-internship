export const isValid = (value, name, repeatPassword) => {
    if(name === 'name') {
        const regex = /[A-Z]/g;
        const found = value.match(regex);
        if (found) {
            return true;
        }
        return false;
    } else if (name === 'email') {
        const regex = /@./gi;
        const found = value.match(regex);
        if (found) {
            return true;
        }
        return false;
    } else if (name === 'password') {
        if (value.length > 3) {
            return true;
        }
        return false;
    } else if (name === 'repeatPassword') {
        if (value === repeatPassword) {
            return true;
        }
        return false;
    }
};