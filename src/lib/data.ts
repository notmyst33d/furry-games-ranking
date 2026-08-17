import { readdir, readFile } from "node:fs/promises";
import { parse as parseToml } from "smol-toml";
import { load as parseYaml } from "js-yaml";
import { marked } from "marked";
import * as z from "zod";

const Meta = z.object({
    id: z.string().regex(new RegExp("^[a-z0-9-]+$")).refine(v => !v.includes("--")),
    name: z.string(),
    capsule: z.string().optional().refine(v => v === undefined || v.startsWith("http")),
    url: z.string().optional().refine(v => v === undefined || v.startsWith("http")),
    genre: z.string(),
    engine: z.enum(["clickteam", "gm", "godot", "js", "renpy", "unity", "unreal"]),
    warnings: z.string().array(),
    tags: z.enum(["editors_pick"]).array(),
});

type Meta = z.infer<typeof Meta>;

const Review = z.object({
    author: z.string(),
    lang: z.string(),
    date: z.string().transform(v => new Date(v)),
    labels: z.enum(["recommended", "hidden_gem"]).array(),

    ratingGameplay: z.number().max(10.0).min(0.0),
    ratingStory: z.number().max(10.0).min(0.0),
    ratingVisual: z.number().max(10.0).min(0.0),
    ratingReplayability: z.number().max(10.0).min(0.0),

    ratingOverall: z.number().max(10.0).min(0.0),

    content: z.string(),
});

export type Review = z.infer<typeof Review>;

const Combined = z.object({
    meta: Meta,
    reviews: Review.array(),
});

type Combined = z.infer<typeof Combined>;

export async function parseReview(data: string): Promise<Review> {
    const start = data.indexOf("---\n");
    if (start === -1) {
        throw "cannot parse metadata";
    }
    const end = data.lastIndexOf("---\n");
    if (end === -1) {
        throw "cannot parse metadata";
    }
    const temp = parseYaml(data.substring(start + 4, end)) as any;
    temp.content = marked.parse(data.substring(end + 4));
    return Review.parse(temp);
}

export async function getReviews(id: string): Promise<Review[]> {
    const reviews = await readdir(`data/${id}/reviews`);
    const out = [];
    for (const review of reviews) {
        const data = await readFile(`data/${id}/reviews/${review}`, "utf-8");
        out.push(await parseReview(data));
    }
    return out;
}

export async function getMeta(id: string): Promise<Meta> {
    const temp = parseToml(await readFile(`data/${id}/meta.toml`, "utf-8"));
    temp.id = id;
    return Meta.parse(temp);
}

export async function getAllMeta(): Promise<Meta[]> {
    const games = await readdir("data");
    const out = [];
    for (const id of games) {
        const temp = parseToml(await readFile(`data/${id}/meta.toml`, "utf-8"));
        temp.id = id;
        out.push(Meta.parse(temp));
    }
    return out;
}

export async function getAllCombined(): Promise<Combined[]> {
    const games = await readdir("data");
    const out = [];
    for (const id of games) {
        const temp = parseToml(await readFile(`data/${id}/meta.toml`, "utf-8"));
        temp.id = id;
        const meta = Meta.parse(temp);
        const reviews = await getReviews(meta.id);
        out.push({ meta, reviews } as Combined);
    }
    return out;
}
