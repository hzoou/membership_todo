import { $, fetchAPI } from "./utils.js";

class Board {
    async init () {
        this.getElement();
        await this.getBoardData();
        this.container.innerHTML = this.makeList();
    }

    getElement() {
        this.userId = $('#userId').value;
        this.container = $('.container')
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

    makeList() {
        return Object.keys(this.listData).reduce((acc, data) => {
            return acc + `<div class="list"><div class="list-header"><div class="list-cnt">${this.listData[data].length}</div><div class="list-title">${this.listData[data][0].LIST_title}</div></div>
                <div class="list-body">
                    ${this.listData[data].reduce((acc, cur) => {
                            return acc + `<div class="item">${cur.ITEM_title}</div>`;
                        }, '')
                    }</div>
                </div>`
        }, '')
    }
}

const board = new Board();
window.addEventListener('DOMContentLoaded', board.init());