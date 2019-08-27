export class User {

    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
        ) {}

    public get token(): string {
        if (this._tokenExpirationDate && new Date() < this._tokenExpirationDate) {
            return this._token;
        }
        return null;
    }

    public get tokenExpirationDate(): Date {
        return this._tokenExpirationDate;
    }

}
