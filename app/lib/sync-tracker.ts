import { client } from './data'

export async function createSyncTrackerTable() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS sync_tracker (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sync_date TEXT NOT NULL,
      record_count INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

export async function hasUploadedToday(): Promise<boolean> {
  const today = new Date().toISOString().split('T')[0]
  
  const result = await client.execute({
    sql: 'SELECT COUNT(*) as count FROM sync_tracker WHERE sync_date = ?',
    args: [today]
  })
  
  return (result.rows[0].count as number) > 0
}

export async function recordUpload(recordCount: number) {
  const today = new Date().toISOString().split('T')[0]
  
  await client.execute({
    sql: 'INSERT INTO sync_tracker (sync_date, record_count) VALUES (?, ?)',
    args: [today, recordCount]
  })
}