"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "./auth-provider"
import { GraduationCap, Users, BookOpen, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
    const { login, register } = useAuth()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            await login(email, password)
            toast({
                title: "Welcome back!",
                description: "You've successfully logged in to Study Buddy Hub.",
            })
        } catch (error) {
            toast({
                title: "Login failed",
                description: "Please check your credentials and try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const userData = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            username: formData.get("username") as string,
            displayName: formData.get("displayName") as string,
            university: formData.get("university") as string,
            major: formData.get("major") as string,
            year: Number.parseInt(formData.get("year") as string),
            bio: formData.get("bio") as string,
            subjects: [formData.get("major") as string],
        }

        try {
            await register(userData)
            toast({
                title: "Account created!",
                description: "Welcome to Study Buddy Hub. Start connecting with fellow students!",
            })
        } catch (error) {
            toast({
                title: "Registration failed",
                description: "Please check your information and try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                {/* Hero Section */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <GraduationCap className="h-8 w-8 text-blue-900" />
                        <h1 className="text-3xl font-bold text-blue-900">Study Buddy Hub</h1>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">
                        Connect with fellow students, share study content, and collaborate on academic projects
                    </p>

                    {/* Feature highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                            <Users className="h-6 w-6 text-blue-600" />
                            <div className="text-left">
                                <h3 className="font-semibold text-gray-900">Connect</h3>
                                <p className="text-sm text-gray-600">Find study partners</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                            <BookOpen className="h-6 w-6 text-amber-600" />
                            <div className="text-left">
                                <h3 className="font-semibold text-gray-900">Share</h3>
                                <p className="text-sm text-gray-600">Upload study materials</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                            <MessageSquare className="h-6 w-6 text-emerald-600" />
                            <div className="text-left">
                                <h3 className="font-semibold text-gray-900">Collaborate</h3>
                                <p className="text-sm text-gray-600">Ask questions & help others</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Auth Forms */}
                <Card className="w-full max-w-md mx-auto">
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <CardHeader>
                                <CardTitle>Welcome Back</CardTitle>
                                <CardDescription>Sign in to your Study Buddy Hub account</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">University Email</Label>
                                        <Input id="email" name="email" type="email" placeholder="student@university.edu" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" name="password" type="password" required />
                                    </div>
                                    <Button type="submit" className="w-full academic-primary" disabled={isLoading}>
                                        {isLoading ? "Signing in..." : "Sign In"}
                                    </Button>
                                </form>
                            </CardContent>
                        </TabsContent>

                        <TabsContent value="register">
                            <CardHeader>
                                <CardTitle>Join Study Buddy Hub</CardTitle>
                                <CardDescription>Create your academic profile and start connecting</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleRegister} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="username">Username</Label>
                                            <Input id="username" name="username" placeholder="johndoe" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="displayName">Display Name</Label>
                                            <Input id="displayName" name="displayName" placeholder="John Doe" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">University Email</Label>
                                        <Input id="email" name="email" type="email" placeholder="student@university.edu" required />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" name="password" type="password" required />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="university">University</Label>
                                        <Input id="university" name="university" placeholder="University of Technology" required />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="major">Major</Label>
                                            <Select name="major" required>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select major" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                                                    <SelectItem value="Engineering">Engineering</SelectItem>
                                                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                                                    <SelectItem value="Physics">Physics</SelectItem>
                                                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                                                    <SelectItem value="Biology">Biology</SelectItem>
                                                    <SelectItem value="Business">Business</SelectItem>
                                                    <SelectItem value="Psychology">Psychology</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="year">Year</Label>
                                            <Select name="year" required>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Year" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">1st Year</SelectItem>
                                                    <SelectItem value="2">2nd Year</SelectItem>
                                                    <SelectItem value="3">3rd Year</SelectItem>
                                                    <SelectItem value="4">4th Year</SelectItem>
                                                    <SelectItem value="5">Graduate</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio (Optional)</Label>
                                        <Textarea id="bio" name="bio" placeholder="Tell us about your academic interests..." rows={3} />
                                    </div>

                                    <Button type="submit" className="w-full academic-primary" disabled={isLoading}>
                                        {isLoading ? "Creating Account..." : "Create Account"}
                                    </Button>
                                </form>
                            </CardContent>
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
        </div>
    )
}
