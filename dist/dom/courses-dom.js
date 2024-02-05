import { createDiv, createSpan, createIcon } from "./shared-dom.js";
export const courseCard = (course) => {
    const card = createDiv();
    card.classList.add('course-card');
    const imgCon = createDiv();
    imgCon.classList.add('course-card__img-con');
    const img = document.createElement('img');
    if (course.image.src) {
        img.src = course.image.src;
    }
    else {
        img.src = "/assets/images/courses/no-img.png";
    }
    img.alt = course.image.description;
    card.appendChild(imgCon);
    imgCon.appendChild(img);
    if (course.featured) {
        const featured = createDiv();
        featured.classList.add('course-card__featured');
        const featuredIcon = createIcon('iconoir-user-star');
        featured.appendChild(featuredIcon);
        featured.appendChild(createSpan('Featured'));
        imgCon.appendChild(featured);
    }
    const body = createDiv();
    body.classList.add('course-card__body');
    card.appendChild(body);
    const title = document.createElement('H4');
    title.textContent = course.courseTitle;
    body.appendChild(title);
    const shortDesc = document.createElement('p');
    shortDesc.textContent = course.description.short;
    body.appendChild(shortDesc);
    const footer = createDiv();
    footer.classList.add('course-card__footer');
    card.appendChild(footer);
    const viewMore = document.createElement('a');
    viewMore.textContent = 'View course';
    viewMore.setAttribute('href', `/src/pages/book.html?id=${course.id}`);
    viewMore.classList.add('course-card__view-more-link');
    footer.appendChild(viewMore);
    return card;
};
