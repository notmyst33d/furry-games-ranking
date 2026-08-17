<script lang="ts">
    const { name, src } = $props();
</script>

{#if typeof src !== "string" || src === ""}
    <div class="capsule">{name}</div>
{:else}
    <img {src} class="capsule" alt="{name} game capsule art" />
{/if}

<style>
    .capsule {
        display: block;
        background-color: #2a3850;
        width: 180px;
        height: 270px;
        box-shadow: 0px 6px 10px #131313;
        object-fit: cover;
        border-radius: 0.25em;
    }

    div.capsule {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #ffffff;
        background-color: #171d25;
        text-align: center;
        font-weight: 700;
        font-size: 24px;
    }
</style>
