<script lang="ts">
    import { page } from "$app/stores"
    let breadCrumbs: string[] = [];
    $: if ($page.route.id)  {
        // We do a substring here to remove the empty string from the start
        breadCrumbs = $page.route.id.substring(1).split('/');
    }

    const lastCrumb = (crumb: string): boolean => {
        return breadCrumbs.indexOf(crumb) === breadCrumbs.length-1;
    }
</script>


<ol class="breadcrumb">
    {#each breadCrumbs as crumb}
        <li class="crumb"><a href="/{crumb}" class="capitalize">{crumb}</a></li>
        {#if !lastCrumb(crumb)}
            <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        {/if}
    {/each}
</ol>

