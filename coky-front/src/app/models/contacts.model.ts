import { Model } from "../core/model";

export class Contact extends Model<ContactI> {



    set(json: ContactI): void {
        for (const key in json) {
            if (Object.prototype.hasOwnProperty.call(json, key)) {
                const value = json[key];
                this.setKeyValue(key, value);
            }
        }
    }

    setKeyValue(key: string, value: any) {
        if (!this.entity) {
            this.entity = new ContactI()
        }
        switch (key) {
            case "id":
                this.entity.id = value;
                break;
            case "full_name":
                this.entity.full_name = value;
                break;
            case "phone":
                this.entity.phone = value;
                break;
            case "email":
                this.entity.email = value;
                break;
            case "address":
                this.entity.address = value;
                break;
            case "message":
                this.entity.message = value;
                break;
            case "privacy_policy":
                this.entity.privacy_policy = value;
                break;
            case "send_promo":
                this.entity.send_promo = value;
                break;
            case "data":
                this.entity.data = value;
                break;
            case "status":
                this.entity.status = value;
                break;
            case "created":
                this.entity.created = value;
                break;
            case "modified":
                this.entity.modified = value;
                break;
            default:
                if (!this.entity.data) {
                    this.entity.data = {}
                }
                this.entity.data[key] = value;
                break;
        }
    }
}


export class ContactI {

    id: number = -1;
    full_name: string = "";
    phone: string = "";
    email: string = "";
    address: string = "";
    message: string = "";
    data: any = null;
    privacy_policy: number = 1;
    send_promo: number = 1;
    status: number = 1;
    created: Date = null;
    modified: Date = null;

}
