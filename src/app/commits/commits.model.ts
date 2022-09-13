import { Endpoints } from "@octokit/types";


export type CommitsSearchResponse =
    Endpoints["GET /search/commits"]["response"]["data"];
