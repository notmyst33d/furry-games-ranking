<script lang="ts">
    import data from "$lib/data.json";

    const data2 = data.map((e: any) => {
        if (e["hidden_gem"] === true) {
            e["textRating"] = "Hidden Gem";
            e["class"] = "hidden-gem";
            return e;
        }
        if (e["rating"] >= 9.5) {
            e["textRating"] = "Absolute Cinema";
            e["class"] = "absolute-cinema";
        } else if (e["rating"] >= 7.0) {
            e["textRating"] = "Great";
            e["class"] = "great";
        } else if (e["rating"] >= 4.0) {
            e["textRating"] = "Mid";
            e["class"] = "mid";
        } else if (e["rating"] > 1.5) {
            e["textRating"] = "Unplayable";
            e["class"] = "unplayable";
        } else if (e["rating"] <= 1.5) {
            e["textRating"] = "Coal";
            e["class"] = "coal";
        }
        return e;
    });

    data2.sort((a, b) => b["rating"] - a["rating"]);
</script>

<h1>Furry Games Ranking</h1>
<p>A list of furry games played and ranked by me</p>

{#each data2 as entry}
    <h2 class="title {entry['class']}">
        {entry["name"]} · {entry["textRating"]} · {(
            Math.round(entry["rating"] * 10) / 10
        ).toFixed(1)}
    </h2>

    <div class="chips">
        <div class="chip">
            <img
                alt="{entry['engine']} engine logo"
                src="{entry['engine']}.png"
            />
        </div>
        <div class="chip">{entry["genre"]}</div>
        {#each entry["warnings"] ?? [] as warning}
            <div class="chip warning">{warning}</div>
        {/each}
        <div class="chip updated">Reviewed {entry["date"]}</div>
    </div>

    <p>{entry["description"]}</p>

    <hr />
{/each}

<style>
    @font-face {
        font-family: "Inter";
        src: url(/InterVariable.ttf);
    }

    :global(body) {
        font-family:
            "Inter",
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            "Open Sans",
            "Helvetica Neue",
            sans-serif;
        max-width: 600px;
        margin: auto;
        padding-left: 16px;
        padding-right: 16px;
    }

    hr {
        background-color: #cacaca;
        height: 1px;
        border: none;
    }

    :global(*) {
        font-size: 16px;
        line-height: 1.5;
    }

    .title {
        width: fit-content;
        padding: 2px 4px 2px 4px;
        border-radius: 4px;
    }

    .hidden-gem {
        color: #000000;
        background-color: #c1ebf1;
    }

    .absolute-cinema {
        color: #000;
        background-color: #f0cd5a;
    }

    .great {
        color: #000000;
        background-color: #80e291;
    }

    .mid {
        color: #000000;
        background-color: #7ebdf1;
    }

    .unplayable {
        color: #000000;
        background-color: #ff7b7b;
    }

    .coal {
        color: #fff;
        background-color: #3a352e;
    }

    .chips {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 8px;
    }

    .chip {
        color: #000000;
        background-color: #dbdbe6;
        padding: 4px 8px 4px 8px;
        border-radius: 4px;
        min-height: 24px;
        height: 100%;
    }

    .chip img {
        display: block;
        height: 24px;
    }

    .warning {
        color: #000;
        background-color: #f7be43;
    }

    .updated {
        color: #000;
        background-color: #eacbff;
    }
</style>
