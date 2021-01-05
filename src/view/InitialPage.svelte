<script>
    import PageHeader from './component/pageHeader/index.svelte';
    import Body from './component/body/Body.svelte';

    let userAtTop = true;

    let height = window.innerHeight;
    let incrementedHeight = height * 1.1;
    $: incrementedHeight = height * 1.1;
</script>

<PageHeader bind:userAtTop={userAtTop} />

<svelte:window bind:innerHeight={height} />

{#if userAtTop}
    <div style="height: {incrementedHeight}px;" />
{:else}
    <Body minHeight="{incrementedHeight}"/>
{/if}
