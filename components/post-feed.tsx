"use client"

import { useState } from "react"
import { PostCard } from "./post-card"

interface Post {
    id: string
    userId: string
    author: {
        displayName: string
        username: string
        university: string
        profileImage?: string
    }
    type: "general" | "question" | "resource"
    content: string
    subject: string
    images: string[]
    video?: string
    reactions: {
        like: number
        helpful: number
        motivating: number
        solved: number
    }
    userReactions: string[]
    comments: any[]
    createdAt: Date
    isResolved?: boolean
}

interface PostFeedProps {
    selectedSubject: string
}

// Mock data
const mockPosts: Post[] = [
    {
        id: "1",
        userId: "1",
        author: {
            displayName: "Sarah Chen",
            username: "sarahc",
            university: "MIT",
            profileImage: undefined,
        },
        type: "question",
        content:
            "Can someone help me understand the difference between Big O and Big Theta notation? I keep getting confused during algorithm analysis.",
        subject: "Computer Science",
        images: [],
        reactions: { like: 12, helpful: 8, motivating: 3, solved: 1 },
        userReactions: [],
        comments: [
            {
                id: "1",
                author: "Alex Kim",
                content: "Big O is upper bound, Big Theta is tight bound. Think of it as worst case vs exact case.",
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
            },
        ],
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        isResolved: false,
    },
    {
        id: "2",
        userId: "2",
        author: {
            displayName: "Mike Rodriguez",
            username: "miker",
            university: "Stanford",
        },
        type: "resource",
        content:
            "Just finished creating comprehensive calculus notes for derivatives and integrals. Sharing with everyone who might find them helpful! 📚",
        subject: "Mathematics",
        images: ["/placeholder.svg?height=300&width=400"],
        reactions: { like: 24, helpful: 18, motivating: 6, solved: 0 },
        userReactions: ["like"],
        comments: [],
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
    {
        id: "3",
        userId: "3",
        author: {
            displayName: "Emma Thompson",
            username: "emmat",
            university: "Harvard",
        },
        type: "general",
        content:
            "Late night study session at the library! Working on quantum mechanics problem sets. The dedication is real 💪 #StudyLife",
        subject: "Physics",
        images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
        reactions: { like: 15, helpful: 2, motivating: 12, solved: 0 },
        userReactions: ["motivating"],
        comments: [
            {
                id: "2",
                author: "David Park",
                content: "Keep it up! Quantum mechanics is tough but so rewarding.",
                createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
            },
        ],
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    },
]

export function PostFeed({ selectedSubject }: PostFeedProps) {
    const [posts, setPosts] = useState<Post[]>(mockPosts)
    const [loading, setLoading] = useState(false)

    const filteredPosts =
        selectedSubject === "all"
            ? posts
            : posts.filter((post) => post.subject.toLowerCase().includes(selectedSubject.toLowerCase()))

    const handleReaction = (postId: string, reactionType: string) => {
        setPosts(
            posts.map((post) => {
                if (post.id === postId) {
                    const hasReacted = post.userReactions.includes(reactionType)
                    const newUserReactions = hasReacted
                        ? post.userReactions.filter((r) => r !== reactionType)
                        : [...post.userReactions.filter((r) => r !== reactionType), reactionType]

                    const newReactions = { ...post.reactions }
                    if (hasReacted) {
                        newReactions[reactionType as keyof typeof newReactions]--
                    } else {
                        newReactions[reactionType as keyof typeof newReactions]++
                    }

                    return {
                        ...post,
                        reactions: newReactions,
                        userReactions: newUserReactions,
                    }
                }
                return post
            }),
        )
    }

    const handleComment = (postId: string, content: string) => {
        setPosts(
            posts.map((post) => {
                if (post.id === postId) {
                    const newComment = {
                        id: Date.now().toString(),
                        author: "You",
                        content,
                        createdAt: new Date(),
                    }
                    return {
                        ...post,
                        comments: [...post.comments, newComment],
                    }
                }
                return post
            }),
        )
    }

    if (loading) {
        return (
            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="post-card p-6 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-20 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No posts found for the selected subject.</p>
                </div>
            ) : (
                filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} onReaction={handleReaction} onComment={handleComment} />
                ))
            )}
        </div>
    )
}
