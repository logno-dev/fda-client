import Image from "next/image";
import { client } from "@/app/lib/data";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { revalidatePath } from "next/cache";
import { Pagination } from "./components/pagination";
import { Search } from "./components/search";
import { Suspense } from "react";
import { Limit } from "./components/limit-results";
import { executeQuery, formatDate } from "./lib/functions";
import { FilterBox } from "./components/filter-box";
import { classification, agency, allergens } from "@/app/lib/const"


export default async function Home(props: {
  searchParams?: Promise<{
    search?: string;
    order?: string;
    direction?: string;
    page?: string;
    limit?: string;
    filter?: string;
  }>;
}) {

  const searchParams = await props.searchParams;

  const params = {
    defaultLimit: "100",
    searchParams: searchParams,
    currentPage: Number(searchParams?.page) || 1,
  }

  const [data, count] = await executeQuery(params)

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col content-center items-center p-2 gap-2">
          <h2 className="font-bold text-2xl">
            Food Recall Databases
          </h2>
          <p>Browse thousands of results below by searching or filtering results.</p>
        </div>
        <div className="flex">
          <div className="flex flex-col gap-2 min-w-40 p-2">
            <FilterBox filterItem={agency} />
            <FilterBox filterItem={classification} />
            <FilterBox filterItem={allergens} />
          </div>
          <div className="p-2 pb-4 flex flex-col grow items-center justify-between gap-2">
            <div className="flex flex-col grow">
              <div className="flex">
                <Search />
                <p className="text-neutral-400 text-sm self-center px-1">
                  results per page
                </p>
                <Limit defaultLimit={params.defaultLimit} />
              </div>
              <Suspense fallback={<div>Loading data...</div>}>
                <DataTable columns={columns} data={data} />
              </Suspense>
            </div>
            <Pagination current={params.currentPage} count={+count} />
          </div>
        </div>
      </div>
    </>
  );
}

