
"use client"

import { useState } from "react"
import { Header } from "./header"
import { PostComposer } from "./post-composer"
import { PostFeed } from "./post-feed"
import { SubjectSidebar } from "./subject-sidebar"
import { UserProfile } from "./user-profile"

export function Dashboard() {
    const [activeView, setActiveView] = useState<"feed" | "profile">("feed")
    const [selectedSubject, setSelectedSubject] = useState<string>("all")

    return (
        <div className="min-h-screen bg-gray-50">
            <Header onViewChange={setActiveView} activeView={activeView} />

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <SubjectSidebar selectedSubject={selectedSubject} onSubjectChange={setSelectedSubject} />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {activeView === "feed" ? (
                            <div className="space-y-6">
                                <PostComposer />
                                <PostFeed selectedSubject={selectedSubject} />
                            </div>
                        ) : (
                            <UserProfile />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
