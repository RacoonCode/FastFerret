import { Arg, Query, Resolver } from "type-graphql";
import { SearchResultEntity } from "../entities/searchResult";
import { Index, MeiliSearch } from "meilisearch";
import { Container, Service } from "typedi";
import { CONT_MS_CLIENT, CONT_MS_SEARCH_RESP_IDX } from "../../consts";

@Service()
@Resolver(SearchResultEntity)
export class SearchResultResolver
{
    private readonly MSClient = Container.get<MeiliSearch>(CONT_MS_CLIENT);
    private readonly MSSearchResultIndex = Container.get<Index<SearchResultEntity>>(CONT_MS_SEARCH_RESP_IDX);

    @Query(() => [SearchResultEntity])
    async search(
        @Arg("keywords", () => String) keywords: string
    ): Promise<SearchResultEntity[]>
    {
        return (await this.MSSearchResultIndex.search(keywords)).hits;
    }
};
