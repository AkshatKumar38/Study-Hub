
"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
    id: string
    email: string
    username: string
    displayName: string
    university: string
    major: string
    year: number
    bio: string
    profileImage?: string
    subjects: string[]
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    register: (userData: Partial<User> & { password: string }) => Promise<void>
    logout: () => void
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check for existing session
        const savedUser = localStorage.getItem("study-buddy-user")
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        // Mock login - in real app, this would call your auth API
        const mockUser: User = {
            id: "1",
            email,
            username: email.split("@")[0],
            displayName: "John Doe",
            university: "University of Technology",
            major: "Computer Science",
            year: 3,
            bio: "Passionate about coding and helping fellow students",
            subjects: ["Computer Science", "Mathematics", "Physics"],
        }
        setUser(mockUser)
        localStorage.setItem("study-buddy-user", JSON.stringify(mockUser))
    }

    const register = async (userData: Partial<User> & { password: string }) => {
        // Mock registration
        const newUser: User = {
            id: Date.now().toString(),
            email: userData.email!,
            username: userData.username!,
            displayName: userData.displayName!,
            university: userData.university!,
            major: userData.major!,
            year: userData.year!,
            bio: userData.bio || "",
            subjects: userData.subjects || [],
        }
        setUser(newUser)
        localStorage.setItem("study-buddy-user", JSON.stringify(newUser))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("study-buddy-user")
    }

    return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
