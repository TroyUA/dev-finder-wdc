import { db } from '@/db'
import { room } from '@/db/schema'
import { eq, like } from 'drizzle-orm'
import { unstable_noStore as noStore } from 'next/cache'

export async function getRooms(search: string | undefined) {
  noStore()
  const where = search ? like(room.tags, `%${search}%`) : undefined
  return await db.query.room.findMany({ where })
}

export async function getRoom(roomid: string) {
  noStore()
  return await db.query.room.findFirst({
    where: eq(room.id, roomid),
  })
}
