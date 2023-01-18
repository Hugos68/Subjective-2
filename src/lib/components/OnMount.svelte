<script lang="ts">
	import { onMount } from "svelte";
    let mounted: boolean = false;
    onMount(() => mounted = true);
</script>

{#if mounted}
    <slot />
{/if}