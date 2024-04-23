import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { TagsList } from '../../components/tags-list'
import { splitTags } from '@/lib/utils'
import { Button } from '../../components/ui/button'
import { Room } from '@/db/schema'

export function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            GitHub Project
          </Link>
        )}
        <TagsList tags={splitTags(room.tags)} />
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
