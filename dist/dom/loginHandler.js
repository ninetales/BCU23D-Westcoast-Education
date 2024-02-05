/**
 * Login Handler
 */
const loginHandler = () => {
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }
};
document.addEventListener('DOMContentLoaded', loginHandler);
export { loginHandler };
