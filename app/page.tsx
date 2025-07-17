import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { Pagination } from "./components/pagination";
import { Search } from "./components/search";
import { Suspense } from "react";
import { Limit } from "./components/limit-results";
import { executeQuery } from "./lib/functions";
import { FilterBox } from "./components/filter-box";
import { classification, agency, allergens } from "@/app/lib/const"
import { Pros } from "./components/pros";
import { BackgroundSync } from "./components/background-sync";


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
      <BackgroundSync />
      <div className="flex flex-col">
        <div className="flex flex-col content-center items-center">
          <Pros />
        </div>
        <div className="grid grid-cols-12 grid-rows-auto" id="recalls">
          <div className="row-2 md:row-1 col-span-12 md:col-span-2 flex flex-wrap md:flex-col gap-2 p-2">
            <FilterBox filterItem={agency} />
            <FilterBox filterItem={classification} />
            <FilterBox filterItem={allergens} />
          </div>
          <div className="row-1 md:col-3 col-span-12 md:col-span-10 p-2 pb-4 flex flex-col grow items-center justify-between gap-2">
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

