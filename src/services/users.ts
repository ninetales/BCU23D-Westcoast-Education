import { User } from "../models/User.js";
import { addData, fetchData } from "../utilities/Http.js";

export async function getUsers(): Promise<User[]> { // Undersök det här med promise och interface
    const result = await fetchData('users/');
    return result as User[];
}

export async function getSingleUser(userId: number): Promise<User | null> { // Undersök det här med promise och interface
    const result = await fetchData('users', `id=${userId}`);

    if (Array.isArray(result) && result.length > 0) {
        return result[0] as User;
    }

    return null;
}

export async function getUserByEmail(email: string): Promise<boolean> {
    const result = await fetchData('users', `email=${email}`);
    if (Array.isArray(result) && result.length > 0) {
        return true;
    } else {
        return false;
    }
}

export async function registerUser(user: any): Promise<boolean | undefined> {

    try {
        const registerData = {
            role: "student",
            fname: user.firstname,
            lname: user.lastname,
            email: user.email,
            password: user.password,
            phone: user.phone,
            address: {
                city: user.city,
                postalCode: user.postalCode,
                street: user.street
            },
            accountState: {
                status: "active",
                date: new Date().toISOString().split('T')[0]
            }
        }

        const result = await addData('users', registerData);
        if (result) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}