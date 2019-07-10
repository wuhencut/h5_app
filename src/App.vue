<template>
    <div id="app">
      <router-view />
    </div>
</template>
<script>
	export default {
		name: 'App',
	}
</script>
<style lang="less">
    body,
    html {
        height: 100%;
    }
    body {
        padding: 0;
        margin: 0;
        background-color: #fff;
    }
    #app {
        width: 100%;
        height: 100%;
    }
</style>
