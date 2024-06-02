'use client'
 
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { useFormStatus } from 'react-dom'

export default function ReplyBtn() {
    const { pending } = useFormStatus()

    return (
        <button className="px-5 py-2 bg-blue-500 font-semibold text-white transition-colors rounded-full self-end flex items-center justify-center gap-2 disabled:opacity-50" disabled={pending} type="submit">{pending && <ArrowPathIcon className='w-5 h-5 fill-white animate-spin' />}Reply</button>
    )
}