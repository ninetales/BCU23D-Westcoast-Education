export const setCopyrightDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const copyrightYearElement = document.querySelector('#copyright-date');
    if (copyrightYearElement) {
        copyrightYearElement.innerText = year.toString();
    }
};
