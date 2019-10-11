import { $, $$, fetchAPI } from "./utils.js";
import Modal from './components/Modal.js';
import Log from './components/Log.js';

class Board {
    async init () {
        this.pos = 5000000;
        this.getElement();
        await this.getBoardData();
        this.container.innerHTML = this.makeList();
        this.makeTitle();
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
        this.boardIdx = res.board_idx;
        if (res.authentic) this.authentic = true;
        if (this.boardId === this.userId) this.authentic = true;
        this.listData = {};
        Object.values(this.data).forEach((data) => {
           if (!this.listData[data.LIST_idx]) this.listData[data.LIST_idx] = [];
           this.listData[data.LIST_idx].push(data);
        });
    }

    makeTitle() {
        this.div = document.createElement('div');
        this.div.className = 'board-title';
        this.div.innerHTML = `Welcome to ${this.boardId}'s board!<img class="board-log" src="/images/menu.svg">`;
        this.container.before(this.div);
    }

    attachEvent() {
        this.adds = $$('.list-add');
        this.addHandler = this.addItem.bind(this);
        this.adds.forEach((add) => add.addEventListener('click', this.addHandler));
        this.removes = $$('.item-remove');
        this.removes.forEach((remove) => remove.addEventListener('click', this.removeItem.bind(this)));
        this.titles = $$('.list-title');
        if (this.authentic) this.titles.forEach((title) => title.addEventListener('dblclick', this.editList.bind(this)));
        this.items = $$('.item');
        if (this.authentic) this.items.forEach((item) => item.addEventListener('dblclick', this.editItem.bind(this)));
        this.makeLogHandler = this.makeLog.bind(this);
        this.log = $('.board-log');
        this.log.addEventListener('click', this.makeLogHandler);
        if (this.authentic) this.attachEventToDragAndDrop();
    }

    listBodyTemplate(cur) {
        return `<div class="item" draggable="true" data-itemidx="${cur.ITEM_idx}" data-pos="${cur.pos}">
              <img class="note-img" draggable="false" src="/images/note.png">
              <div class="item-title" draggable="false" >${cur.ITEM_title}</div>
              ${ (this.authentic) ? '<div class="item-remove" draggable="false" >&times;</div>' : '' }
          </div>`;
    }

    makeListBody(data) {
        const reducer = (acc, cur) => {
            if (cur.ITEM_idx) return acc + this.listBodyTemplate(cur);
            return acc;
        };
        return this.listData[data].reduce(reducer,'');
    }

    listTemplate(data) {
        return `<div class="list" data-listidx="${this.listData[data][0].LIST_idx}">
                  <div class="list-header">
                      <div class="list-cnt">${(this.listData[data][0].ITEM_idx) ? this.listData[data].length : 0}</div>
                      <div class="list-title">${this.listData[data][0].LIST_title}</div>
                      ${ (this.authentic) ? '<img class="list-add" src="/images/add.png"><img class="list-remove" src="/images/add.png">' : '' }
                  </div>
                  <div class="list-body">
                      ${this.makeListBody(data)}
                  </div>
              </div>`
    }

    makeList() {
        return Object.keys(this.listData).reduce((acc, data) => acc + this.listTemplate(data), '');
    }

