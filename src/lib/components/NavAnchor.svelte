<script lang="ts">
    import { page } from '$app/stores';
    export let location: string;

    $: href = "/" + location;
    $: active = $page.url.pathname === href;
</script>

<a href={href} class="capitalize" class:bg-opacity-10={active} class:bg-primary-500={active}>{location}</a>