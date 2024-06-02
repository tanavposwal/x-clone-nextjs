
import { signIn } from "@/auth"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit" className="group px-3 py-1 bg-blue-600 rounded-lg hover:bg-blue-700 transition flex" >Signin</button>
    </form>
  )
} 