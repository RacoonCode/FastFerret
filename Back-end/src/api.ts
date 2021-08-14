import "reflect-metadata";
import { Index, MeiliSearch } from "meilisearch";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createServer } from "http";
import { ApolloContext } from "./api/types";
import { Container } from "typedi";
import { SearchResultResolver } from "./api/resolvers/searchResult";
import cors from "cors";
import express from "express";
import { SearchResultEntity } from "./api/entities/searchResult";
import { 
    CONT_MS_CLIENT, 
    CONT_MS_SEARCH_RESP_IDX, 
    MS_SEARCH_RESP_IDX 
} from "./consts";

export async function APIStart(
    MSClient: MeiliSearch,
    port: number,
    prod: boolean
): Promise<number>
{
    Container.set<MeiliSearch>(
        CONT_MS_CLIENT, 
        MSClient
    );
    Container.set<Index<SearchResultEntity>>(
        CONT_MS_SEARCH_RESP_IDX, 
        MSClient.index(MS_SEARCH_RESP_IDX)
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                SearchResultResolver
            ],
            validate: false,
            container: Container
        }),
        context: ({ req, res }): ApolloContext => ({ req, res })
    });
    await apolloServer.start();

    const app = express();
    app.use(
        cors({
            origin: "*",
            credentials: false
        })
    );
    app.use(apolloServer.getMiddleware({ path: "/", cors: false }));

    const httpServer = createServer(app);
    httpServer.listen(port, () => {
        console.log(`API service started on port ${port}.`);
    });
    
    return 0;
}
