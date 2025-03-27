import { useState, useEffect } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Textarea } from "./components/ui/textarea"
import { Label } from "./components/ui/label"

const ContextDrawer = ({ contextData, onContextUpdate }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [contextText, setContextText] = useState(
    typeof contextData === "string" ? contextData : contextData?.summary || "Add spreadsheet context here...",
  )

  // Update local state when contextData prop changes
  useEffect(() => {
    if (typeof contextData === "string") {
      setContextText(contextData)
    }
  }, [contextData])

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  const handleContextChange = (e) => {
    const newValue = e.target.value
    setContextText(newValue)
    // Auto-save the changes
    if (onContextUpdate) {
      onContextUpdate(newValue)
    }
  }

  return (
    <>
      {/* Toggle button when drawer is closed */}
      {!isOpen && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 bg-background border-t border-x border-border rounded-t-lg shadow-md w-64 z-50">
          <button
            onClick={toggleDrawer}
            className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring w-full justify-center transition-colors"
            aria-label="Open context drawer"
          >
            <span className="text-sm font-medium">Spreadsheet Context</span>
            <ChevronUp className="h-4 w-4 text-primary" />
          </button>
        </div>
      )}

      {/* Drawer content with toggle button at top when open */}
      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-background shadow-lg border-t border-border z-50 animate-in slide-in-from-bottom duration-300">
          {/* Toggle button at top of drawer */}
          <div className="border-b border-border py-2">
            <button
              onClick={toggleDrawer}
              className="flex items-center gap-2 px-4 py-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring mx-auto transition-colors"
              aria-label="Close context drawer"
            >
              <span className="text-sm font-medium">Spreadsheet Context</span>
              <ChevronDown className="h-4 w-4 text-primary" />
            </button>
          </div>

          <div className="px-6 py-5 max-w-4xl mx-auto">
            <div className="mb-3">
              <Label htmlFor="spreadsheetContext" className="text-base">
                Context Notes
              </Label>
            </div>
            <div className="py-2">
              <Textarea
                id="spreadsheetContext"
                placeholder="Add notes, context, or any relevant information about this spreadsheet..."
                value={contextText}
                onChange={handleContextChange}
                rows={4}
                className="w-full resize-none focus-visible:ring-primary text-base min-h-[120px]"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ContextDrawer
