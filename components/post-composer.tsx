"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon, Video, HelpCircle, BookOpen, X } from "lucide-react"
import { useAuth } from "./auth-provider"
import { useToast } from "@/hooks/use-toast"

export function PostComposer() {
    const { user } = useAuth()
    const { toast } = useToast()
    const [content, setContent] = useState("")
    const [postType, setPostType] = useState<"general" | "question" | "resource">("general")
    const [subject, setSubject] = useState("")
    const [images, setImages] = useState<File[]>([])
    const [video, setVideo] = useState<File | null>(null)
    const [isPosting, setIsPosting] = useState(false)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (images.length + files.length > 5) {
            toast({
                title: "Too many images",
                description: "You can upload a maximum of 5 images per post.",
                variant: "destructive",
            })
            return
        }
        setImages([...images, ...files])
    }

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                // 10MB limit
                toast({
                    title: "File too large",
                    description: "Video files must be under 10MB.",
                    variant: "destructive",
                })
                return
            }
            setVideo(file)
        }
    }

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index))
    }

    const removeVideo = () => {
        setVideo(null)
    }

    const handlePost = async () => {
        if (!content.trim() || !subject) {
            toast({
                title: "Missing information",
                description: "Please add content and select a subject.",
                variant: "destructive",
            })
            return
        }

        setIsPosting(true)

        // Simulate posting delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Reset form
        setContent("")
        setPostType("general")
        setSubject("")
        setImages([])
        setVideo(null)
        setIsPosting(false)

        toast({
            title: "Post created!",
            description: "Your post has been shared with the community.",
        })
    }

    const getPostTypeIcon = () => {
        switch (postType) {
            case "question":
                return <HelpCircle className="h-4 w-4" />
            case "resource":
                return <BookOpen className="h-4 w-4" />
            default:
                return null
        }
    }

    return (
        <Card className="post-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.profileImage || "/placeholder.svg"} alt={user?.displayName} />
                        <AvatarFallback>
                            {user?.displayName
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("") || "U"}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-base">Share with your study community</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Post Type & Subject */}
                <div className="grid grid-cols-2 gap-4">
                    <Select value={postType} onValueChange={(value: any) => setPostType(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Post type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="general">General Post</SelectItem>
                            <SelectItem value="question">Question</SelectItem>
                            <SelectItem value="resource">Resource Share</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={subject} onValueChange={setSubject}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Mathematics">Mathematics</SelectItem>
                            <SelectItem value="Physics">Physics</SelectItem>
                            <SelectItem value="Chemistry">Chemistry</SelectItem>
                            <SelectItem value="Biology">Biology</SelectItem>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                            <SelectItem value="Psychology">Psychology</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        {getPostTypeIcon()}
                        <Badge variant="outline" className="text-xs">
                            {postType === "general" ? "General Post" : postType === "question" ? "Question" : "Resource"}
                        </Badge>
                    </div>
                    <Textarea
                        placeholder={
                            postType === "question"
                                ? "What would you like help with? Be specific about your question..."
                                : postType === "resource"
                                    ? "Share study materials, notes, or helpful resources..."
                                    : "Share your thoughts, study updates, or connect with fellow students..."
                        }
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        className="resize-none"
                    />
                </div>

                {/* Media Preview */}
                {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={URL.createObjectURL(image) || "/placeholder.svg"}
                                    alt={`Upload ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg"
                                />
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    className="absolute top-1 right-1 h-6 w-6 p-0"
                                    onClick={() => removeImage(index)}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                {video && (
                    <div className="relative">
                        <video src={URL.createObjectURL(video)} className="w-full h-48 object-cover rounded-lg" controls />
                        <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 right-2 h-6 w-6 p-0"
                            onClick={removeVideo}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <input
                            type="file"
                            id="image-upload"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById("image-upload")?.click()}
                            disabled={images.length >= 5}
                        >
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Images ({images.length}/5)
                        </Button>

                        <input type="file" id="video-upload" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById("video-upload")?.click()}
                            disabled={!!video}
                        >
                            <Video className="h-4 w-4 mr-2" />
                            {video ? "Video Added" : "Video"}
                        </Button>
                    </div>

                    <Button onClick={handlePost} disabled={isPosting || !content.trim() || !subject} className="academic-primary">
                        {isPosting ? "Posting..." : "Post"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
