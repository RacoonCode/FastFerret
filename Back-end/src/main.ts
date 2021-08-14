
import { MeiliSearch } from "meilisearch";
import { APIStart } from "./api";

let MSClient: MeiliSearch;

async function main(): Promise<void>
{
    let MSHost = "http://127.0.0.1:7700";

    try
    {
        MSClient = new MeiliSearch({
            host: MSHost
        });
    } catch(err)
    {
        console.log(`Failed to connect to the MeiliSearch server on ${MSHost}`);
        process.exit(1);
    }

    console.log(`Connected to MeiliSearch server on ${MSHost}.`);

    await APIStart(MSClient, 6969, false);
    // scraper here?
}

main();
