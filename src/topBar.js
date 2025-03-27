import React, { useState } from 'react';
import { CircularProgress, AppBar, Toolbar, Menu, MenuItem, Snackbar, IconButton } from "@mui/material";
import { FaPhone, FaTable } from 'react-icons/fa';
import { FaClockRotateLeft, FaCheck, FaTriangleExclamation } from "react-icons/fa6";
//import mango from './mango.png';
import { Bell, History, Home, LogOut, Phone, Settings, User } from "lucide-react"

import { Button } from './components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu'
import { Toaster } from './components/toast';
//import { useToast } from "@/hooks/use-toast"

export default function TopBar({ handleEnrichClick, addRow, addColumn }) {
  const [isLoading, setIsLoading] = useState(false);
  const [callStatus, setCallStatus] = useState({ success: 0, failed: 0, total: 0 });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [anchorEl, setAnchorEl] = useState(null); // For Menu dropdown
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  function setDarkMode() {

  }

  let darkMode;

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-white p-1">
              <img src="/mango.png" alt="Mango Logo" className="h-7 w-7" />
            </div>
            <span className="text-xl font-bold tracking-tight">Mango</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Button
              onClick={handleEnrichClick}
              variant="secondary"
              className="bg-white text-amber-600 hover:bg-gray-100 hover:text-amber-700"
              disabled={isLoading}
              size="sm"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-amber-600 border-b-transparent"></span>
                  <span className="font-medium">
                    {callStatus.success + callStatus.failed}/{callStatus.total}
                  </span>
                </>
              ) : (
                <>
                  <Phone className="mr-2 h-4 w-4" />
                  <span className="font-medium">Enrich</span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleMenuClick("history")}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              <History className="mr-2 h-4 w-4" />
              History
            </Button>
            

            <Button
              variant="ghost"
              size="sm"
              onClick={addRow}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              
              Add Row
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={addColumn}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              
              Add Column
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 bg-white/10 hover:bg-white/20 border border-white/20"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleMenuClick("dashboard")}>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick("settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick("toast")}>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Show Notification</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleMenuClick("logout")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <Toaster />
    </>
  )
};
