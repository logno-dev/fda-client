import Image from "next/image";
import { client } from "@/app/lib/data";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { revalidatePath } from "next/cache";
import { Pagination } from "./components/pagination";
import { Search } from "./components/search";
import { Suspense } from "react";
import { Limit } from "./components/limit-results";
import { formatDate } from "./lib/functions";
import { FilterBox } from "./components/filter-box";


export default async function Home(props: {
  searchParams?: Promise<{
    search?: string;
    order?: string;
    direction?: string;
    page?: string;
    limit?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const order = searchParams?.order || 'center_classification_date';
  const direction = searchParams?.direction || 'DESC';
  const currentPage = Number(searchParams?.page) || 1;
  const search = searchParams?.search ? `WHERE recall_number LIKE "%${searchParams.search}%" OR reason LIKE "%${searchParams.search}%" OR product_description LIKE "%${searchParams.search}%" OR recalling_firm LIKE "%${searchParams.search}%" OR product_type LIKE "%${searchParams.search}%" OR code_info LIKE "%${searchParams.search}%" OR summary LIKE "%${searchParams.search}%"` : '';
  const limit = searchParams?.limit || 10;



  const { rows } = await client.execute(
    `SELECT center_classification_date, recalling_firm, reason, classification, recall_number FROM 'reports' ${search} ORDER BY ${order} ${direction} LIMIT ${limit} OFFSET ${(currentPage - 1) * +limit}`,
  );

  const count = await client.execute(
    `SELECT COUNT(*) FROM 'reports' ${search}`,
  );

  const pageCount = Math.ceil(Number(count.rows[0][0]) / +limit)

  const data = rows.map((row) => {

    return {
      recall_date: formatDate(row.center_classification_date.toString()),
      recalling_firm: row.recalling_firm ? String(row.recalling_firm).replaceAll("&#039;", "'") : ""
      ,
      recall_reason: row.reason,
      classification: row.classification,
      recall_number: row.recall_number
    };
  });



  return (
    <>
      <div className="min-w-30 p-2">
        <FilterBox header="Test" items={["item 1", "item 2", "item 3"]} />
      </div>
      <div className="p-2 pb-4 flex flex-col grow items-center justify-between gap-2">
        <div className="flex flex-col grow">
          <div className="flex">
            <Search />
            <p className="text-neutral-400 text-sm self-center px-1">
              results per page
            </p>
            <Limit />
          </div>
          <Suspense fallback={<div>Loading data...</div>}>
            <DataTable columns={columns} data={data} />
          </Suspense>
        </div>
        <Pagination current={currentPage} count={pageCount} />
      </div>
    </>
  );
}

