export interface Headers {
	"Ifunny-Project-Id": string;
	Authorization: string;
	"User-Agent": string;
	applicationstate: number;
	accept: string;
	"accept-language": string;
	"accept-encoding": string;
}

export interface ClientOptions {
	credentialPath: string;
	user_agent?: string;
	bearer?: string;
	basic?: string;
	email?: string;
	password?: string;
}
