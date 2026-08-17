import type { EntryGenerator, PageServerLoad } from "./$types";

import { getAllMeta, getMeta, getReviews } from "$lib/data";

export const entries: EntryGenerator = async () => {
    return await getAllMeta();
};

export const load: PageServerLoad = async ({ params }) => {
    return {
        meta: await getMeta(params.id),
        reviews: await getReviews(params.id),
    };
};
