import axios from 'axios'

export class BaseApi {
	constructor() {
		this.axios = axios.create({
			baseURL: 'https://min-api.cryptocompare.com'
		})
	}
}
