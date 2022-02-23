<template>
<div
@click="updateCurrentTickerItem(tickerItem.id)"
class="ticker-item"
>
	<h4 class="ticker-item__title">{{ tickerItem.title }} - USD</h4>
	<p class="ticker-item__price">{{ tickerItem.USD }}</p>
	<button
	@click.stop="deleteTickerItem(tickerItem.id)"
	class="ticker-item__delete"
	>delete</button>
</div>
</template>

<script>
export default {
	name: 'ticker-item',
	props: {
		tickerItem: {
			type: Object
		}
	},
	methods: {
		deleteTickerItem(id) {
			this.$emit('deleteTickerItem', id)
		},
		updateCurrentTickerItem(id) {
			this.$emit('updateCurrentTickerItem', id)
		}
	}
}
</script>

<style lang="scss" scoped>
.ticker-item {
	border: 1px solid #ffffff;
	padding: 10px;
	text-align: center;
	border-radius: 5px;

	&__title {
		margin-bottom: 10px;
	}

	&__price {
		margin-bottom: 20px;
	}

	&__delete {
		background-color: #dd1e3d;
	}
}
</style>
