import Permission from "./components/Permission.js";

const container = document.querySelector('.content-container');
const nav = document.querySelectorAll('.nav-item > a');

const renderHtml = (page) => {
    container.innerHTML = page.render();
    page.init();
};

const routes = {
    'board': () => {
        document.querySelector('.active').classList.remove('active');
        nav[0].classList.add('active');
        renderHtml(new Permission('board'));
    },
    'my': () => {
        document.querySelector('.active').classList.remove('active');
        nav[1].classList.add('active');
        renderHtml(new Permission('my'));
    }
};

const router = () => {
    const hash = location.hash.replace('#', '');
    routes[hash]();
};

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);