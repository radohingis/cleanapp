import useAuthStore from "@/stores/auth.store"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import AuthDialog from "@/components/auth/AuthDialog"


function Header() {
  const { user } = useAuthStore()

  return <header className="bg-accent">
    <div className="container mx-auto p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-primary">CleanApp</h1>
      {!user
        ? <AuthDialog trigger={<Button>Sign In</Button>} /> 
        : <Avatar>
            <AvatarFallback>{user?.email?.charAt(0).toUpperCase() ?? "X"}</AvatarFallback>
        </Avatar>
      }
    </div>
  </header>
}

export default Header;