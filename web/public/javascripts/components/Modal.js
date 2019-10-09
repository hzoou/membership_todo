import { $, fetchAPI } from "../utils.js";

class Modal {
    constructor(list, title, target) {
        this.list = list;
        this.title = title;
        this.idx = Object.values(target.dataset).pop();
        this.modalContainer = $('.modal');
        this.modalContainer.innerHTML = this.render();
        this.modalContainer.style.display = 'block';
        this.init();
    }

    render() {
        return `<div class="modal-container">
                    <div class="modal-title"><div>${(this.list) ? `Edit ${this.title}` : 'Edit item'}</div><span class="modal-close">&times;</span></div>
                    <div class="modal-content">
                        <div class="modal-type">${(this.list) ? 'List title' : 'Item title'}</div>
                        <textarea ${(this.list) ? 'style="resize: none;" maxLength="50"' : 'maxLength="500"'}>${this.title}</textarea>
                        <button class="modal-submit">${(this.list) ? 'Update List' : 'Save item'}</button>
                    </div>
                </div>`;
    }

    init() {
        this.getElement();
        this.attachEvent();
    }

    getElement() {
        this.close = $('.modal-close');
        this.submit = $('.modal-submit');
        this.textarea = $('textarea');
    }

    attachEvent() {
        this.close.addEventListener('click', this.clickCloseButton.bind(this));
        this.submit.addEventListener('click', this.clickSubmitButton.bind(this));
        this.textarea.addEventListener('keydown', this.checkTextareaValue.bind(this));
        this.textarea.addEventListener('keyup', this.checkTextareaValue.bind(this));
    }

    clickCloseButton() {
        this.modalContainer.innerHTML = '';
        this.modalContainer.style.display = "none";
    }

    checkTextareaValue() {
        if (!this.textarea.value) this.submit.setAttribute('disabled', true);
        else this.submit.removeAttribute('disabled');
    }

    async clickSubmitButton() {
        const res = await fetchAPI(`/api/board/${(this.list) ? 'list' : 'item'}`, 'PUT', { title: this.textarea.value, idx: this.idx });
        if (res.status == 'SUCCESS') return window.location.reload();
        alert(res.message);
    }
}

export default Modal;