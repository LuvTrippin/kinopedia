export interface Movie {
    title: string;
    poster_path: string | null;
    poster_url?: string;
    vote_average: number;
    release_date: string | null;
    original_language: string;
    id: number;
    overview?: string;
    origin_country?: string[];
    genres?: {
        id: number;
        name: string;
    }[];
}