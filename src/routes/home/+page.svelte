<script lang="ts">
	import { fly } from "svelte/transition";
</script>

<div class="mt-[12.5vh]">
    <h1 class="text-end text-[clamp(3.25rem,15vw,10rem)] leading-snug flex flex-col" in:fly={{x:-250, duration: 750}}>
        <span>Welcome to</span>
        <span class="gradient-heading" in:fly={{delay: 100, x: -250, duration: 1000}}>Subjective</span>
    </h1>
</div>
