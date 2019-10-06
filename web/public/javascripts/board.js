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
        this.boardId = $('#boardId').value;
        this.container = $('.container');
    }

    async getBoardData() {
        const res = await fetchAPI(`/api/board/${this.boardId}`, 'GET');
        if (res.status == 'FAIL') { alert(res.message); return self.location.href = '/'; }
        this.data = res.data;
        if (res.authentic) this.authentic = true;
        if (this.boardId === this.userId) this.authentic = true;
        this.listData = {};
        Object.values(this.data).forEach((data) => {
           if (!this.listData[data.LIST_idx]) this.listData[data.LIST_idx] = [];
           this.listData[data.LIST_idx].push(data);
        });
    }

    attachEvent() {
        this.adds = $$('.list-add');
        this.addHandler = this.addItem.bind(this);
        this.adds.forEach((add) => add.addEventListener('click', this.addHandler));
        this.removes = $$('.item-remove');
        this.removeHandler = this.removeItemHandler.bind(this);
        this.removes.forEach((remove) => remove.addEventListener('click', this.removeHandler));

    }

    makeList() {
        return Object.keys(this.listData).reduce((acc, data) => {
            return acc + `<div class="list" data-listidx="${this.listData[data][0].LIST_idx}">
                    <div class="list-header">
                        <div class="list-cnt">${(this.listData[data][0].ITEM_idx) ? this.listData[data].length : 0}</div>
                        <div class="list-title">${this.listData[data][0].LIST_title}</div>
                        ${ (this.authentic) ? '<img class="list-add" src="/images/add.png"><img class="list-remove" src="/images/add.png">' : '' }
                    </div>
                    <div class="list-body">
                        ${this.listData[data].reduce((acc, cur) => {
                                if (cur.ITEM_idx) return acc + `<div class="item" data-itemidx="${cur.ITEM_idx}">${ (this.authentic) ? '<div class="item-remove">&times;</div>' : '' }<div class="item-title">${cur.ITEM_title}</div></div>`;
                                return acc;
                            }, '')}
                    </div>
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
        this.textArea.placeholder = "Enter a note";
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
        const res = await fetchAPI('/api/board/item', 'POST', { list_idx: this.listIdx, data: [{ title: this.textArea.value }]});
        if (res.status == "SUCCESS") return location.reload();
        alert(res.message);
    }

    addItemCancel(e) {
        e.target.parentNode.parentNode.remove();
        this.add.addEventListener('click', this.addHandler);
    }

    resizeHeight(e) {
        e.target.style.height = "1px";
        e.target.style.height = `${18 + e.target.scrollHeight}px`;
    }

    async removeItemHandler(e) {
        this.remove = e.target;
        this.remove.removeEventListener('click', this.removeHandler);
        this.itemIdx = this.remove.parentNode.dataset.itemidx;
        this.confirm = confirm('선택하신 아이템을 삭제하시겠습니까?');
        if (!this.confirm) return;
        const res = await fetchAPI('/api/board/item', 'DELETE', { item_idx: this.itemIdx });
        if (res.status == "SUCCESS") return location.reload();
        alert(res.message);
    }
}

const board = new Board();
window.addEventListener('DOMContentLoaded', board.init());