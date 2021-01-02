<script lang="ts">
    export let height: string? = '200px';
</script>

<style>
    .full-width {
        width: 100%;
    }

    .blue-background {
        background-color: #BAE3FF
    }
</style>

<div
    class="full-width blue-background"
    style="height: {height};"
>
    <slot></slot>
</div>
