<script lang="ts">
	import { fade, fly } from "svelte/transition";
    import {cubicInOut} from "svelte/easing";
</script>


<div class="flex justify-evenly flex-col lg:flex-row gap-12 lg:gap-0 items-center">
    <div class="flex flex-col items-center gap-10">
        <h1 class="text-center text-[clamp(3.25rem,15vw,8rem)] font-bold drop-shadow-2xl leading-snug flex flex-col" in:fly={{x:-250, duration: 750, easing: cubicInOut}}>
            <span class="whitespace-nowrap">Welcome to</span>
            <span class="gradient-heading" in:fly={{delay: 100, x: -250, duration: 1000}}>Subjective</span>
        </h1>
        <p class="text-center font-semibold max-w-[65ch]" in:fade={{delay: 500, duration: 1000}}>
            Subjective provides some of the best quality clothing for the lowest price possible, we accomplish this by taking a different approach in this hot industry, stop wanting change, BE the difference.
        </p>
    </div>

    <figure class="relative w-[clamp(20rem,35vw,35rem)] aspect-square" in:fade={{delay: 100, duration: 1000}}>
        <section class="absolute w-full aspect-square rounded-full bg-gradient-to-r from-secondary-500 to-primary-500 blur-[96px] custom-pulse"></section>
        <lottie-player src="https://assets6.lottiefiles.com/private_files/lf30_esg1l8r1.json"  speed="0.25" loop  autoplay></lottie-player>
    </figure>
</div>

