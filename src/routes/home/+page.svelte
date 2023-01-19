<script lang="ts">
	import { fly } from "svelte/transition";
    import {cubicInOut} from "svelte/easing";
</script>


<h1 class="text-end text-[clamp(3.25rem,15vw,10rem)] leading-snug flex flex-col mt-[25vh]" in:fly={{x:-250, duration: 750, easing: cubicInOut}}>
    <span>Welcome to</span>
    <span class="gradient-heading" in:fly={{delay: 100, x: -250, duration: 1000}}>Subjective</span>
</h1>