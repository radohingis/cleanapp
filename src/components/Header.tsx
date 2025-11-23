import useAuthStore from "@/stores/auth.store"
import { Button } from "./ui/button"
import AuthDialog from "@/components/auth/AuthDialog"
import { ModeToggle } from "./ui/mode-toggle"
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"


function Header() {
  const { user, signOut } = useAuthStore()

  return <header className="bg-accent">
    <div className="container mx-auto p-4 flex items-center gap-4">
      <h1 className="text-xl font-bold text-primary">CleanApp</h1>
      <div className="ml-auto"></div>
      {!user
        ? <AuthDialog trigger={<Button size="sm">Sign In</Button>} /> 
        : <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full" size="sm">{user.email?.charAt(0)}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
      <ModeToggle />
    </div>
  </header>
}

export default Header;