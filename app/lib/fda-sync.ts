import { client } from './data'
import { createSyncTrackerTable, hasUploadedToday, recordUpload } from './sync-tracker'

export async function syncFDAData() {
  await createSyncTrackerTable()
  
  // Check if FDA data was already synced today
  if (await hasUploadedToday('FDA')) {
    console.log('FDA data already synced today')
    return { status: 'skipped', message: 'Already synced today' }
  }

  try {
    // Fetch data from FDA API
    const response = await fetch('https://api.fda.gov/food/enforcement.json?sort=report_date:desc&limit=100')
    
    if (!response.ok) {
      throw new Error(`FDA API returned ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    const recalls = data.results

    if (!recalls || !Array.isArray(recalls)) {
      throw new Error('Invalid FDA API response format')
    }

    let inserted = 0
    let errors = 0

    // Create database table if it doesn't exist
    await client.execute(`
      CREATE TABLE IF NOT EXISTS reports (
        recall_number TEXT NOT NULL PRIMARY KEY,
        authority TEXT NOT NULL,
        status TEXT,
        city TEXT,
        state TEXT,
        country TEXT,
        classification TEXT,
        product_type TEXT,
        event_id TEXT,
        recalling_firm TEXT,
        address_1 TEXT,
        address_2 TEXT,
        postal_code TEXT,
        voluntary_mandated TEXT,
        initial_firm_notification TEXT,
        distribution_pattern TEXT,
        product_description TEXT,
        product_quantity TEXT,
        reason TEXT,
        recall_init_date TEXT,
        center_classification_date TEXT,
        termination_date TEXT,
        report_date TEXT,
        code_info TEXT,
        more_code_info TEXT,
        url TEXT,
        summary TEXT
      );
    `)

    // Process each recall and insert into database
    for (const report of recalls) {
      try {
        // Skip records that don't have a recall number
        if (!report?.recall_number) {
          console.warn('Skipping FDA record without recall number')
          continue
        }

        // Insert data into database
        await client.execute({
          sql: `
            INSERT OR REPLACE INTO reports (
              recall_number,
              authority,
              status,
              city,
              state,
              country,
              classification,
              product_type,
              event_id,
              recalling_firm,
              address_1,
              address_2,
              postal_code,
              voluntary_mandated,
              initial_firm_notification,
              distribution_pattern,
              product_description,
              product_quantity,
              reason,
              recall_init_date,
              center_classification_date,
              termination_date,
              report_date,
              code_info,
              more_code_info
            ) VALUES (
              ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
            )
          `,
          args: [
            report.recall_number,
            'FDA',
            report.status || null,
            report.city || null,
            report.state || null,
            report.country || null,
            report.classification || null,
            report.product_type || null,
            report.event_id || null,
            report.recalling_firm || null,
            report.address_1 || null,
            report.address_2 || null,
            report.postal_code || null,
            report.voluntary_mandated || null,
            report.initial_firm_notification || null,
            report.distribution_pattern || null,
            report.product_description || null,
            report.product_quantity || null,
            report.reason_for_recall || null,
            report.recall_initiation_date || null,
            report.center_classification_date || null,
            report.termination_date || null,
            report.report_date || null,
            report.code_info || null,
            report.more_code_info || null
          ],
        })

        inserted++
      } catch (error) {
        console.error(
          `Error inserting FDA recall ${report.recall_number}:`,
          error,
        )
        errors++
      }
    }

    console.log(`FDA sync completed: ${inserted} records inserted, ${errors} errors`)
    await recordUpload(inserted, 'FDA')
    
    return { 
      status: 'success', 
      count: inserted,
      errors: errors,
      total: recalls.length 
    }
  } catch (error) {
    console.error('FDA sync failed:', error)
    return { 
      status: 'error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}
