import { $, $$, fetchAPI } from "./utils.js";

class Board {
    async init () {
        this.getElement();
        await this.getBoardData();
        this.container.innerHTML = this.makeList();
        this.attachEvent();
    }

    getElement() {
        this.userId = $('#userId').value;
        this.container = $('.container');
    }

    async getBoardData() {
        const result = await fetchAPI(`/board/${this.userId}`, 'GET');
        if (result.status == 'SUCCESS') this.data = result.data;
        this.listData = {};
        Object.values(this.data).forEach((data) => {
           if (!this.listData[data.LIST_idx]) this.listData[data.LIST_idx] = [];
           this.listData[data.LIST_idx].push(data);
        });
    }

    attachEvent() {
        this.adds = $$('.list-add');
        this.addHandler = this.addItem.bind(this);
        this.adds.forEach((add) => add.addEventListener('click', this.addHandler))
    }

    makeList() {
        return Object.keys(this.listData).reduce((acc, data) => {
            return acc + `<div class="list" data-listidx="${this.listData[data][0].LIST_idx}">
                <div class="list-header">
                    <div class="list-cnt">${this.listData[data].length}</div>
                    <div class="list-title">${this.listData[data][0].LIST_title}</div>
                    <img class="list-add" src="/images/add.png">
                </div>
                <div class="list-body">
                    ${this.listData[data].reduce((acc, cur) => {
                            return acc + `<div class="item">${cur.ITEM_title}</div>`;
                        }, '')
                    }</div>
                </div>`
        }, '')
    }

    addItem(e) {
        this.add = e.target;
        this.add.removeEventListener('click', this.addHandler);
        this.list = this.add.parentNode.parentNode;
        this.listIdx = this.list.dataset.listidx;
        this.listBody = this.list.lastElementChild;
        this.listBody.prepend(this.makeItem());
        this.attachEventAfterClickAddBtn();
    }

    makeItem() {
        this.itemContainer = document.createElement('div');
        this.textArea = document.createElement('textarea');
        this.textArea.maxLength = 500;
        this.itemContainer.appendChild(this.textArea);
        this.itemButtons = document.createElement('div');
        this.itemButtons.className = 'item-buttons';
        this.addButton = document.createElement('div');
        this.addButton.className = 'item-add';
        this.addButton.innerText = 'Add';
        this.itemButtons.appendChild(this.addButton);
        this.cancelButton = document.createElement('div');
        this.cancelButton.className = 'item-cancel';
        this.cancelButton.innerText = 'Cancel';
        this.itemButtons.appendChild(this.cancelButton);
        this.itemContainer.appendChild(this.itemButtons);
        return this.itemContainer;
    }

    attachEventAfterClickAddBtn() {
        this.addItemCancelHandler = this.addItemCancel.bind(this);
        this.addItemCompleteHandler = this.addItemComplete.bind(this);
        this.textArea.addEventListener('focus', this.resizeHeight);
        this.textArea.addEventListener('keydown', this.resizeHeight);
        this.textArea.addEventListener('keyup', this.resizeHeight);
        this.cancelButton.addEventListener('click', this.addItemCancelHandler);
        this.addButton.addEventListener('click', this.addItemCompleteHandler);
    }

    async addItemComplete(e) {
        this.textArea = e.target.parentNode.parentNode.firstElementChild;
        if (!this.textArea.textLength) return this.textArea.focus();
        this.value = this.textArea.value.split('.');
        let [ title, ...content ] = this.value;
        content = content.join(".");
        const res = await fetchAPI('/board/item', 'POST', { list_idx: this.listIdx, data: [{ title: title, content: content }]});
        if (res.status == "SUCCESS") location.reload();
    }

    addItemCancel(e) {
        e.target.parentNode.parentNode.remove();
        this.add.addEventListener('click', this.addHandler);
    }

    resizeHeight(e) {
        e.target.style.height = "1px";
        e.target.style.height = `${18 + e.target.scrollHeight}px`;
    }
}

const board = new Board();
window.addEventListener('DOMContentLoaded', board.init());