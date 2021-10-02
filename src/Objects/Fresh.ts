import { EventEmitter } from "events"
import { Client } from "."
import { FreshOptions, Payload } from "../Types/Fresh"

export class Fresh extends EventEmitter {
    public update: boolean = false
    public payload: Payload
    public client: Client

    constructor(client: Client, opts: FreshOptions) {
        super()
        this.payload = opts.payload
        this.client = client
    }

    get fresh(): Fresh {
        this.update = true
        return this
    }

    get instance() {
        return this.client
    }
}
