import { $, fetchAPI } from "./utils.js";

class Admin {
    async init () {
        await this.getUserData();
        this.tbody = $('tbody');
        this.tbody.innerHTML = this.makeUserTable();
    }

    async getUserData() {
        const result = await fetchAPI('/admin/user', 'GET');
        if (result.status == 'SUCCESS') this.data = result.data;
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
}

const admin = new Admin();
window.addEventListener('DOMContentLoaded', admin.init());