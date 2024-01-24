import HttpClient from "../lib/Http.js";
import { settings } from "../utilities/config.js";

export default class UserManager {

    async getUsers() {

        try {
            const http = new HttpClient(`${settings.DB_USER_PATH}`);
            const result = http.get();
            return result;
        } catch (error) {
            throw new Error(error.message);
        }

    }

    async addNewUser(user) {

        const http = new HttpClient(`${settings.DB_USER_PATH}`);
        const result = http.add(user);
        return result;
    }

    // async loginUser() {

    //     try {
    //         const http = new HttpClient();
    //         const result = http.get(`${settings.DB_USER_PATH}`);
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }

    // }


    // async listMovies() {
    //     try {
    //         const http = new HttpClient();
    //         const result = await http.get('/movie/popular');

    //         // Loopa igenom resultatet och skapa ett nytt Movie object för varje film
    //         const movies = result.results.map(movie => {
    //             return new Movie(
    //                 movie.id,
    //                 movie.title,
    //                 movie.overview,
    //                 movie.release_date,
    //                 movie.poster_path
    //             );
    //         })

    //         return movies;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

}