"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
    ThumbsUp,
    Lightbulb,
    Flame,
    CheckCircle,
    MessageCircle,
    Share2,
    HelpCircle,
    BookOpen,
    MoreHorizontal,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface PostCardProps {
    post: {
        id: string
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
    onReaction: (postId: string, reactionType: string) => void
    onComment: (postId: string, content: string) => void
}

export function PostCard({ post, onReaction, onComment }: PostCardProps) {
    const [showComments, setShowComments] = useState(false)
    const [newComment, setNewComment] = useState("")

    const getPostTypeIcon = () => {
        switch (post.type) {
            case "question":
                return <HelpCircle className="h-4 w-4 text-blue-600" />
            case "resource":
                return <BookOpen className="h-4 w-4 text-emerald-600" />
            default:
                return null
        }
    }

    const getPostTypeBadge = () => {
        switch (post.type) {
            case "question":
                return (
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                        Question {post.isResolved && "• Resolved"}
                    </Badge>
                )
            case "resource":
                return (
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                        Resource
                    </Badge>
                )
            default:
                return null
        }
    }

    const handleSubmitComment = () => {
        if (newComment.trim()) {
            onComment(post.id, newComment)
            setNewComment("")
        }
    }

    const reactionButtons = [
        { type: "like", icon: ThumbsUp, label: "Like", count: post.reactions.like },
        { type: "helpful", icon: Lightbulb, label: "Helpful", count: post.reactions.helpful },
        { type: "motivating", icon: Flame, label: "Motivating", count: post.reactions.motivating },
        { type: "solved", icon: CheckCircle, label: "Solved", count: post.reactions.solved },
    ]

    return (
        <Card className="post-card">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={post.author.profileImage || "/placeholder.svg"} alt={post.author.displayName} />
                            <AvatarFallback>
                                {post.author.displayName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-sm">{post.author.displayName}</h3>
                                {getPostTypeIcon()}
                            </div>
                            <p className="text-xs text-gray-500">
                                @{post.author.username} • {post.author.university}
                            </p>
                            <p className="text-xs text-gray-400">{formatDistanceToNow(post.createdAt, { addSuffix: true })}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {getPostTypeBadge()}
                        <Badge variant="secondary" className="text-xs">
                            {post.subject}
                        </Badge>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Content */}
                <p className="text-gray-900 leading-relaxed">{post.content}</p>

                {/* Media */}
                {post.images.length > 0 && (
                    <div
                        className={`grid gap-2 ${post.images.length === 1
                                ? "grid-cols-1"
                                : post.images.length === 2
                                    ? "grid-cols-2"
                                    : "grid-cols-2 md:grid-cols-3"
                            }`}
                    >
                        {post.images.map((image, index) => (
                            <img
                                key={index}
                                src={image || "/placeholder.svg"}
                                alt={`Post image ${index + 1}`}
                                className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            />
                        ))}
                    </div>
                )}

                {post.video && <video src={post.video} controls className="w-full rounded-lg" style={{ maxHeight: "400px" }} />}

                {/* Reactions */}
                <div className="flex items-center gap-2 pt-2 border-t">
                    {reactionButtons.map(({ type, icon: Icon, label, count }) => (
                        <Button
                            key={type}
                            variant="ghost"
                            size="sm"
                            className={`reaction-button ${post.userReactions.includes(type) ? "active" : ""}`}
                            onClick={() => onReaction(post.id, type)}
                        >
                            <Icon className="h-4 w-4" />
                            <span>{count}</span>
                        </Button>
                    ))}

                    <Button
                        variant="ghost"
                        size="sm"
                        className="reaction-button ml-auto"
                        onClick={() => setShowComments(!showComments)}
                    >
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments.length}</span>
                    </Button>

                    <Button variant="ghost" size="sm" className="reaction-button">
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>

                {/* Comments */}
                {showComments && (
                    <div className="space-y-3 pt-3 border-t">
                        {post.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                                <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs">
                                        {comment.author
                                            .split(" ")
                                            .map((n: string) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <p className="font-medium text-xs">{comment.author}</p>
                                        <p className="text-sm text-gray-900">{comment.content}</p>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Add Comment */}
                        <div className="flex gap-3">
                            <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">You</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                                <Textarea
                                    placeholder="Write a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    rows={2}
                                    className="resize-none text-sm"
                                />
                                <Button
                                    size="sm"
                                    onClick={handleSubmitComment}
                                    disabled={!newComment.trim()}
                                    className="academic-primary"
                                >
                                    Comment
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
