<script lang="ts">
	import { fade, fly } from "svelte/transition";
    import {cubicInOut} from "svelte/easing";
</script>

<main class="flex justify-evenly flex-col lg:flex-row gap-12 lg:gap-0 items-center">
    <h1 class="text-center text-[clamp(3.25rem,11vw,10rem)] leading-snug flex flex-col" in:fly={{x:-250, duration: 750, easing: cubicInOut}}>
        <span class="break-normal">Welcome to</span>
        <span class="gradient-heading" in:fly={{delay: 100, x: -250, duration: 1000}}>Subjective</span>
    </h1>
    <figure class="relative w-[clamp(20rem,35vw,35rem)] aspect-square" in:fade={{delay: 100, duration: 1000}}>
        <section class="w-[clamp(20rem,35vw,35rem)] aspect-square rounded-full absolute bg-gradient-to-r from-secondary-500 to-primary-500 blur-[96px] custom-pulse"></section>
        <lottie-player src="https://assets6.lottiefiles.com/private_files/lf30_esg1l8r1.json"  speed="0.25" loop  autoplay></lottie-player>
    </figure>
</main>
