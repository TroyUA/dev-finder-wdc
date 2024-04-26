import { db } from '@/db'
import { Room, room } from '@/db/schema'
import { getSession } from '@/lib/auth'
import { eq, like } from 'drizzle-orm'

export async function getRooms(search: string | undefined) {
  const where = search ? like(room.tags, `%${search}%`) : undefined
  return await db.query.room.findMany({ where })
}

export async function getRoom(roomid: string) {
  return await db.query.room.findFirst({
    where: eq(room.id, roomid),
  })
}

export async function getUserRooms() {
  const session = await getSession()
  if (!session) {
    throw new Error('User not authenticated')
  }

  return await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
  })
}

export async function deleteRoom(roomId: string) {
  return await db.delete(room).where(eq(room.id, roomId))
}

export async function createRoom(
  roomData: Omit<Room, 'id' | 'userId'>,
  userId: string
) {
  const created = await db
    .insert(room)
    .values({ ...roomData, userId })
    .returning()

  return created[0]
}

export async function editRoom(roomData: Room) {
  const updated = await db
    .update(room)
    .set(roomData)
    .where(eq(room.id, roomData.id))
    .returning()

  return updated[0]
}