    addItem(e) {
        this.add = e.target;
        this.add.removeEventListener('click', this.addHandler);
        this.list = this.add.parentNode.parentNode;
        this.listTitle = this.add.parentNode.querySelector('.list-title');
        this.listIdx = this.list.dataset.listidx;
        this.listBody = this.list.lastElementChild;
        this.listBody.prepend(this.makeItem());
        this.textArea.focus();
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
        this.itemPos = this.getAbsolutePos(e.target.parentNode.parentNode);
        this.textArea = e.target.parentNode.parentNode.firstElementChild;
        if (!this.textArea.textLength) return this.textArea.focus();
        this.value = this.textArea.value.split('.');
        const data = { user_id: this.userId, board_idx: this.boardIdx, list_idx: this.listIdx, title: this.textArea.value, source: null, pos: this.itemPos, target: this.listTitle.textContent, action: 0, adjust: this.isAdjusted };
        const res = await fetchAPI('/api/board/item', 'POST', { data: data});
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

    async removeItem(e) {
        this.remove = e.target;
        this.title = this.remove.parentNode.children[1].textContent;
        this.itemIdx = this.remove.parentNode.dataset.itemidx;
        this.confirm = confirm('선택하신 아이템을 삭제하시겠습니까?');
        if (!this.confirm) return;
        const data = { user_id: this.userId, board_idx: this.boardIdx, item_idx: this.itemIdx, title: this.title, source: null, target: null, action: 3 };
        const res = await fetchAPI('/api/board/item', 'DELETE', { data: data });
        if (res.status == "SUCCESS") return location.reload();
        alert(res.message);
    }

    editList(e) {
        new Modal(true, e.target.textContent, e.target.parentNode.parentNode, this.userId, this.boardIdx);
    }

    editItem(e) {
        new Modal(false, e.currentTarget.children[1].textContent, e.currentTarget, this.userId, this.boardIdx);
    }

    attachEventToDragAndDrop() {
        this.listBodys = $$('.list-body');
        this.dragOverHandler = this.dragItemOver.bind(this);
        this.dragEndHandler = this.dragItemEnd.bind(this);
        this.listBodys.forEach((listBody) => listBody.addEventListener('dragstart', this.dragItemStart.bind(this), false));
        this.listBodys.forEach((listBody) => listBody.addEventListener('dragover', this.dragOverHandler, false));
        this.listBodys.forEach((listBody) => listBody.addEventListener('dragend', this.dragEndHandler, false));
    }

    dragItemStart(e) {
        this.listHead = e.currentTarget.previousElementSibling;
        this.listTitle = this.listHead.children[1].textContent;
        this.listIdx = e.currentTarget.parentNode.dataset.listidx;
        this.listBody = e.currentTarget;
        this.item = e.target;
        this.dragEndHandler = this.dragItemEnd.bind(this);
        this.listBody.addEventListener('dragend', this.dragEndHandler, false);
        this.item.classList.add('ghost');
    }

    dragItemOver(e) {
        e.preventDefault();
        this.listBody = e.currentTarget;
        if (e.target.classList.contains('item')) this.listBody.insertBefore(this.item, e.target);
        if (e.target.classList.contains('list-body')) this.listBody.appendChild(this.item);
    }

    async dragItemEnd(e) {
        this.itemPos = this.getMovingPosition(e.target);
        e.preventDefault();
        e.target.classList.remove('ghost');
        if (this.listIdx == e.currentTarget.parentNode.dataset.listidx) {
            const data = { item_idx: this.itemIdx, pos: this.itemPos };
            const res = await fetchAPI('/api/board/item/move/same', 'PUT', { data: data });
            if (res.status == "SUCCESS") return location.reload();
            alert(res.message);
        } else {
            const data = { user_id: this.userId, board_idx: this.boardIdx, item_idx: this.itemIdx, title: e.target.querySelector('.item-title').textContent, source: this.listTitle, target: e.currentTarget.previousElementSibling.children[1].textContent, action: 2, pos: this.itemPos, list_idx: e.currentTarget.parentNode.dataset.listidx };
            const res = await fetchAPI('/api/board/item/move/other', 'PUT', { data: data });
            if (res.status == "SUCCESS") return location.reload();
            alert(res.message);
        }
    }

    getMovingPosition(target) {
        let pos = 0;
        this.prev = target.previousElementSibling;
        this.next = target.nextElementSibling;
        this.itemIdx = target.dataset.itemidx;
        if (this.prev && this.next) pos = (Number(this.prev.dataset.pos) + Number(this.next.dataset.pos)) / 2;
        else if (this.prev) pos = Number(this.prev.dataset.pos) + 1000;
        else if (this.next) pos = Number(this.next.dataset.pos) - 1000;
        else pos = this.pos;
        this.isAdjusted = (pos <= 5000);
        return pos;
    }

    makeLog() {
        new Log(this.boardIdx);
        this.log.removeEventListener('click', this.makeLogHandler);
    }

    getAbsolutePos(target) {
        let pos = 0;
        this.next = target.nextElementSibling;
        if (target.nextElementSibling) pos = this.next.dataset.pos / 2;
        else pos = this.pos;
        this.isAdjusted = (pos <= 5000);
        return pos;
    }
}

const board = new Board();
window.addEventListener('DOMContentLoaded', board.init());