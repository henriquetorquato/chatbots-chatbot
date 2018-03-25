import Constants from './constants'

interface IToken {
	bearer: string
	expires: Date
}

export default class Token {

	public bearer: string

	private basic: string
	private login: string
	private expires: Date

	constructor(login: string, password: string) {
		this.login = login
		this.basic = this.generateBasic(login, password)
	}

	private generateBasic = (login: string, password: string): string => {
		return btoa(`${login}:${password}`)
	}

	public get = (callback): void => {

		const url = Constants.BLIP_TOKEN_URL.replace(/\%s/g, this.login)

		fetch(url, {
			method: 'POST',
			headers: {
				'Authorization': `Basic ${this.basic}`
			}
		})
		.then(r => r.json())
		.then(data => {

			this.bearer = data['token']
			this.expires = new Date(data['expires'])

			callback(!data['message'])

		})
		.catch(err => {
			callback(false)
		})

	}

	public isValid = (): boolean => {
		return (new Date) > this.expires
	}

}
