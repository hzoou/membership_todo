import { $, fetchAPI } from "./utils.js";

const signup = {
    validation: { id: false, pw: false },

    init() {
        this.form = $('form');
        this.id = $('#id');
        this.pw = $('#pw');
        this.pw2 = $('#pw2');
        this.submitBtn = $('#button');
        this.attachEvent();
    },

    attachEvent() {
        this.id.addEventListener("blur", this.checkId.bind(this));
        this.pw2.addEventListener("keyup", this.checkPw.bind(this));
        this.pw2.addEventListener("keydown", this.checkPw.bind(this));
        this.submitBtn.addEventListener("click", this.signIn.bind(this));
    },

    async checkId (e) {
        if (!e.target.value) return;
        this.res = await fetchAPI(`api/signup/${this.id.value}`, 'GET');
        this.errDiv = e.target.parentNode.nextElementSibling;
        if (this.res.status == 'FAIL') { this.validation.id = false; this.errDiv.style.display = 'block'; }
        else { this.validation.id = true; this.errDiv.style.display = 'none'; }

    },

    checkPw(e) {
        if (!e.target.value) { this.validation.pw = false; return; }
        this.errDiv = e.target.parentNode.nextElementSibling;
        if (this.pw.value != this.pw2.value) { this.validation.pw = false; this.errDiv.style.display = 'block'; }
        else { this.validation.pw = true; this.errDiv.style.display = 'none'; }
    },

    async signIn() {
        this.element = Object.values(this.validation).indexOf(false);
        if (this.element != -1) return (this.element) ? this.pw2.focus() : this.id.focus();
        this.form.submit();
    }
};

window.addEventListener('DOMContentLoaded', signup.init());