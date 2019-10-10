import { $, fetchAPI } from "../utils.js";

class Modal {
    constructor(list, title, target, userId, boardIdx) {
        this.userId = userId;
        this.boardIdx = boardIdx;
        this.list = list;
        this.title = title;
        this.idx = Object.values(target.dataset)[0];
        this.modalContainer = $('.modal');
        this.modalContainer.innerHTML = this.render();
        this.modalContainer.style.visibility = 'visible';
        this.modalContainer.style.opacity = 1;
        this.init();
    }

    render() {
        return `<div class="modal-container">
                    <div class="modal-title"><div>${(this.list) ? `Edit ${this.title}` : 'Edit item'}<span class="modal-close">&times;</span></div></div>
                    <div class="modal-content">
                        <div class="modal-type">${(this.list) ? 'List title' : 'Item title'}</div>
                        <textarea ${(this.list) ? 'style="resize: none; white-space: nowrap;" maxLength="50"' : 'maxLength="500"'}>${this.title}</textarea>
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
        this.modalContainer.style.visibility = 'hidden';
        this.modalContainer.style.opacity = 0;
    }

    checkTextareaValue() {
        if (!this.textarea.value) this.submit.setAttribute('disabled', true);
        else this.submit.removeAttribute('disabled');
    }

    async clickSubmitButton() {
        if (this.title == this.textarea.value) return alert('변경된 사항이 없습니다.');
        const data = { user_id: this.userId, idx: this.idx, board_idx: this.boardIdx, item_idx: this.idx, title: this.textarea.value, source: null, target: null, action: 1 };
        const res = await fetchAPI(`/api/board/${(this.list) ? 'list' : 'item'}`, 'PUT', { data: data });
        if (res.status == 'SUCCESS') return window.location.reload();
        alert(res.message);
    }
}

export default Modal;