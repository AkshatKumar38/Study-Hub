"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, MapPin, Calendar, BookOpen, Users, Edit } from "lucide-react"
import { useAuth } from "./auth-provider"

export function UserProfile() {
    const { user } = useAuth()

    if (!user) return null

    const stats = [
        { label: "Posts", value: 24 },
        { label: "Followers", value: 156 },
        { label: "Following", value: 89 },
        { label: "Study Groups", value: 5 },
    ]

    const achievements = [
        { title: "Helpful Helper", description: "Received 50+ helpful reactions", icon: "🏆" },
        { title: "Question Master", description: "Asked 10 well-received questions", icon: "❓" },
        { title: "Resource Sharer", description: "Shared 20+ study resources", icon: "📚" },
        { title: "Community Builder", description: "Active member for 6 months", icon: "🌟" },
    ]

    const recentPosts = [
        {
            id: "1",
            content:
                "Just finished my data structures assignment! The binary tree implementation was challenging but rewarding.",
            subject: "Computer Science",
            reactions: 12,
            comments: 3,
            createdAt: "2 hours ago",
        },
        {
            id: "2",
            content: "Sharing my calculus notes from today's lecture on integration by parts.",
            subject: "Mathematics",
            reactions: 18,
            comments: 5,
            createdAt: "1 day ago",
        },
        {
            id: "3",
            content: "Looking for study partners for the upcoming physics midterm. Anyone interested?",
            subject: "Physics",
            reactions: 8,
            comments: 7,
            createdAt: "3 days ago",
        },
    ]

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <Card className="post-card">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col items-center md:items-start">
                            <Avatar className="h-24 w-24 mb-4">
                                <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.displayName} />
                                <AvatarFallback className="text-2xl">
                                    {user.displayName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <Edit className="h-4 w-4" />
                                Edit Profile
                            </Button>
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold">{user.displayName}</h1>
                                    <p className="text-gray-600">@{user.username}</p>
                                </div>
                                <div className="flex gap-4 mt-4 md:mt-0">
                                    {stats.map((stat) => (
                                        <div key={stat.label} className="text-center">
                                            <div className="font-bold text-lg">{stat.value}</div>
                                            <div className="text-sm text-gray-600">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <p className="text-gray-700 mb-4">{user.bio}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4" />
                                    <span>
                                        {user.major} • Year {user.year}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{user.university}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Joined September 2023</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    <span>{user.subjects.length} subjects</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                                {user.subjects.map((subject) => (
                                    <Badge key={subject} variant="secondary">
                                        {subject}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Profile Tabs */}
            <Tabs defaultValue="posts" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="posts">Recent Posts</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    <TabsTrigger value="groups">Study Groups</TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="space-y-4">
                    {recentPosts.map((post) => (
                        <Card key={post.id} className="post-card">
                            <CardContent className="pt-4">
                                <div className="flex justify-between items-start mb-3">
                                    <Badge variant="secondary" className="text-xs">
                                        {post.subject}
                                    </Badge>
                                    <span className="text-xs text-gray-500">{post.createdAt}</span>
                                </div>
                                <p className="text-gray-900 mb-3">{post.content}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span>{post.reactions} reactions</span>
                                    <span>{post.comments} comments</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="achievements" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map((achievement, index) => (
                            <Card key={index} className="post-card">
                                <CardContent className="pt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl">{achievement.icon}</div>
                                        <div>
                                            <h3 className="font-semibold">{achievement.title}</h3>
                                            <p className="text-sm text-gray-600">{achievement.description}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="groups" className="space-y-4">
                    {[
                        { name: "CS Study Group", members: 24, subject: "Computer Science", role: "Member" },
                        { name: "Calculus Help", members: 18, subject: "Mathematics", role: "Admin" },
                        { name: "Physics Lab Partners", members: 15, subject: "Physics", role: "Member" },
                    ].map((group, index) => (
                        <Card key={index} className="post-card">
                            <CardContent className="pt-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold flex items-center gap-2">
                                            {group.name}
                                            <Badge variant={group.role === "Admin" ? "default" : "secondary"} className="text-xs">
                                                {group.role}
                                            </Badge>
                                        </h3>
                                        <p className="text-sm text-gray-600">{group.subject}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Users className="h-3 w-3 text-gray-400" />
                                            <span className="text-xs text-gray-600">{group.members} members</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        View Group
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    )
}
