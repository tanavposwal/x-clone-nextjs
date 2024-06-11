'use client'
 
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { useFormStatus } from 'react-dom'

export default function FormBtn({ text }: { text: string }) {
    const { pending } = useFormStatus()

    return (
        <button className="px-4 py-2 mt-4 bg-white rounded-full text-black hover:bg-neutral-300 border border-neutral-400 transition flex items-center justify-center gap-2 disabled:opacity-50" disabled={pending} type="submit">{pending && <ArrowPathIcon className='w-5 h-5 fill-black animate-spin' />}{text}</button>
    )
}