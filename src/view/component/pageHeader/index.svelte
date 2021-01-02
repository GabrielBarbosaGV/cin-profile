<script lang="ts">
    import Picture from '../../../assets/3x4.jpg';
    import TopBar from './TopBar.svelte';
    import { scrolling } from './ScrollAction';
    import { fade, crossfade } from 'svelte/transition';
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
        height: '180px'
    };

    export let bigBalloonHeight = '500px';

    interface SmallBalloonProps {
        height: string,
        left: string,
        top: string
    }

    export let smallBalloonProps: SmallBalloonProps = {
        height: '160px',
        left: '30px',
        top: '80px'
    };

    export let crossfadeKey = { key: 0 };

    let userAtTop = true;

    let setUserNotAtTop = () => userAtTop = false;
    let setUserAtTop = () => userAtTop = true;

    export let rootDivProps = {
        class: "full-width flex",
    };

    export let transitionDuration = 200;
    export let easing = cubicOut;
    export let distDurationFunc = (d: number) => d * 3;
    let [send, receive] = crossfade({
        duration: distDurationFunc,
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

    .invisible-occupies-space {
        visibility: hidden;
    }
</style>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />

<div
    use:scrolling="{scrollYCond}"
    on:hit="{setUserNotAtTop}"
    on:unhit="{setUserAtTop}"
    style="margin-top: 0px;margin-left: 0px;margin-right: 0px;"
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

    {#if !userAtTop}
        <div
            class="fill-parent flex flex-center"
            class:invisible-occupies-space="{userAtTop}"
            transition:fade
        >
            <TopBar {...topBarProps}>
                <img
                    src="{Picture}"
                    alt="My face again"
                    class="completely-round image top-bar absolute-position"
                    style="height: {smallBalloonProps.height};left: {smallBalloonProps.left};top: {smallBalloonProps.top};"
                    out:send="{crossfadeKey}"
                    in:receive="{crossfadeKey}"
                >
            </TopBar>
        </div>
    {/if}

    <div style="height: 10000px;"></div>
</div>
