import { EventEmitter } from "events"
import axios, { Axios, AxiosInstance } from "axios"
import { Headers, ClientOptions } from "../Types/Client"
import crypto from "crypto"

export class Client extends EventEmitter {

    private instance: AxiosInstance
    public credentialPath: string
    public basic?: string
    public bearer?: string

    constructor(opts: ClientOptions) {
        super()
        
        this.instance = axios.create({
            baseURL: `https://${this.api}/v4`,
            headers: {}
        })

        this.credentialPath = opts.credentialPath
    }


    get headers(): Headers {
        return { "Ifunny-Project-Id": "iFunny", "Authorization":  }
    }

    get basicToken(): string {
        if (this.basic) {
            return this.basic
        } else {
            let hex = crypto.randomBytes(32).toString("hex").toUpperCase()
            let a = hex + "_MsOIJ39Q28:"
            let b = hex + ":MsOIJ39Q28:PTDc3H8a)Vi=UYap"
            let c = crypto.createHash("sha1").update(b).digest("hex")
            this.basic = Buffer.from(a + c).toString("base64")
            return this.basic
        }
    }

    get request(): AxiosInstance {
        return this.instance
    }

    get api(): string {
        return "api.ifunny.mobi"
    }

    get chat_api(): string {
        return "chat.ifunny.co"
    }
}

export default Client
