<script>
    export let minHeight = window.innerHeight;
</script>

<style>
    .flex {
        display: flex;
    }

    .flex.column-direction {
        flex-direction: column;
    }

    .flex.align-center {
        align-items: center;
    }

    .full-width {
        width: 100%;
    }

    .width-97 {
        width: 97%;
    }

    p {
        text-align: center;
        color: rgb(0, 234, 242);
        font-size: 30px;
    }
</style>

<div class="flex column-direction align-center full-width" style="height: {minHeight}px;">
    <div class="flex column-direction align-center width-97">
        <p>
            Olá!
            <br>
            Apenas uma página :)
        </p>
    </div>
</div>
