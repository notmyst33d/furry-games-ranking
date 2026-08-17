import type { PageServerLoad } from "./$types";

import { getAllCombined } from "$lib/data";

export const load: PageServerLoad = async () => {
    return {
        combined: await getAllCombined(),
    };
};
