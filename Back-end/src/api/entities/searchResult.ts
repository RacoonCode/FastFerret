
import { Field, Int, ObjectType } from "type-graphql";
import { SearchResultDoc, KeywordDoc } from "../../db/searchResultDoc";

@ObjectType()
export class KeywordEntity implements KeywordDoc
{
    @Field(() => String)
    name: string;

    @Field(() => Int)
    occurrences: number;
}

@ObjectType()
export class SearchResultEntity implements SearchResultDoc
{
    @Field(() => Int)
    id: number;

    @Field(() => String)
    url: string;

    @Field(() => String)
    title: string;

    @Field(() => Int)
    relevancy: number;

    @Field(() => [KeywordEntity], { defaultValue: [] })
    keywords: KeywordEntity[];
};
