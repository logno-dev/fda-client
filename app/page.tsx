import Image from "next/image";
import { client } from "@/app/lib/data";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { revalidatePath } from "next/cache";
import { Pagination } from "./components/pagination";
import { Search } from "./components/search";
import { Suspense } from "react";

function formatDate(dateStr: string) {

  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);

  return `${year}-${month}-${day}`;
}

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
  const order = searchParams?.order || 'recall_date';
  const direction = searchParams?.direction || 'DESC';
  const currentPage = Number(searchParams?.page) || 1;
  const search = searchParams?.search ? `WHERE recall_number LIKE "%${searchParams.search}%" OR recall_reason LIKE "%${searchParams.search}%" OR product_details LIKE "%${searchParams.search}%" OR recalling_firm LIKE "%${searchParams.search}%" OR product_type LIKE "%${searchParams.search}%" OR title LIKE "%${searchParams.search}%" OR summary LIKE "%${searchParams.search}%"` : '';
  const limit = searchParams?.limit || 10;



  const { rows } = await client.execute(
    `SELECT * FROM 'enforcements' ${search} ORDER BY ${order} ${direction} LIMIT ${limit} OFFSET ${(currentPage - 1) * +limit}`,
  );

  const count = await client.execute(
    `SELECT COUNT(*) FROM 'enforcements' ${search}`,
  );

  const pageCount = Math.ceil(Number(count.rows[0][0]) / +limit)

  const data = rows.map((row) => {
    return {
      recall_date: formatDate(String(row.recall_date)),
      title: row.title,
      recall_reason: row.recall_reason
    };
  });



  return (
    <>
      <div className="flex flex-col w-dvw absolute top-0 right-0 bottom-0 right-0">
        <div className="flex bg-blue-500 h-20"></div>
        <div className="flex p-2 grow">
          <div className="min-w-30 bg-slate-500 p-2"></div>
          <div className="p-2 pb-4 flex flex-col grow items-center justify-between gap-2">
            <div className="flex flex-col grow">
              <div>
                <Search />
              </div>
              <Suspense fallback={<div>Loading data...</div>}>
                <DataTable columns={columns} data={data} />
              </Suspense>
            </div>
            <Pagination current={currentPage} count={pageCount} />
          </div>
        </div>
      </div>
    </>
  );
}

