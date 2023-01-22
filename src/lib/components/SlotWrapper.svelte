<script lang="ts">
	import { onMount } from "svelte";
    let mounted: boolean = false;
    onMount(() => mounted = true);
</script>


<div class="base-page-container">
    {#if mounted}
        <slot />
    {/if}
</div>
