import { Endpoints } from "@octokit/types";


export type RepositororiesSearchResponse =
    Endpoints["GET /search/repositories"]["response"]["data"];

export type IssuesSearchResponse =
    Endpoints["GET /search/issues"]["response"]["data"];