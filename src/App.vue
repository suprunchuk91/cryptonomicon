<template>
<div class="container">
	<ticker-main></ticker-main>
</div>
</template>

<script>
import TickerMain from './components/ticker-main.vue'

export default {
	name: 'app',
	components: {
		TickerMain
	}
}
</script>

<style lang="scss">

</style>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'anonymous pro';
	color: #ffffff;
}

body {
	background-color: #2b3043;
}

input,
button {
	padding: 10px;
	border-radius: 5px;
	background-color: inherit;
}

button {
	border: none;
	cursor: pointer;
}

.container {
	max-width: 960px;
	margin: 0 auto;
}
</style>
