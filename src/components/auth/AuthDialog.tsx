import { useState } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import SignInForm from "@/components/auth/SignInForm"
import SignUpForm from "@/components/auth/SignUpForm"
import type { AuthError } from "@supabase/supabase-js"
import { Alert, AlertTitle } from "../ui/alert"
import { AlertCircleIcon } from "lucide-react"

function AuthDialog({ trigger }: { trigger: React.ReactNode }) {
  const [authMode, setAuthMode] = useState<'signIn' | 'signUp'>('signIn')
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  function handleSetAuthMode(mode: 'signIn' | 'signUp') {
    setAuthMode(mode);
    setAuthError(null);
  }

  const title = authMode === 'signIn' ? 'Sign In' : 'Sign Up'
  const description = authMode === 'signIn' 
    ? 'Welcome back! Please sign in to your account.' 
    : 'Join us today! Create your account to get started.'

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
            {authError && 
              <Alert variant="destructive" className="mt-2">
                <AlertCircleIcon />
                <AlertTitle>{authError.message}</AlertTitle>
              </Alert>
            }
          </DialogHeader>
          {
            authMode === 'signIn' && 
            <SignInForm 
              onSwitchToSignUp={() => handleSetAuthMode('signUp')}
              onSubmitError={(error: AuthError | null) => setAuthError(error)}
            />
          }
          {
            authMode === 'signUp' && 
            <SignUpForm 
              onSwitchToSignIn={() => handleSetAuthMode('signIn')}
              onSubmitError={(error: AuthError | null) => setAuthError(error)}
            />
          }
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>
            {description}
          </DrawerDescription>
          {authError && 
            <Alert variant="destructive" className="mt-2">
              <AlertCircleIcon />
              <AlertTitle>{authError.message}</AlertTitle>
            </Alert>
          }
        </DrawerHeader>
        <div className="p-4">
          {
            authMode === 'signIn' && 
            <SignInForm 
              onSwitchToSignUp={() => handleSetAuthMode('signUp')} 
              onSubmitError={(error: AuthError | null) => setAuthError(error)} 
            />
          }
          {
            authMode === 'signUp' && 
            <SignUpForm 
              onSwitchToSignIn={() => handleSetAuthMode('signIn')}
              onSubmitError={(error: AuthError | null) => setAuthError(error)}
            />
          }
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default AuthDialog;