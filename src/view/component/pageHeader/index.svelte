<script lang="ts">
    import Picture from '../../../assets/3x4.jpg';
    import TopBar from './TopBar.svelte';
    import { scrolling } from './ScrollAction';
    import { crossfade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    
    export let scrollYCond = (n: number) => n > 0;

    let height = window.innerHeight;
    let width = window.innerWidth;
    let midWidth: number;
    let midHeight: number;
    
    midWidth = width / 2;
    midHeight = height / 2;

    $: midWidth = width / 2;
    $: midHeight = height / 2;

    let centerImageDivStyle: string;

    centerImageDivStyle = `z-index: 1;left: ${midWidth}px; top: ${midHeight}px;`;
    $: centerImageDivStyle = `
        z-index: 1;
        left: ${midWidth}px;
        top: ${midHeight}px;
        transform: translate(-50%, -50%);
    `;

    export let centerImageDivProps = {
        class: "absolute-position",
        style: centerImageDivStyle
    };

    $: centerImageDivProps = {
        ...centerImageDivProps,
        style: centerImageDivStyle
    };

    export let topBarProps = {
        height: '200px'
    };

    export let bigBalloonHeight = '500px';
    export let smallBalloonHeight = '100px';

    export let crossfadeKey = { key: 0 };

    let userAtTop = true;

    let setUserNotAtTop = () => userAtTop = false;
    let setUserAtTop = () => userAtTop = true;

    export let rootDivProps = {
        class: "full-width flex",
    };

    export let transitionDuration = 200;
    export let easing = cubicOut;
    let [send, receive] = crossfade({
        duration: d => d,
        fallback: () => {
            return {
                duration: transitionDuration,
                easing,
                css: () => ''
            }
        }
    });
</script>

<style>
    .fill-parent {
        width: 100%;
        height: 100%;
    }

    .fill-width {
        width: 100%;
    }

    .flex {
        display: flex;
    }

    .flex-center {
        align-items: center;
        justify-content: center;
    }

    .align-center {
        align-items: center;
    }

    .justify-start {
        justify-content: start;
    }

    .completely-round {
        border-radius: 100%;
    }

    .image.top-bar {
        position: relative;
        left: 20px;
        top: 20px;
    }

    .absolute-position {
        position: absolute;
    }
</style>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />

<div
    use:scrolling="{scrollYCond}"
    on:hit="{setUserNotAtTop}"
    on:unhit="{setUserAtTop}"
    {...rootDivProps}
>
    {#if userAtTop}
        <div {...centerImageDivProps}>
            <img
                src="{Picture}"
                alt="My face"
                class="completely-round"
                style="height: {bigBalloonHeight};"
                out:send="{crossfadeKey}"
                in:receive="{crossfadeKey}"
            />
        </div>
    {/if}

    <TopBar {...topBarProps}>
        {#if !userAtTop}
            <img
                src="{Picture}"
                alt="My face again"
                class="completely-round image top-bar absolute-position"
                style="height: {smallBalloonHeight}"
                out:send="{crossfadeKey}"
                in:receive="{crossfadeKey}"
            >
        {/if}
    </TopBar>

    <div style="height: 10000px;"></div>
</div>
