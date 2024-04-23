import { getRoom } from '@/data-access/rooms'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { TagsList } from '@/components/tags-list'
import { DevFinderVideo } from '../video-player'
import { splitTags } from '@/lib/utils'
import { unstable_noStore as noStore } from 'next/cache'

export default async function RoomPage(props: { params: { roomid: string } }) {
  const { roomid } = props.params
  noStore()
  const room = await getRoom(roomid)

  if (!room) {
    return <div>No room with this ID found</div>
  }

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3  p-8 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <DevFinderVideo room={room} />
        </div>
      </div>
      <div className="col-span-1 p-8 pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base">{room?.name}</h1>
          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items-center gap-2 self-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
              GitHub Project
            </Link>
          )}
          <p className="text-base text-gray-600">{room?.description}</p>
          <TagsList tags={splitTags(room.tags)} />
        </div>
      </div>
    </div>
  )
}
