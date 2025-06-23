"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, TrendingUp } from "lucide-react"

interface SubjectSidebarProps {
    selectedSubject: string
    onSubjectChange: (subject: string) => void
}

const subjects = [
    { name: "All Subjects", key: "all", count: 156, trending: false },
    { name: "Computer Science", key: "cs", count: 45, trending: true },
    { name: "Mathematics", key: "math", count: 38, trending: true },
    { name: "Physics", key: "physics", count: 29, trending: false },
    { name: "Chemistry", key: "chemistry", count: 22, trending: false },
    { name: "Biology", key: "biology", count: 18, trending: false },
    { name: "Engineering", key: "engineering", count: 31, trending: true },
    { name: "Business", key: "business", count: 15, trending: false },
    { name: "Psychology", key: "psychology", count: 12, trending: false },
]

const studyGroups = [
    { name: "CS Study Group", members: 24, subject: "Computer Science" },
    { name: "Calculus Help", members: 18, subject: "Mathematics" },
    { name: "Physics Lab Partners", members: 15, subject: "Physics" },
]

export function SubjectSidebar({ selectedSubject, onSubjectChange }: SubjectSidebarProps) {
    return (
        <div className="space-y-6">
            {/* Subject Filter */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Subjects
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {subjects.map((subject) => (
                        <Button
                            key={subject.key}
                            variant={selectedSubject === subject.key ? "default" : "ghost"}
                            className="w-full justify-between"
                            onClick={() => onSubjectChange(subject.key)}
                        >
                            <div className="flex items-center gap-2">
                                <span>{subject.name}</span>
                                {subject.trending && <TrendingUp className="h-3 w-3 text-emerald-500" />}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                                {subject.count}
                            </Badge>
                        </Button>
                    ))}
                </CardContent>
            </Card>

            {/* Study Groups */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Active Study Groups
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {studyGroups.map((group, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <h4 className="font-medium text-sm">{group.name}</h4>
                            <p className="text-xs text-gray-600">{group.subject}</p>
                            <div className="flex items-center gap-1 mt-1">
                                <Users className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-600">{group.members} members</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
