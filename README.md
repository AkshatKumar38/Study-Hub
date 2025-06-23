# Study Hub

A responsive, modern study collaboration platform built with Next.js, TypeScript, Tailwind CSS, and ShadCN/UI. This project showcases core social features like posts, profile editing, and a subject-focused feed — all with mock authentication.

## Getting Started

### 1. Install Dependencies

 ```bash
 npm install
```

### 2. Run the Development Server

```npm run dev```
* Then open your browser at: http://localhost:3000

### Technologies Used

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS v4
* Lucide React Icons
* shadcn/ui

### Key Features

* User Authentication (Mock)
  Register, log in, and log out functionality
  Handled entirely on the frontend
  User data is stored in localStorage
* Dashboard
  Feed of user-generated posts
  Post types: Questions, resources, general content
  Filter posts by subject via sidebar

* Compose new posts with:
  Text
  Up to 5 images
  One video file (max 10MB)

* User Profile
  View and edit:
  Display name
  University
  Major
  Year
  Bio

* Post Composer
  Drag-and-drop or select media
  Text area with media preview
  Media upload limits enforced

* Toast Notifications
  Instant feedback for login, registration, post actions, etc.
  Responsive Design

