import { client } from './data'
import { createSyncTrackerTable, hasUploadedToday, recordUpload } from './sync-tracker'

export async function syncFSISData(reports: any[]) {
  await createSyncTrackerTable()
  
  if (await hasUploadedToday()) {
    console.log('FSIS data already synced today')
    return { status: 'skipped', message: 'Already synced today' }
  }

  try {

    for (const report of reports) {
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

    console.log(`FSIS sync completed: ${reports.length} records`)
    await recordUpload(reports.length)
    
    return { status: 'success', count: reports.length }
  } catch (error) {
    console.error('FSIS sync failed:', error)
    return { status: 'error', error: error.message }
  }
}