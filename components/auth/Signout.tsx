import { signOut } from "@/auth"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit" className="px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600 transition flex">Signout</button>
    </form>
  )
}