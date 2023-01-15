<script lang="ts">
	import { Drawer, drawerStore } from "@skeletonlabs/skeleton";
	function closeHamburger(): void {
		drawerStore.close();
	}
</script>

<Drawer class="md:hidden">
	<div class="h-[var(--header-height)] border-b-2 flex justify-between p-4">
		<h2>Subjective</h2>
        <button class="btn p-0" on:click={() => closeHamburger()}>
            <svg class="w-8 h-8" viewBox="0 0 100 100">
                <line stroke="currentColor" x1="10" y1="90" x2="90" y2="10" stroke-width="10" />
				<line stroke="currentColor" x1="10" y1="10" x2="90" y2="90" stroke-width="10" />
            </svg>
		</button>
	</div>	
</Drawer>