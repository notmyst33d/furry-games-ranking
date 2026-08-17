<script lang="ts">
    import { resolve } from "$app/paths";

    let { children } = $props();
</script>

<header>
    <a href={resolve("/")}>Furry Games Ranking</a>
</header>

<div class="content">
    {@render children()}
</div>

<style>
    @font-face {
        font-family: "Inter";
        src: url(/InterVariable.ttf);
    }

    :global(body) {
        color: #ffffff;
        background-color: #24282f;
        font-family: "Inter", sans-serif;
        margin: 0;
    }

    :global(*) {
        line-height: 1.5;
    }

    header {
        background-color: #171d25;
        height: 64px;
    }

    header a {
        color: #ffffff;
        font-size: 24px;
        font-weight: 700;
        text-decoration: none;
        line-height: 64px;
        margin-left: 16px;
    }

    :global(.rating) {
        width: fit-content;
        font-weight: 800;
        padding: 0.25rem 0.5rem 0.25rem 0.5rem;
        border-radius: 0.25rem;
    }

    :global(.content) {
        max-width: 1200px;
        margin: 32px auto 128px auto;
    }

    :global(.hidden-gem) {
        color: #000000;
        background-color: #c1ebf1;
    }

    :global(.absolute-cinema) {
        color: #000;
        background: #f0cd5a;
    }

    :global(.great) {
        color: #000000;
        background-color: #80e291;
    }

    :global(.mid) {
        color: #000000;
        background-color: #7ebdf1;
    }

    :global(.unplayable) {
        color: #000000;
        background-color: #ff7b7b;
    }

    :global(.coal) {
        color: #fff;
        background-color: #3a352e;
    }
</style>
