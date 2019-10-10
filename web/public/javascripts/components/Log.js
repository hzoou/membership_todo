import { $, getTime, fetchAPI } from "../utils.js";

class Log {
    constructor(boardIdx) {
        this.boardIdx = boardIdx;
        this.log = $('.log');
        this.log.style.width = '380px';
        this.log.innerHTML = this.render();
        this.init();
    }

    render() {
        return `<div class="log-header">
                    <img src="/images/menu.svg">
                    <span class="log-title">menu</span>
                    <span class="log-close">&times;</span>
                </div>
                <div class="log-header">
                    <img src="/images/bell.svg">
                    <span class="log-title">Activity</span>
                </div>
                <div class="log-body">
                    <ul class="activities"></ul>
                </div>`
    }

    init() {
        this.getElement();
        this.attachEvent();
        this.getLogData();
    }

    async getLogData() {
        const res = await fetchAPI(`/api/board/log/${this.boardIdx}`, 'GET');
        this.data = res.data;
        this.ul.innerHTML = this.makeLog();
    }

    getElement() {
        this.open = $('.board-log');
        this.close = $('.log-close');
        this.ul = $('.activities');
    }

    attachEvent() {
        this.open.addEventListener('click', this.showLog.bind(this));
        this.close.addEventListener('click', this.hideLog.bind(this));
    }

    makeLog() {
        return Object.values(this.data).reduce((acc, cur) => {
            return acc + `<li class="activity">
                            <span class="log-content">
                                <a href="/board/${cur.user_id}">${cur.user_id}</a>
                                ${this.getType(cur.action)} 
                                <strong>${cur.item_title}</strong> 
                                ${(cur.source) ? `from <strong>${cur.source}</strong> ` : ''}
                                ${(cur.target) ? `to <strong>${cur.target}</strong>` : ''}
                            </span>
                            <span class="log-time">${getTime(cur.time)}</span>
                        </li>`;
        }, '');
    }

    getType(action) {
        let act = '';
        switch (action) {
            case 0: act = 'added'; break;
            case 1: act = 'updated'; break;
            case 2: act = 'moved'; break;
            case 3: act = 'removed'; break;
        }
        return act;
    }

    hideLog() {
        this.log.style.width = '0px';
    }

    showLog() {
        this.log.style.width = '380px';
    }
}

export default Log;