import { useState } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import AddJobForm from "./AddJobForm"

function AddJobDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const title = 'Add job'
  const description = 'Fill up the form and get supplier for your job.'

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
          </DialogHeader>
          <AddJobForm />
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
        </DrawerHeader>
        <div className="p-4">
          <AddJobForm />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default AddJobDialog;