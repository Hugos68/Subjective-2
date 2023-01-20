<script lang="ts">
    import { page } from "$app/stores"
</script>

<div class="w-full h-full flex items-center">
    <h1 class="text-4xl text-center">{$page.status}</h1>
</div>