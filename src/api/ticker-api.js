import { BaseApi } from './base-api'

class TickerApi extends BaseApi {
	constructor() {
		super()
		this.key = '44648235fcd6051ea31752dbf730e73f442a00755e29416ec6f9052fa9b177e2'
	}
	async getAllTickersTitles() {
		const r = (await this.axios.get('/data/all/coinlist?summary=true')).data.Data
		const allTickersTitles = []
		for (let i in r) {
			allTickersTitles.push(i.toLowerCase())
		}
		return allTickersTitles
	}
	async addTickerItem(title) {
		const url = `data/price?tsyms=usd&fsym=${title}&api_key=${this.key}`
		return (await this.axios.get(url)).data
	}
}

export const tickerApi = new TickerApi()
