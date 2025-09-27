#!/usr/bin/env python3
"""
YouTube Upload Script for MAONO Videos
Automatically uploads all presentation videos to YouTube
"""

import os
import sys
import subprocess
from pathlib import Path

def install_youtube_upload():
    """Install youtube-upload if not already installed"""
    try:
        import googleapiclient.discovery
        import googleapiclient.errors
        from google.auth.transport.requests import Request
        from google.oauth2.credentials import Credentials
        from google_auth_oauthlib.flow import InstalledAppFlow
        print("✅ Required packages already installed")
    except ImportError:
        print("📦 Installing required packages...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", 
                              "google-api-python-client", 
                              "google-auth-httplib2", 
                              "google-auth-oauthlib",
                              "youtube-upload"])

def setup_credentials():
    """Setup YouTube API credentials"""
    credentials_file = "client_secrets.json"
    
    if not os.path.exists(credentials_file):
        print("❌ client_secrets.json not found!")
        print("📋 Please follow these steps:")
        print("1. Go to https://console.developers.google.com/")
        print("2. Create a new project")
        print("3. Enable YouTube Data API v3")
        print("4. Create OAuth 2.0 credentials")
        print("5. Download client_secrets.json to this directory")
        return False
    
    print("✅ client_secrets.json found")
    return True

def upload_videos():
    """Upload all MAONO videos to YouTube"""
    
    # Video configurations
    videos = {
        "maono-intro.mp4": {
            "title": "MAONO Introduction - Agricultural Intelligence Platform",
            "description": "Welcome to MAONO, the revolutionary AI-powered agricultural intelligence platform transforming farming across Africa.",
            "tags": "agriculture,AI,farming,technology,Africa,MAONO,introduction"
        },
        "agricultural-challenges.mp4": {
            "title": "Agricultural Challenges in Africa - The Problem We Solve",
            "description": "Understanding the critical challenges facing African agriculture and how MAONO provides solutions.",
            "tags": "agriculture,challenges,Africa,farming,problems,solutions"
        },
        "maono-solution.mp4": {
            "title": "The MAONO Solution - AI-Powered Agriculture",
            "description": "Discover how MAONO's cutting-edge AI technology revolutionizes agricultural practices.",
            "tags": "MAONO,solution,AI,agriculture,technology,innovation"
        },
        "technology-stack.mp4": {
            "title": "Cutting-Edge Technology - How MAONO Works",
            "description": "Explore the advanced technology stack powering MAONO's agricultural intelligence platform.",
            "tags": "technology,AI,satellite,data,agriculture,MAONO"
        },
        "impact-stories.mp4": {
            "title": "Proven Impact - Success Stories from the Field",
            "description": "Real success stories from farmers using MAONO to transform their agricultural practices.",
            "tags": "impact,success,stories,farmers,agriculture,MAONO"
        },
        "future-vision.mp4": {
            "title": "The Future of Agriculture - MAONO's Vision",
            "description": "MAONO's vision for the future of agriculture and sustainable farming practices.",
            "tags": "future,vision,agriculture,sustainability,MAONO"
        }
    }
    
    video_dir = Path("public/videos")
    uploaded_videos = {}
    
    print("🎬 Starting YouTube upload process...")
    print("=" * 50)
    
    for video_file, config in videos.items():
        video_path = video_dir / video_file
        
        if not video_path.exists():
            print(f"❌ Video not found: {video_path}")
            continue
            
        print(f"📤 Uploading: {video_file}")
        print(f"📝 Title: {config['title']}")
        
        try:
            # Use youtube-upload command
            cmd = [
                "youtube-upload",
                "--title", config["title"],
                "--description", config["description"],
                "--tags", config["tags"],
                "--category", "22",  # People & Blogs
                "--privacy", "unlisted",
                "--client-secrets", "client_secrets.json",
                str(video_path)
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                # Extract video ID from output
                video_id = result.stdout.strip().split()[-1]
                uploaded_videos[video_file] = video_id
                print(f"✅ Successfully uploaded: {video_file}")
                print(f"🔗 Video ID: {video_id}")
            else:
                print(f"❌ Failed to upload: {video_file}")
                print(f"Error: {result.stderr}")
                
        except Exception as e:
            print(f"❌ Error uploading {video_file}: {e}")
        
        print("-" * 30)
    
    # Generate code for DualPanelPresentation.tsx
    if uploaded_videos:
        print("\n🎉 Upload completed!")
        print("\n📋 Update your DualPanelPresentation.tsx with these video IDs:")
        print("\nconst YOUTUBE_VIDEOS: Record<string, string> = {")
        
        for video_file, video_id in uploaded_videos.items():
            slide_id = video_file.replace('.mp4', '').replace('-', '_')
            print(f"  '{slide_id}': '{video_id}',")
        
        print("};")
        print("\n🚀 Your videos are now hosted on YouTube with global CDN!")
    else:
        print("❌ No videos were successfully uploaded")

if __name__ == "__main__":
    print("🎬 MAONO YouTube Upload Script")
    print("==============================")
    
    # Install dependencies
    install_youtube_upload()
    
    # Check credentials
    if not setup_credentials():
        sys.exit(1)
    
    # Upload videos
    upload_videos()
