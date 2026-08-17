<script lang="ts">
    import { resolve } from "$app/paths";
    import Capsule from "$lib/Capsule.svelte";
    import {
        getAverageRating,
        getAverageFixedRating,
        getRatingClassFromReviews,
    } from "$lib/rating";

    const { data } = $props();

    let sorted = $derived.by(() => {
        const combined = data.combined;
        combined.sort(
            (a, b) => getAverageRating(b.reviews) - getAverageRating(a.reviews),
        );
        return combined;
    });
</script>

<div class="desktop">
    {#each sorted as combined}
        <a class="flyout" href={resolve(`/games/${combined.meta.id}`)}>
            {#if combined.meta.tags.includes("editors_pick")}
                <span class="editors-pick">⭐</span>
            {/if}
            <Capsule name={combined.meta.name} src={combined.meta.capsule} />
            <div class="flyout-container">
                <span class="flyout-title">{combined.meta.name}</span>
                <div
                    class="rating centerhack {getRatingClassFromReviews(
                        combined.reviews,
                    )}"
                >
                    {getAverageFixedRating(combined.reviews)}
                </div>
            </div>
        </a>
    {/each}
</div>

<div class="mobile">
    {#each sorted as combined}
        <table>
            <tbody>
                <tr>
                    <td>
                        <a href={resolve(`/games/${combined.meta.id}`)}>
                            <Capsule
                                name={combined.meta.name}
                                src={combined.meta.capsule}
                            />
                            {#if combined.meta.tags.includes("editors_pick")}
                                <span class="editors-pick">⭐</span>
                            {/if}
                        </a>
                    </td>
                    <td class="meta-cell">
                        <div class="title">{combined.meta.name}</div>
                        <div
                            class="rating {getRatingClassFromReviews(
                                combined.reviews,
                            )}"
                        >
                            {getAverageFixedRating(combined.reviews)}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    {/each}
</div>

<style>
    table {
        border-collapse: collapse;
        margin: 16px;
    }

    table td {
        vertical-align: top;
    }

    .desktop a :global(.capsule) {
        box-shadow: none;
    }

    a {
        display: block;
        position: relative;
        text-decoration: none;
        margin: 16px;
        box-shadow: 0px 6px 10px #131313;
        transition-property: transform, filter, box-shadow;
        transition-duration: 0.8s;
        transition-timing-function: cubic-bezier(0.04, 1, 0.37, 0.97);
    }

    a:hover,
    a:focus {
        z-index: 1;
        box-shadow: 0px 12px 20px #131313;
        transform: perspective(5cm) translate3d(0, 0, 10px)
            rotate3d(1, 0, 0, 2deg);
        filter: brightness(1.1);
    }

    .centerhack {
        margin: auto;
    }

    .editors-pick {
        position: absolute;
        top: -32px;
        left: -16px;
        font-size: 32px;
    }

    .desktop {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        justify-items: center;
    }

    .mobile {
        display: none;
    }

    @media (max-width: 1200px) {
        .desktop {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    @media (max-width: 1000px) {
        .desktop {
            display: none;
        }

        .mobile {
            display: block;
        }

        a {
            margin: 0;
        }

        a :global(.capsule) {
            width: 120px;
            height: 180px;
            margin: 0;
        }

        .editors-pick {
            top: -16px;
            left: -8px;
            font-size: 16px;
        }
    }

    .flyout-title {
        font-weight: 700;
    }

    .title {
        font-weight: 800;
        font-size: 20px;
    }

    .meta-cell {
        width: 100%;
        padding-left: 16px;
    }

    .flyout .flyout-container {
        visibility: hidden;
        position: absolute;
        top: 0px;
        transition-property: top;
        transition-duration: 0.2s;
        transition-timing-function: cubic-bezier(0.04, 1, 0.37, 0.97);
    }

    .flyout:hover .flyout-container,
    .flyout:focus .flyout-container {
        visibility: visible;
        top: 270px;
        left: 0;
        right: 0;
        text-decoration: none;
        color: #ffffff;
        background: linear-gradient(#2a3850, #344a4d);
        z-index: -1;
        text-align: center;
        border-radius: 0px 0px 0.25rem 0.25rem;
        padding: 8px 4px 8px 4px;
    }

    .flyout:hover :global(.capsule) {
        border-radius: 0.25rem 0.25rem 0px 0px;
    }
</style>
