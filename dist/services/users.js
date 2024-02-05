var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addData, fetchData } from "../utilities/Http.js";
export function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield fetchData('users/');
        return result;
    });
}
export function getSingleUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield fetchData('users', `id=${userId}`);
        if (Array.isArray(result) && result.length > 0) {
            return result[0];
        }
        return null;
    });
}
export function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield fetchData('users', `email=${email}`);
        if (Array.isArray(result) && result.length > 0) {
            return true;
        }
        else {
            return false;
        }
    });
}
export function registerUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
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
            };
            const result = yield addData('users', registerData);
            if (result) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    });
}
