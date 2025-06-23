"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { GraduationCap, Search, Home, User, LogOut } from "lucide-react"
import { useAuth } from "./auth-provider"

interface HeaderProps {
    onViewChange: (view: "feed" | "profile") => void
    activeView: "feed" | "profile"
}

export function Header({ onViewChange, activeView }: HeaderProps) {
    const { user, logout } = useAuth()

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <GraduationCap className="h-8 w-8 text-blue-900" />
                        <h1 className="text-xl font-bold text-blue-900">Study Buddy Hub</h1>
                    </div>

                    {/* Search */}
                    <div className="flex-1 max-w-md mx-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input placeholder="Search posts, subjects, or students..." className="pl-10" />
                        </div>
                    </div>

                    {/* Navigation & Profile */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant={activeView === "feed" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => onViewChange("feed")}
                            className="flex items-center gap-2"
                        >
                            <Home className="h-4 w-4" />
                            Feed
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.profileImage || "/placeholder.svg"} alt={user?.displayName} />
                                        <AvatarFallback>
                                            {user?.displayName
                                                ?.split(" ")
                                                .map((n) => n[0])
                                                .join("") || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuItem onClick={() => onViewChange("profile")}>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={logout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    )
}
