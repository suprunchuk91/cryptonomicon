<template>
<div class="ticker-main">
	<ticker-form
	@addTickerItem="addTickerItem"
	:labelIsShow="labelIsShow"
	:suggestions="suggestions"
	v-model:modelSearch="search"
	@updateTitle="updateTitle"
	@updateDropDownValue="updateDropDownValue"
	class="ticker-form"
	></ticker-form>
	<div class="buttons">
		<button
		v-if="currentPage > 1"
		@click="decrementCurrentPage"
		class="prevPage"
		>prev</button>
		<button
		v-if="currentPage < pages"
		@click="incrementCurrentPage"
		class="nextPage"
		>next</button>
	</div>
	<ticker-list
	v-if="tickerList.length > 0"
	:tickerList="sortedTickerList"
	@deleteTickerItem="deleteTickerItem"
	@updateCurrentTickerItem="updateCurrentTickerItem"
	></ticker-list>
</div>
</template>

<script>
import TickerList from './ticker-list.vue'
import TickerForm from './ticker-form.vue'
import { tickerApi } from '../api/ticker-api'

export default {
	name: 'ticker-main',
	components: {
		TickerList,
		TickerForm
	},
	data() {
		return {
			tickerList: [],
			title: '',
			suggestions: [],
			allTickersTitles: [],
			currentTickerItem: null,
			labelIsShow: false,
			dropDownValue: null,
			search: '',
			currentPage: 1,
			pages: null
		}
	},
	methods: {
		subscirbeToUpdate(tickerTitle, id) {
			setInterval(async () => {
				const update = await tickerApi.addTickerItem(tickerTitle)
				this.tickerList = this.tickerList.map(tickerItem => {
					if (tickerItem.id === id) {
						return {...update, title: tickerTitle, id}
					} else {
						return tickerItem
					}
				})
			}, 5000)
		},
		async addTickerItem(title) {
			if (this.tickerList.filter(tickerItem => {
				if (tickerItem.title.toLowerCase() === title.toLowerCase()) {
					return tickerItem
				}
			}).length !== 0) {
				this.labelIsShow = true
				return
			}
			this.labelIsShow = false
			const r = await tickerApi.addTickerItem(title)
			const id = Date.now()
			title = title.toUpperCase()
			this.tickerList.push({...r, title, id})
			this.pages = Math.ceil(this.tickerList.length / 4)
			localStorage.setItem('tickerList', JSON.stringify(this.tickerList))
			this.subscirbeToUpdate(title, id)
		},
		deleteTickerItem(id) {
			if (id === this.currentTickerItem) {
				this.currentTickerItem = null
			}
			this.tickerList = this.tickerList.filter(tickerItem => tickerItem.id !== id)
			this.pages = Math.ceil(this.tickerList.length / 4)
			localStorage.setItem('tickerList', JSON.stringify(this.tickerList))
		},
		updateCurrentTickerItem(id) {
			this.currentTickerItem = id
		},
		updateTitle(value) {
			this.title = value
		},
		updateDropDownValue(value) {
			this.dropDownValue = value
		},
		incrementCurrentPage() {
			this.currentPage = this.currentPage + 1
		},
		decrementCurrentPage() {
			this.currentPage = this.currentPage - 1
		}
	},
	async mounted() {
		this.allTickersTitles = await tickerApi.getAllTickersTitles()
		const tickerData = localStorage.getItem('tickerList')
		if (tickerData) {
			this.tickerList = JSON.parse(tickerData)
			this.pages = Math.ceil(this.tickerList.length / 4)
			this.tickerList.map(tickerItem => {
				this.subscirbeToUpdate(tickerItem.title, tickerItem.id)
			})
		}
	},
	computed: {
		sortedTickerList() {
			const start = 4 * (this.currentPage - 1)
			const end = 4 * this.currentPage
			const tickerList = this.tickerList.filter(tickerItem => tickerItem.title.toLowerCase().includes(this.search.toLowerCase()))
			this.pages = Math.max(tickerList.length / 4)
			return tickerList.slice(start, end)
		}
	},
	watch: {
		title(value) {
			if (value.trim().length === 0) {
				this.suggestions = []
				return
			}
			this.suggestions = []
			for (let i of this.allTickersTitles) {
				if (this.suggestions.length === 4) {
					break
				} else if (i.includes(value.toLowerCase())) {
					this.suggestions.push(i)
				}
			}
		},
		dropDownValue(value) {
			switch (value) {
				case 'descending sort': {
					if (this.tickerList.length > 1) {
						this.tickerList = this.tickerList.sort((a, b) => a.USD < b.USD ? 1 : -1)
						localStorage.setItem('tickerList', JSON.stringify(this.tickerList))
					}
					return
				}
				case 'ascending sort': {
					if (this.tickerList.length > 1) {
						this.tickerList = this.tickerList.sort((a, b) => a.USD > b.USD ? 1 : -1)
						localStorage.setItem('tickerList', JSON.stringify(this.tickerList))
					}
					return
				}
			}
		},
		search() {
			this.currentPage = 1
			this.pages
		}
	}
}
</script>

<style lang="scss" scoped>
.ticker-main {
	padding: 10px 0;
}

.ticker-form {
	margin-bottom: 5px;
}

.nextPage,
.prevPage {
	background-color: #00f5ac;
}

.buttons {
	display: flex;
	column-gap: 10px;
	justify-content: flex-end;
	margin-bottom: 10px;
}
</style>
