import { EventEmitter } from "events";
import axios, { AxiosInstance } from "axios";
import { Headers, ClientOptions } from "../Types/Client";
import crypto from "crypto";

export class Client extends EventEmitter {
	private instance: AxiosInstance;
	private user_agent: string;
	public credentialPath: string;
	public basic?: string;
	public bearer?: string;

	constructor(opts: ClientOptions) {
		super();

		/**
		 * Client's bearer token
		 */
		this.bearer = opts.bearer;

		/**
		 * iFunny Basic auth token
		 */
		this.basic = opts.basic;

		this.user_agent =
			opts.user_agent ||
			"iFunny/7.14.2(22213) Android/12 (samsung; SM-G996U; samsung)";

		this.instance = axios.create({
			baseURL: `https://${this.api}/v4`,
			headers: {
				"Ifunny-Project-Id": "iFunny",
				"User-Agent": this.user_agent,
				applicationstate: 1,
				accept: "application/json,image/jpeg,image/webp,video/mp4",
				"accept-language": "en-US",
				"accept-encoding": "gzip",
			},
		});

		this.credentialPath = opts.credentialPath;
	}

	get headers(): Headers {
		return {
			"Ifunny-Project-Id": "iFunny",
			"User-Agent": this.user_agent,
			Authorization: this.bearer
				? "Bearer " + this.bearer
				: "Basic " + this.basic,
			applicationstate: 1,
			accept: "application/json,image/jpeg,image/webp,video/mp4",
			"accept-language": "en-US",
			"accept-encoding": "gzip",
		};
	}

	/**
	 * Generates a basic auth token if one isn't stored
	 */
	get basicToken(): string {
		if (this.basic) return this.basic;

		let uuid = crypto.randomUUID().replace(/\-/g, "");
		let hex = crypto
			.createHash("sha256")
			.update(uuid)
			.digest("hex")
			.toUpperCase();
		let a = hex + "_MsOIJ39Q28:";
		let b = hex + ":MsOIJ39Q28:PTDc3H8a)Vi=UYap";
		let c = crypto.createHash("sha1").update(b).digest("hex");
		this.basic = Buffer.from(a + c).toString("base64");
		return this.basic;
	}

	/**
	 * Shortcut for `this.instance.request`
	 */
	get request(): AxiosInstance["request"] {
		return this.instance.request;
	}

	/**
	 * iFunny's Base API
	 */
	get api(): string {
		return "https://api.ifunny.mobi/v4";
	}

	/**
	 * iFunny's websocket url
	 */
	get chat_api(): string {
		return "wss://chat.ifunny.co/chat";
	}
}

export default Client;
