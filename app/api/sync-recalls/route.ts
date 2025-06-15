import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/app/lib/data'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    if (!Array.isArray(data)) {
      return NextResponse.json({ error: 'Invalid format' }, { status: 400 })
    }

    for (const report of data) {
      await client.execute({
        sql: `
          INSERT OR REPLACE INTO reports (
            recall_number,
            authority,
            status,
            state,
            classification,
            product_type,
            recalling_firm,
            distribution_pattern,
            product_description,
            product_quantity,
            reason,
            center_classification_date,
            termination_date,
            report_date,
            url,
            summary
          ) VALUES (
            ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
          )
        `,
        args: [
          report.field_recall_number,
          'USDA',
          report.field_active_notice || null,
          report.field_states || null,
          report.field_recall_classification || null,
          report.field_processing || null,
          report.field_title || null,
          report.field_distro_list || null,
          report.field_product_items || null,
          report.field_qty_recovered || null,
          report.field_recall_reason || null,
          report.field_recall_date?.toString().replaceAll('-', '') || null,
          report.field_closed_date?.toString().replaceAll('-', '') || null,
          report.field_last_modified || null,
          report.field_recall_url || null,
          report.field_summary || null
        ],
      })
    }
    console.log(data.length)

    return NextResponse.json({ status: 'ok', count: data.length })
  } catch (err) {
    console.error('Sync failed:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

