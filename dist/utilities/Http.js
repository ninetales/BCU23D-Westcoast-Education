var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { settings } from "./state.js";
export function fetchData(endpoint, criteria) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let url = '';
            if (criteria) {
                url = `${settings.DB_BASE_URL_PATH}${endpoint}?${criteria}`;
            }
            else {
                url = `${settings.DB_BASE_URL_PATH}${endpoint}`;
            }
            const response = yield fetch(url);
            if (response.ok) {
                const data = yield response.json();
                return data;
            }
            else {
                throw new Error(`Det gick fel när vi skulle hämta data ${response.status} - ${response.statusText}`);
            }
        }
        catch (error) {
            // throw new Error(error.message);
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    });
}
export function addData(endpoint, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let url = `${settings.DB_BASE_URL_PATH}${endpoint}`;
            const response = yield fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const result = yield response.json();
                return result;
            }
            else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        }
        catch (error) {
            throw new Error(`An error ocurred in the add method: ${error}`);
        }
    });
}
