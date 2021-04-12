import { mails } from "../config/config";
import nodemailer from "nodemailer";

export class CokyMail {

    // Configuración transportador NodeMailer
    private static transporter = nodemailer.createTransport(mails.transporter);
    private mail!: MailI;

    public from: string = mails.transporter.auth.user;
    public to: string = mails.transporter.auth.user;
    public cc: string = "";
    public cco: string = "";
    public subject: string = "";
    public message: string = "Contact";

    constructor(_to: string = mails.transporter.auth.user, _subject: string = "Wellcome", _message: string = "We received your message.", _cc: string = "", _cco: string = "") {
        this.to = _to;
        this.cc = _cc;
        this.cco = _cco;
        this.subject = _subject;
        this.message = _message;

    }

    async send() {
        console.log(this);
        CokyMail.transporter.sendMail(this)
    }
}

export interface MailI {
    from?: string;
    to?: string;
    cc?: string;
    cco?: string;
    subject?: string;
    message?: string;
}