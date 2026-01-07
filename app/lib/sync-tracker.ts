import { client } from './data'

export async function createSyncTrackerTable() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS sync_tracker (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sync_date TEXT NOT NULL,
      authority TEXT NOT NULL DEFAULT 'USDA',
      record_count INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

export async function hasUploadedToday(authority: string = 'USDA'): Promise<boolean> {
  const today = new Date().toISOString().split('T')[0]
  
  const result = await client.execute({
    sql: 'SELECT COUNT(*) as count FROM sync_tracker WHERE sync_date = ? AND authority = ?',
    args: [today, authority]
  })
  
  return (result.rows[0].count as number) > 0
}

export async function recordUpload(recordCount: number, authority: string = 'USDA') {
  const today = new Date().toISOString().split('T')[0]
  
  await client.execute({
    sql: 'INSERT INTO sync_tracker (sync_date, authority, record_count) VALUES (?, ?, ?)',
    args: [today, authority, recordCount]
  })
}