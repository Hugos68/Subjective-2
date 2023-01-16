<script lang="ts">
	import { Drawer, drawerStore, LightSwitch } from "@skeletonlabs/skeleton";
	function closeHamburger(): void {
		drawerStore.close();
	}
</script>

<Drawer class="md:hidden">
	<div class="flex flex-col h-screen items-end">
		<div class="h-[var(--header-height)] w-full border-b-2 border-surface-700-200-token flex justify-between items-center p-4">
			<h2>Subjective</h2>
			<button class="btn p-0" on:click={() => closeHamburger()}>
				<svg class="w-8 h-8" viewBox="0 0 100 100">
					<line stroke="currentColor" x1="10" y1="90" x2="90" y2="10" stroke-width="10" />
					<line stroke="currentColor" x1="10" y1="10" x2="90" y2="90" stroke-width="10" />
				</svg>
			</button>
		</div>
		<div class="w-full h-full flex flex-col p-4 justify-between items-end">
			<nav class="h-max flex flex-col">
				<a href="/home">home</a>
				<a href="/home">home</a>
				<a href="/home">home</a>
			</nav>
			<button class="w-full flex items-center justify-between">
				<p class="font-semibold">Theme:</p>
				<div>
					<LightSwitch />
				</div>
			</button>
		</div>
		<div class="h-[var(--header-height)] border-t-2 border-surface-700-200-token w-full flex justify-center items-center p-4">
			<p>© All Rights Reserved</p>
		</div>
	</div>
</Drawer>