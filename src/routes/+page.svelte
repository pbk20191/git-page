<script lang="ts">
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture >
				<source srcset="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX67hK2DA8b2tDOb7l3Epn-tWafszgyweXOw&s" type="image/jpeg"/>
				<!-- <source srcset={welcome} type="image/webp" /> -->

				<img src={welcomeFallback} alt="Welcome" />
			</picture>
		</span>

		<!-- 이럇샤이<br />마세 -->
	</h1>
	<h2>기능</h2>
	<ul>
		<li>png/jpeg => webp, avif, heic 인코더</li>
		<li>안드로이드 나인패치 이미지(.9.png) => iOS 나인패치 어셋팩 변환기 (WIP)</li>
	</ul>

	<!-- <Counter /> -->
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		/* position: absolute; */
		/* width: 100%; */
		/* height: 100%; */
		top: 0;
		display: block;
	}
</style>
