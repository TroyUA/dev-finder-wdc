'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

const formSchema = z.object({
  search: z.string().min(0).max(50),
})

export function SearchBar() {
  const router = useRouter()
  const query = useSearchParams()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get('search') ?? '',
    },
  })

  async function onSubmit({ search }: z.infer<typeof formSchema>) {
    if (search) {
      router.push(`/?search=${search}`)
    } else {
      router.push('/')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-[440px]"
                  {...field}
                  placeholder="Filter rooms by keywords, such as typescript, nodejs, python"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <SearchIcon className="mr-2" />
          Search
        </Button>
        {query.get('search') && (
          <Button
            variant="link"
            onClick={() => {
              form.setValue('search', '')
              router.push('/')
            }}
          >
            Clear
          </Button>
        )}
      </form>
    </Form>
  )
}