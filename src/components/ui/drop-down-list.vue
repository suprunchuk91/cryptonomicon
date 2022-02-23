<template>
<div class="drop-down-list">
	<div
	@click="changeVisibility"
	class="drop-down-list__value"
	>{{ modelValue }}</div>
	<div
	v-if="visibility"
	class="drop-down-list__options"
	>
		<div
		v-for="option in options"
		:key="option"
		@click="onSelect(option)"
		class="drop-down-list__option"
		>{{ option }}</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'drop-down-list',
	props: {
		modelValue: {
			type: String
		},
		options: {
			type: Array
		}
	},
	data() {
		return {
			visibility: false
		}
	},
	methods: {
		changeVisibility() {
			this.visibility = !this.visibility
		},
		onSelect(value) {
			this.$emit('update:modelValue', value)
			this.changeVisibility()
		}
	}
}
</script>

<style lang="scss" scoped>
.drop-down-list {
	width: 200px;
	position: relative;
	user-select: none;

	&__options {
		width: 100%;
		position: absolute;
		margin-top: 5px;
	}

	&__value,
	&__options {
		border-radius: 5px;
		background-color: #9598a1;
	}

	&__value,
	&__option {
		text-align: center;
		padding: 10px 20px;
		cursor: pointer;
	}
}
</style>
