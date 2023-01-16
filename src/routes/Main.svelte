
<script lang="ts">
	import { page } from "$app/stores";
	import { ConicGradient, type ConicStop } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

    let mounted = false;
    onMount(() => {
        mounted = true;
    });

    const conicStops: ConicStop[] = [
        { color: 'transparent', start: 0, end: 25 },
        { color: 'grey', start: 75, end: 100 }
    ];
</script>

{#if mounted}
    {#key $page.route.id}
        <div in:fly={{x: 25, y: 50, duration: 500}}>
            <slot />  
        </div>
    {/key}
{:else}
    <ConicGradient class="mx-auto mt-[25vh]" stops={conicStops} spin={true} width="w-8" />
{/if}
