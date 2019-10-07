import { $, $$, fetchAPI } from "../utils.js";

class Permission {
    constructor(api) {
        this.api = api;
        this.board = (this.api == 'board') ? true : false;
    }

    render() {
        return `${(this.board) ? '<img class="add" src="/images/add.png">' : ''}
                <table id="data">
                    <thead><tr class="column"><th>id</th><th>authentic</th>${ (this.board) ? '<th>edit</th><th>remove</th>' : ''}</tr></thead>
                    <tbody></tbody>
                </table>`;
    }

    async init () {
        await this.getPermissionData();
        this.tbody = $('tbody');
        this.tbody.innerHTML = this.makeMyBoardTable();
        this.getElement();
        if (this.board) this.attachEvent();
    }

    getElement() {
        this.add = $('.add');
        this.edits = $$('.edit');
        this.removes = $$('.remove');
    }

    async getPermissionData() {
        const res = await fetchAPI(`/api/mypage/permission/${this.api}`, 'GET');
        if (res.status == 'SUCCESS') { this.data = res.data; this.userList = res.userList; this.user = res.user_id; this.boardIdx = res.board_idx }
        this.permittedUser = [];
        Object.values(this.data).forEach((d) => this.permittedUser.push(d.id));
    }

    attachEvent() {
        this.addHandler = this.addPermission.bind(this);
        this.add.addEventListener('click', this.addHandler);
        this.editHandler = this.editPermission.bind(this);
        this.edits.forEach((e) => e.addEventListener('click', this.editHandler));
        this.removeHandler = this.deletePermission.bind(this);
        this.removes.forEach((e) => e.addEventListener('click', this.removeHandler));
    }

    makeMyBoardTable() {
        return Object.values(this.data).reduce((acc, cur) => {
            return acc + `
                <tr>
                    <td>${(this.board) ? `${cur.id}` : `<a href="/board/${cur.id}">${cur.id}</a>`}</td>
                    <td>                
                        ${(this.board) ? `<label><input type="radio" name="${cur.id}" value="0" disabled="disabled" ${(!cur.authentic) ? 'checked="checked"' : ''}>Read Only</label>
                                        <label><input type="radio" name="${cur.id}" value="1" disabled="disabled" ${(cur.authentic) ? 'checked="checked"' : ''}>All</label>` 
                                        : `${(cur.authentic) ? 'All' : 'Read Only'}`}
                    </td>
                    ${ (this.board) ? '<td><img src="../../images/edit.png" class="edit"></td><td><img src="../../images/remove.png" class="remove"></td>' : ''}
                </tr>`}, '');
    }

    addPermission() {
        this.add.removeEventListener('click', this.addHandler);
        this.tbody = $('tbody');
        this.tr = document.createElement('tr');
        this.tr.className = 'newRow';
        this.makeAddRow();
        this.tbody.prepend(this.tr);
        this.addRow = $('.add-row');
        this.removeRow = $('.remove-row');
        this.attachEventToNewRow();
    }

    attachEventToNewRow() {
        $('.userList').addEventListener('click', (e) => $('.search').value = e.target.textContent);
        this.addRowHandler = this.addNewRow.bind(this);
        $('.search').addEventListener('keyup', this.searchUser);
        this.addRow.addEventListener('click', this.addRowHandler);
        this.removeRow.addEventListener('click', this.removeNewRow.bind(this));
    }

    makeAddRow() {
        this.appendSearchBar();
        this.appendRadio();
        this.appendComplete();
        this.appendRemove();
    }

    appendSearchBar() {
        this.td = document.createElement('td');
        this.td.innerHTML = `<input type="text" class="search" name="userId">
                            <ul class="userList">${this.userList.reduce((acc, cur) => { return acc + `<li>${cur.id}</li>` }, '')}</ul>`;
        this.tr.appendChild(this.td);
    }

