<script>
    import Image from './assets/3x4.jpg';
    import Style from './style/first-page.css';
    console.log(`${Image}, ${Style}`);
</script>

<svelte:head>
    <link rel="stylesheet" href="{Style}" />
</svelte:head>

<div
    class="flex align-center justify-center column-direction"
    style="width: 100%; height: 100%;"
>
    <div class="flex">
        <h1>Hello There!</h1>
    </div>
    <div class="flex">
        <img src="{Image}" alt="a face..." />
    </div>
</div>
