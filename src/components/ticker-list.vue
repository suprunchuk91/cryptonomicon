<template>
<div class="ticker-list">
	<ticker-item
	v-for="tickerItem in tickerList"
	:key="tickerItem.id"
	:tickerItem="tickerItem"
	@deleteTickerItem="deleteTickerItem"
	@updateCurrentTickerItem="updateCurrentTickerItem"
	:class="{
		active: tickerItem.id === currentTickerItem
	}"
	class="ticker-list__ticker-item"
	></ticker-item>
</div>
</template>

<script>
import TickerItem from './ticker-item.vue'

export default {
	name: 'ticker-list',
	components: {
		TickerItem
	},
	props: {
		tickerList: {
			type: Array
		}
	},
	data() {
		return {
			currentTickerItem: null
		}
	},
	methods: {
		deleteTickerItem(id) {
			this.$emit('deleteTickerItem', id)
		},
		updateCurrentTickerItem(id) {
			this.currentTickerItem = id
			this.$emit('updateCurrentTickerItem', id)
		}
	}
}
</script>

<style lang="scss" scoped>
.ticker-list {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;

	&__ticker-item {
		flex: 1;
		min-width: 220px;

		&.active {
			outline: 1px dashed #00f5ac;
		}
	}
}
</style>