    appendRadio() {
        this.td = document.createElement('td');
        this.td.innerHTML = `<label><input type="radio" name="authentic" value="0" checked="checked">Read Only</label>
                            <label><input type="radio" name="authentic" value="1">All</label>`;
        this.tr.appendChild(this.td);
    }

    appendComplete() {
        this.td = document.createElement('td');
        this.td.innerHTML = `<img src="../../images/check.png" class="add-row">`;
        this.tr.appendChild(this.td);
    }

    appendRemove() {
        this.td = document.createElement('td');
        this.td.innerHTML = `<img src="../../images/remove.png" class="remove-row">`;
        this.tr.appendChild(this.td);
    }

    async addNewRow() {
        this.addRow.removeEventListener('click', this.addRowHandler);
        this.newpermittedUser = $('.search').value;
        this.authentic = $(`input[name="authentic"]:checked`).value;
        if (!this.newpermittedUser) return alert('권한을 추가하고자하 하는 사용자의 아이디를 입력해주세요.');
        if (this.user == this.newpermittedUser) return alert('본인에 대한 권한은 추가할 수 없습니다.');
        if (this.permittedUser.includes(this.newpermittedUser)) return alert('이미 권한이 부여된 사용자입니다.');
        if (!Object.values(this.userList).map((c) => c.id).includes(this.newpermittedUser)) return alert('올바른 사용자가 아닙니다.');
        this.confirm = confirm('권한을 추가하시겠습니까?');
        if (!this.confirm) return;
        const res = await fetchAPI(`/api/mypage/permission/${this.api}`, 'POST', { id: this.newpermittedUser, boardIdx: this.boardIdx, authentic: this.authentic});
        if (res.status == 'SUCCESS') return location.reload();
        alert(res.message);
    }

    removeNewRow(e) {
        this.confirm = confirm('권한 부여를 취소하시겠습니까?');
        if (!this.confirm) return;
        e.target.parentNode.parentNode.remove();
        this.add.addEventListener('click', this.addHandler);
    }

    searchUser() {
        this.search = $(".search");
        const filter = this.search.value.toLowerCase();
        const ul = $(".userList");
        const li = ul.getElementsByTagName("li");
        Array.from(li).forEach((l) => {
            const txtValue = l.textContent || l.innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) l.style.display = "block";
            else l.style.display = "none";
            if (!filter) l.style.display = "none";
        });
    }

    occurredEvent(target) {
        this.selectedRow = target.parentNode.parentNode;
        this.selectedColumns = this.selectedRow.children;
        this.userId = this.selectedColumns[0].textContent;
    }

    editPermission(e) {
        this.occurredEvent(e.target);
        this.edit = e.target;
        this.edit.src = "../../images/check.png";
        this.edit.removeEventListener('click', this.editHandler);
        this.radios = $$(`input[name="${this.userId}"`);
        this.radio = $(`input[name="${this.userId}"]:checked`);
        this.authentic = this.radio.value;
        this.radios.forEach((radio) => radio.removeAttribute('disabled'));
        this.edit.addEventListener('click', this.editComplete.bind(this));
    }

    async editComplete() {
        this.radio = $(`input[name="${this.userId}"]:checked`);
        if (this.authentic == this.radio.value) return alert('변경된 사항이 없습니다.');
        this.confirm = confirm('권한을 수정하시겠습니까?');
        if (!this.confirm) return;
        const res = await fetchAPI(`/api/mypage/permission/${this.api}/${this.userId}`, 'PUT', { boardIdx: this.boardIdx, authentic: this.radio.value});
        if (res.status == 'SUCCESS') return location.reload();
        alert(res.message);
    }

    async deletePermission(e) {
        this.occurredEvent(e.target);
        this.confirm = confirm('권한을 삭제하시겠습니까?');
        if (!this.confirm) return;
        const res = await fetchAPI(`/api/mypage/permission/${this.api}/${this.userId}`, 'DELETE', { boardIdx: this.boardIdx });
        if (res.status == 'SUCCESS') return location.reload();
        alert(res.message);
    }
}

export default Permission;