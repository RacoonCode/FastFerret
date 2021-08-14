
export interface KeywordDoc
{
    name: string;
    occurrences: number;
}

export interface SearchResultDoc
{
    id:        number;
    url:       string;
    title:     string;
    relevancy: number;
    keywords:  KeywordDoc[];
}
