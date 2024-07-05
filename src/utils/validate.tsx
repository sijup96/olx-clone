interface Validate {
    email: string,
    password: string
}

export const checkValidData = ({ email, password }: Validate): string[] => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const error=[]
    if (!isEmailValid) error.push("email");
    if (!isPasswordValid) error.push("password");
    return error;
};
