import { client } from "@/app/lib/data";
import { Button } from "@/components/ui/button";
import { NavBack } from "../components/nav-back";

export default async function Page({ params, }: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params
  const { rows } = await client.execute(`SELECT * FROM 'reports' WHERE recall_number = '${id}'`)


  const row = rows.length === 1 && rows[0]

  function transformStatus(status) {
    switch (status) {
      case "True":
        return "Active";
      case "False":
        return "Terminated";
      default:
        return status
    }
  }


  return (
    <main className="flex flex-col justify-center items-center w-full p-2 gap-2">
      <div className="flex w-full">
        <NavBack />
      </div>
      <div className="flex flex-col border rounded-md max-w-3xl">
        <div className="p-3 text-2xl font-bold bg-blue-200">
          Recall Number: <span className="text-blue-900">{row.recall_number.toString()}</span>
        </div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Authority</div>
        <div className="p-2">{row.authority.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Status</div>
        <div className="p-2">{transformStatus(row.status?.toString())}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">City</div>
        <div className="p-2">{row.city?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">State(s)</div>
        <div className="p-2">{row.state?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Country</div>
        <div className="p-2">{row.country?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Classification</div>
        <div className="p-2">{row.classification?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Product Type</div>
        <div className="p-2">{row.product_type?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Event ID</div>
        <div className="p-2">{row.event_id?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Firm/Title</div>
        <div className="p-2">{row.recalling_firm?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Address line 1</div>
        <div className="p-2">{row.address_1?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Address line 2</div>
        <div className="p-2">{row.address_2?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Postal Code</div>
        <div className="p-2">{row.postal_code?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Voluntary/Mandated</div>
        <div className="p-2">{row.voluntary_mandated?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Initial Firm Notification</div>
        <div className="p-2">{row.initial_firm_notification?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Distribution Pattern</div>
        <div className="p-2">{row.distribution_pattern?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Product Description</div>
        <div className="p-2">{row.product_description?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Product Quantity</div>
        <div className="p-2">{row.product_quantity?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Reason</div>
        <div className="p-2">{row.reason?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Recall Initialization Date</div>
        <div className="p-2">{row.recall_init_date?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Classification Date</div>
        <div className="p-2">{row.center_classification_date?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Termination Date</div>
        <div className="p-2">{row.termination_date?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Updated</div>
        <div className="p-2">{row.report_date?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Code Info</div>
        <div className="p-2">{row.code_info?.toString()}</div>
        <div className="p-2">{row.more_code_info?.toString()}</div>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">URL</div>
        <a href={row.url?.toString()} target="_blank" className="p-2">{row.url?.toString()}</a>
        <div className="text-lg font-bold bg-neutral-100 p-2 ">Summary</div>
        <div className="p-2" dangerouslySetInnerHTML={{ __html: row.summary }}></div>
      </div>
    </main>
  )

}
