import useAuthStore from "@/stores/auth.store"
import { Button } from "../ui/button"
import AuthDialog from "@/components/auth/AuthDialog"
import { ModeToggle } from "../ui/mode-toggle"
import UserDropdown from "./UserDropdown"
import { CirclePlus } from "lucide-react"
import AddJobDialog from "../client/add-job/AddJobDialog"


function Header() {
  const { user, role } = useAuthStore()

  const isAddClientActionAvailable = user && role === 'client'

  return <header className="bg-accent">
    <div className="container mx-auto p-4 flex items-center">
      <h1 className="text-xl font-bold text-primary mr-auto">CleanApp</h1>
      <ul className="flex items-center gap-x-2">
        {isAddClientActionAvailable &&
          <li>
            <AddJobDialog trigger={<Button size="sm"><CirclePlus />Add job</Button>} />
          </li>
        }
        <li>
          {!user
            ? <AuthDialog trigger={<Button size="sm">Sign In</Button>} />
            : <UserDropdown />
          }
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </div>
  </header>
}

export default Header;