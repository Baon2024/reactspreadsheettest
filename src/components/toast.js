"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { X } from "lucide-react"
import { cn } from "../lib/utils"

// Simple toast implementation for CRA
const ToastContext = createContext({
  toast: () => {},
})

export const useToast = () => useContext(ToastContext)

export function Toast({ title, description, action, open, onOpenChange, duration = 5000, variant = "default" }) {
  useEffect(() => {
    if (open && duration) {
      const timer = setTimeout(() => {
        onOpenChange?.(false)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [open, duration, onOpenChange])

  if (!open) return null

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex max-w-md items-center gap-3 rounded-lg border p-4 shadow-lg",
        variant === "default" && "bg-background text-foreground",
        variant === "destructive" && "bg-destructive text-destructive-foreground",
        variant === "success" && "bg-green-600 text-white",
      )}
    >
      <div className="flex-1 space-y-1">
        {title && <div className="font-medium">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      {action && <div>{action}</div>}
      <button onClick={() => onOpenChange?.(false)} className="rounded-full p-1 hover:bg-muted">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
}

export function Toaster() {
  const [toasts, setToasts] = useState([])

  const addToast = (props) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...props, id, open: true }])
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onOpenChange={(open) => {
              if (!open) removeToast(toast.id)
            }}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
