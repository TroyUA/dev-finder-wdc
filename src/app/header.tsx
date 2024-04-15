'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogInIcon, LogOutIcon } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import Image from 'next/image'

function AccountDropdown() {
  const session = useSession()
  const isLoggedIn = !!session.data

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'link'}>
          <Avatar className="mr-2">
            <AvatarImage src={session.data?.user?.image ?? ''} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isLoggedIn ? (
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOutIcon className="mr-2" /> Log Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn('google')}>
            <LogInIcon className="mr-2" /> Log In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Header() {
  const session = useSession()

  return (
    <header className="bg-gray-100 dark:bg-gray-900 container mx-auto py-2">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-2 items-center hover:underline text-xl"
        >
          <Image
            src={'/troy-horse.png'}
            alt="logo"
            width={50}
            height={50}
          ></Image>
          DevFinder
        </Link>
        <div className="flex items-center gap-4">
          <AccountDropdown />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
