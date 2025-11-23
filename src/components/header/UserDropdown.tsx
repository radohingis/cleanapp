import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import useAuthStore from "@/stores/auth.store"

function UserDropdown() {
  const { user, signOut } = useAuthStore()
  
  if (!user) return null;
  
  return <DropdownMenu>
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

export default UserDropdown;