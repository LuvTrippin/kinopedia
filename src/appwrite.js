import { Client, Databases, Query, ID } from "appwrite";


const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(PROJECT_ID);
const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    try {
         const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
             Query.equal('searchTerm', searchTerm),
         ]);

         if (result.documents.length > 0) {
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            })
         } else {
             await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                 searchTerm: searchTerm,
                 poster_url: `${IMAGE_BASE_URL}${movie.poster_path}`,
                 movie_id: movie.id,
                 count: 1,
             })
         }
    } catch (error) {
        console.log(error);
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count"),
        ]);

        return result.documents;
    } catch (error) {
        console.log(error);
    }
}
