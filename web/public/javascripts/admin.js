import { $, $$, fetchAPI } from "./utils.js";

class Admin {
    async init () {
        await this.getUserData();
        this.tbody = $('tbody');
        this.tbody.innerHTML = this.makeUserTable();
        this.getElement();
        this.attachEvent();
    }

    getElement() {
        this.edits = $$('.edit');
        this.removes = $$('.remove');
    }

    async getUserData() {
        const result = await fetchAPI('/admin/user', 'GET');
        if (result.status == 'SUCCESS') this.data = result.data;
    }

    attachEvent() {
        this.editHandler = this.editRow.bind(this);
        this.edits.forEach((e) => e.addEventListener('click', this.editHandler));
        this.removeHandler = this.removeRow.bind(this);
        this.removes.forEach((e) => e.addEventListener('click', this.removeHandler));
    }

    makeUserTable() {
        return Object.values(this.data).reduce((acc, cur) => {
            return acc + `
                <tr>
                    <td>${cur.idx}</td>
                    <td>${cur.id}</td>
                    <td><input type="checkbox" ${cur.admin ? "checked=1" : ""} disabled="disabled"></td>
                    <td><img src="../../images/edit.png" class="edit"></td>
                    <td><img src="../../images/remove.png" class="remove"></td>
                </tr>`}, '');
    }

    occurredEvent(target) {
        this.selectedRow = target.parentNode.parentNode;
        this.selectedColumns = this.selectedRow.children;
        this.userIdx = this.selectedColumns[0].textContent;
    }

    editRow(e) {
        this.occurredEvent(e.target);
        this.edit = e.target;
        this.edit.src = "../../images/check.png";
        this.edit.removeEventListener('click', this.editHandler);
        this.admin = this.selectedColumns[2].firstElementChild;
        this.checked = this.admin.checked;
        this.admin.removeAttribute('disabled');
        this.edit.addEventListener('click', this.editComplete.bind(this));
    }

    async editComplete() {
        if (this.checked == this.admin.checked) return alert('변경된 사항이 없습니다.');
        this.confirm = confirm('수정하시겠습니까?');
        if (!this.confirm) return;
        const res = await fetchAPI(`/admin/user/${this.userIdx}`, 'PUT', { admin: this.admin.checked});
        if (res.status == 'SUCCESS') return location.reload();
        alert(res.message);
    }

    async removeRow(e) {
        this.occurredEvent(e.target);
        this.confirm = confirm('삭제하시겠습니까?');
        if (!this.confirm) return;
        const res = await fetchAPI(`/admin/user/${this.userIdx}`, 'DELETE');
        if (res.status == 'SUCCESS') return location.reload();
        alert(res.message);
    }
}

const admin = new Admin();
window.addEventListener('DOMContentLoaded', admin.init());