<template>
<form @submit.prevent>
	<div class="form__wrapper">
		<div class="form__wrapper__container1">
			<input
			v-model="title"
			type="text"
			id="title"
			>
			<button
			@click="addTickerItem(title)"
			>Add</button>
		</div>
		<div class="form__wrapper__container2">
			<input
			type="text"
			placeholder="search"
			:value="modelSearch"
			@input="updateModelSearch"
			>
			<drop-down-list
			v-model="dropDownValue"
			:options="options"
			></drop-down-list>
		</div>
	</div>
		<div
		class="suggestions"
		:class="{
			'mb-5': labelIsShow
		}"
		>
			<div
			v-for="suggestion in suggestions"
			:key="suggestion"
			class="suggestion"
			@click="addTickerItem(suggestion)"
			>{{ suggestion }}</div>
		</div>
	<label
	v-if="labelIsShow"
	for="title"
	>
		this ticker has already been added
	</label>
</form>
</template>

<script>
export default {
	name: 'ticker-form',
	props: {
		labelIsShow: {
			type: Boolean
		},
		suggestions: {
			type: Array
		},
		modelSearch: {
			type: String
		}
	},
	data() {
		return {
			title: '',
			options: [
				'descending sort',
				'ascending sort'
			],
			dropDownValue: 'sort'
		}
	},
	methods: {
		addTickerItem(title) {
			this.$emit('addTickerItem', title)
			this.title = ''
		},
		updateModelSearch(e) {
			this.$emit('update:modelSearch', e.target.value)
		}
	},
	watch: {
		title(value) {
			this.$emit('updateTitle', value)
		},
		dropDownValue(value) {
			this.$emit('updateDropDownValue', value)
		}
	}
}
</script>

<style lang="scss" scoped>
form {

	.suggestions {
		display: flex;
		column-gap: 5px;
		align-items: center;

		&.mb-5 {
			margin-bottom: 5px;
		}
	}

	.suggestion {
		cursor: pointer;
	}

	.form__wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 5px;

		&__container1,
		&__container2 {
			display: flex;
			align-items: center;
			column-gap: 10px;
		}
	}

	button {
		background-color: #00f5ac;
	}

	input {
		border: 1px solid #ffffff;

		&:focus {
			outline: 1px dashed #00f5ac;
		}
	}

	label {
		color: #dd1e3d;
		font-style: italic;
		display: block;
	}
}
</style>
