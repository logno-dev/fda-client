'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { v4 } from 'uuid'
import { type FilterDef } from '../lib/const'


export function FilterBox({ filterItem }: { filterItem: FilterDef }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const defaultParams = new URLSearchParams(searchParams)
  const defaultParamsArray = defaultParams.get(filterItem.headerId) ? defaultParams.get(filterItem.headerId).split("+") : []

  const form = useForm({
    defaultValues: {
      items: defaultParamsArray
    }
  })

  const selectedItems = form.watch('items')

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (selectedItems.length) {
      console.log(params.get(filterItem.headerName))
      const itemsString = selectedItems.join("+")
      params.set(filterItem.headerId, itemsString)
    } else {
      params.delete(filterItem.headerId)
    }
    replace(`${pathname}?${params.toString()}`)
  }, [selectedItems])




  return (
    <div className="rounded-md border h-fit p-1 flex flex-col">
      <div className="bg-white p-1 rounded-2xl w-full">
        <h1 className="text-lg font-bold border-b-2 border-stone-200 text-gray-800 mb-2 text-center">
          {filterItem.headerName}
        </h1>

        {/* The form structure remains, but the inputs are now managed by react-hook-form */}
        <form className="space-y-4"> {/* Changed to form for semantically correct usage */}
          {filterItem.items.map((item) => (
            <div key={v4()} className="flex items-center">
              <input
                type="checkbox"
                id={item.value}
                value={item.value} // The value of the checkbox when checked
                // Register the input with react-hook-form.
                // The name 'hobbies' indicates that these checkboxes belong to a group.
                // React Hook Form will collect the 'value' of all checked checkboxes
                // into an array under the 'hobbies' field.
                {...form.register('items')}
                className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 transition duration-150 ease-in-out"
              />
              <label htmlFor={item.value} className="ml-3 text-sm text-gray-700 select-none">
                {item.name}
              </label>
            </div>
          ))}
        </form>
      </div>
    </div>
  )
}
