<script lang="ts">
    import Capsule from "$lib/Capsule.svelte";
    import {
        getAverageFixedRating,
        getAverageRating,
        getRatingClassFromReviews,
        getRatingLabel,
        getRatingLabelClass,
        translateRatingLabel,
    } from "$lib/rating";

    let { data } = $props();
</script>

<table>
    <tbody>
        <tr>
            <td class="capsule-cell">
                <Capsule name={data.meta.name} src={data.meta.capsule} />
            </td>
            <td class="meta-cell">
                <div class="title">
                    {data.meta.name}
                    <img
                        class="engine-logo"
                        src="/{data.meta.engine}.png"
                        alt="Game engine logo"
                    />
                </div>
                <div>{data.meta.genre}</div>
                <div>
                    Average rating: <span
                        class="rating {getRatingClassFromReviews(data.reviews)}"
                    >
                        {getAverageFixedRating(data.reviews)}
                    </span>
                </div>
                <div class="chips">
                    {#if data.meta.tags.includes("editors_pick")}
                        <span class="chip">⭐ Editors Pick</span>
                    {/if}
                    {#each data.meta.warnings as warning}
                        <span class="chip warning">⚠️ {warning}</span>
                    {/each}
                </div>
                {#if typeof data.meta.url === "string" && data.meta.url !== ""}
                    <a class="official-page" href={data.meta.url}
                        >→ Go to official page</a
                    >
                {/if}
            </td>
        </tr>
    </tbody>
</table>

<hr />

{#if data.reviews.length === 0}
    <p class="review-counter">Looks like there is no reviews yet</p>
{:else}
    <p class="review-counter">{data.reviews.length} review(s)</p>
{/if}

{#each data.reviews as review}
    <div class="review">
        <div
            class="review-info {getRatingLabelClass(
                getRatingLabel(review.ratingOverall, review.labels),
            )}"
        >
            <div class="rating-label">
                {review.ratingOverall} - {translateRatingLabel(
                    getRatingLabel(review.ratingOverall, review.labels),
                )}
            </div>
            <div class="review-author">{review.author}</div>
            <div>{review.date.toISOString().split("T")[0]}</div>
        </div>
        <div class="review-content">
            {@html review.content}
        </div>
    </div>
{/each}

<style>
    .capsule-cell :global(.capsule) {
        width: 300px;
        height: 450px;
    }

    table {
        width: 100%;
    }

    .engine-logo {
        position: relative;
        top: 8px;
        width: 48px;
        height: 48px;
        object-fit: contain;
    }

    .capsule-cell {
        width: 300px;
    }

    .meta-cell {
        font-size: 32px;
        padding-left: 16px;
        width: 100%;
        vertical-align: top;
    }

    .title {
        max-width: 600px;
        font-weight: 800;
        font-size: 48px;
    }

    .chips {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        font-weight: 700;
        margin: 8px 0px 0px 0px;
        gap: 8px;
    }

    .official-page {
        display: block;
        width: fit-content;
        text-decoration: none;
        color: #ffffff;
        background-color: #3c5477;
        margin-top: 8px;
        font-weight: 700;
        padding: 0.25rem 0.5rem 0.25rem 0.5rem;
        border-radius: 0.25rem;
        transition-property: background-color, box-shadow;
        transition-duration: 0.8s;
        transition-timing-function: cubic-bezier(0.04, 1.25, 0.37, 0.97);
        box-shadow: 0px 4px 8px #131313;
    }

    .official-page:hover,
    .official-page:focus {
        background-color: #5d7cac;
        box-shadow: 0px 2px 4px #131313;
    }

    .chip {
        color: #ffffff;
        background-color: #4d4f53;
        padding: 0.25rem 0.5rem 0.25rem 0.5rem;
        border-radius: 0.25rem;
        min-height: 24px;
        box-shadow: 0px 2px 4px #131313;
    }

    .warning {
        color: #000;
        background-color: #e68638;
    }

    .review {
        background-color: #30363f;
        border-radius: 0.25rem;
        box-shadow: 0px 4px 8px #131313;
    }

    .review-info {
        padding: 0.5rem 1rem 0.5rem 1rem;
        border-radius: 0.25rem 0.25rem 0px 0px;
    }

    .review-content {
        padding: 8px 16px 8px 16px;
    }

    .review-author {
        font-weight: 700;
        overflow-wrap: anywhere;
    }

    .review-counter {
        font-weight: 700;
        font-size: 24px;
        text-align: center;
    }

    .rating-label {
        font-weight: 800;
        font-size: 24px;
    }

    @media (max-width: 1200px) {
        :global(.content) {
            max-width: 600px;
        }

        .capsule-cell :global(.capsule) {
            width: 180px;
            height: 270px;
        }

        .meta-cell {
            font-size: 24px;
        }

        .engine-logo {
            width: 32px;
            height: 32px;
            top: 6px;
        }

        .title {
            font-size: 32px;
        }
    }

    @media (max-width: 600px) {
        :global(.content) {
            padding-left: 16px;
            padding-right: 16px;
        }

        .capsule-cell :global(.capsule) {
            width: 120px;
            height: 180px;
        }

        .meta-cell {
            font-size: 16px;
        }

        .engine-logo {
            width: 24px;
            height: 24px;
            top: 4px;
        }

        .title {
            font-size: 24px;
        }
    }
</style>
