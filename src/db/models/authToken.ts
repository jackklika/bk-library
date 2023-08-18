export class AuthToken {
    /*
    Generated when a user authenticates
    */

    id: string
    otp_code: string
    expiry: Date
    retries: number // total amount of retries, decrements with each failed attempt

    user_id: string

    // todo: set a default organization
    constructor(id: string, otp_code: string, expiry: Date, retries: number, user_id: string) {
        this.id = id
        this.otp_code = otp_code
        this.expiry = expiry
        this.retries = retries

        this.user_id = user_id
    }
}