#!/usr/bin/env python3
"""
Manual YouTube Setup for MAONO Videos
Alternative approach for uploading videos to YouTube
"""

import os
import json
from pathlib import Path

def create_video_metadata():
    """Create metadata for all MAONO videos"""
    
    videos_metadata = {
        "maono-intro.mp4": {
            "title": "MAONO: Revolutionary Agricultural Intelligence Platform",
            "description": "Discover how MAONO is transforming agriculture across Africa with AI-powered insights, satellite monitoring, and blockchain technology. Join the agricultural revolution!",
            "tags": ["agriculture", "AI", "farming", "technology", "Africa", "MAONO", "agricultural intelligence", "smart farming"],
            "category": "People & Blogs",
            "privacy": "unlisted"
        },
        "agricultural-challenges.mp4": {
            "title": "The Challenges Facing African Agriculture",
            "description": "Explore the critical issues smallholder farmers face across Africa: unpredictable weather, limited market access, and lack of modern farming techniques. See how MAONO provides solutions.",
            "tags": ["agriculture", "Africa", "farming challenges", "smallholder farmers", "weather", "market access", "MAONO"],
            "category": "Education",
            "privacy": "unlisted"
        },
        "maono-solution.mp4": {
            "title": "The MAONO Solution: Empowering Farmers with Smart Technology",
            "description": "Learn how MAONO provides AI-driven weather forecasts, satellite-based pest detection, personalized farming advice, and blockchain-powered marketplace for fair trade.",
            "tags": ["MAONO", "agricultural solution", "AI farming", "satellite monitoring", "blockchain", "smart agriculture", "technology"],
            "category": "Science & Technology",
            "privacy": "unlisted"
        },
        "technology-stack.mp4": {
            "title": "MAONO Technology Stack: Cutting-Edge Innovation",
            "description": "Discover the powerful technology behind MAONO: React frontend, Python AI/ML backend, blockchain security, and cloud scalability for global agricultural transformation.",
            "tags": ["technology", "React", "Python", "AI", "blockchain", "cloud computing", "agricultural tech", "MAONO"],
            "category": "Science & Technology",
            "privacy": "unlisted"
        },
        "impact-stories.mp4": {
            "title": "MAONO Impact: Building on Success, Taking It Further",
            "description": "See how MAONO builds on platforms like DigiFarm, providing even more precise AI and satellite monitoring, personal farm experts, and blockchain fair pricing for farmers.",
            "tags": ["impact", "success stories", "DigiFarm", "AI precision", "satellite monitoring", "blockchain", "MAONO", "agricultural impact"],
            "category": "People & Blogs",
            "privacy": "unlisted"
        },
        "future-vision.mp4": {
            "title": "MAONO Future Vision: Scaling for Sustainable Tomorrow",
            "description": "Explore MAONO's vision for the future: drone integration, global expansion, climate resilience, and partnerships to empower millions of farmers worldwide.",
            "tags": ["future", "vision", "drone technology", "global expansion", "climate resilience", "sustainability", "MAONO", "agricultural future"],
            "category": "Science & Technology",
            "privacy": "unlisted"
        }
    }
    
    return videos_metadata

def create_upload_instructions():
    """Create step-by-step upload instructions"""
    
    instructions = {
        "method": "Manual YouTube Upload",
        "steps": [
            "1. Go to https://www.youtube.com/upload",
            "2. Sign in to your YouTube account",
            "3. For each video, follow these steps:",
            "   a. Click 'Select files to upload'",
            "   b. Choose the video file from public/videos/",
            "   c. Use the provided title and description",
            "   d. Set privacy to 'Unlisted'",
            "   e. Add the provided tags",
            "   f. Click 'Publish'",
            "4. Copy the video ID from the URL after upload",
            "5. Update the code with the video IDs"
        ],
        "videos": create_video_metadata()
    }
    
    return instructions

def main():
    """Main function to set up manual YouTube upload"""
    
    print("🎬 MAONO Manual YouTube Upload Setup")
    print("====================================")
    print()
    
    # Create upload instructions
    instructions = create_upload_instructions()
    
    # Save instructions to file
    with open("youtube_upload_instructions.json", "w") as f:
        json.dump(instructions, f, indent=2)
    
    print("📋 Manual Upload Instructions Created!")
    print("   File: youtube_upload_instructions.json")
    print()
    
    # Display video information
    print("🎥 Videos to Upload:")
    print("===================")
    
    for i, (filename, metadata) in enumerate(instructions["videos"].items(), 1):
        print(f"\n{i}. {filename}")
        print(f"   Title: {metadata['title']}")
        print(f"   Privacy: {metadata['privacy']}")
        print(f"   Tags: {', '.join(metadata['tags'][:3])}...")
    
    print("\n📱 Next Steps:")
    print("1. Go to https://www.youtube.com/upload")
    print("2. Upload each video with the provided metadata")
    print("3. Set all videos to 'Unlisted'")
    print("4. Copy the video IDs from the URLs")
    print("5. Run: python3 scripts/update-video-ids.py")
    print()
    
    print("💡 Pro Tip: Upload videos one by one to avoid confusion!")
    print("   Each video will get a unique ID like: dQw4w9WgXcQ")

if __name__ == "__main__":
    main()
