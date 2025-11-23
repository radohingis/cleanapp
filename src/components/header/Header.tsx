import useAuthStore from "@/stores/auth.store"
import { Button } from "../ui/button"
import AuthDialog from "@/components/auth/AuthDialog"
import { ModeToggle } from "../ui/mode-toggle"
import UserDropdown from "./UserDropdown"


function Header() {
  const { user } = useAuthStore()

  return <header className="bg-accent">
    <div className="container mx-auto p-4 flex items-center gap-4">
      <h1 className="text-xl font-bold text-primary">CleanApp</h1>
      <div className="ml-auto"></div>
      {!user
        ? <AuthDialog trigger={<Button size="sm">Sign In</Button>} />
        : <UserDropdown />
      }
      <ModeToggle />
    </div>
  </header>
}

export default Header;