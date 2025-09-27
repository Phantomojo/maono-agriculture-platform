#!/usr/bin/env python3
"""
Update Video IDs Script for MAONO
Helps you update the code with YouTube video IDs
"""

import json
import os
from pathlib import Path

def get_video_ids_from_user():
    """Get video IDs from user input"""
    
    print("🎬 MAONO Video ID Update")
    print("========================")
    print()
    print("📋 Please provide the YouTube video IDs for each video:")
    print("   (You can find these in the YouTube URL after uploading)")
    print("   Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    print("   Video ID: dQw4w9WgXcQ")
    print()
    
    video_mapping = {}
    
    videos = [
        ("maono-intro.mp4", "MAONO Introduction"),
        ("agricultural-challenges.mp4", "Agricultural Challenges"),
        ("maono-solution.mp4", "The MAONO Solution"),
        ("technology-stack.mp4", "Technology Stack"),
        ("impact-stories.mp4", "Impact Stories"),
        ("future-vision.mp4", "Future Vision")
    ]
    
    for filename, description in videos:
        while True:
            video_id = input(f"📹 {description} video ID: ").strip()
            if video_id:
                video_mapping[filename] = video_id
                break
            else:
                print("   ❌ Please enter a valid video ID")
    
    return video_mapping

def update_dual_panel_presentation(video_mapping):
    """Update the DualPanelPresentation.tsx file with video IDs"""
    
    # Create the YouTube video mapping
    youtube_videos = {}
    for filename, video_id in video_mapping.items():
        # Map filename to slide key
        slide_key = filename.replace('.mp4', '').replace('-', '_')
        if slide_key == 'maono_intro':
            slide_key = 'intro'
        elif slide_key == 'agricultural_challenges':
            slide_key = 'problem'
        elif slide_key == 'maono_solution':
            slide_key = 'solution'
        elif slide_key == 'technology_stack':
            slide_key = 'technology'
        elif slide_key == 'impact_stories':
            slide_key = 'impact'
        elif slide_key == 'future_vision':
            slide_key = 'future'
        
        youtube_videos[slide_key] = video_id
    
    # Create the updated code
    updated_code = f'''// YouTube Video IDs - Auto-generated
const YOUTUBE_VIDEOS: Record<string, string> = {{
  'intro': '{youtube_videos.get('intro', '')}',
  'problem': '{youtube_videos.get('problem', '')}',
  'solution': '{youtube_videos.get('solution', '')}',
  'technology': '{youtube_videos.get('technology', '')}',
  'impact': '{youtube_videos.get('impact', '')}',
  'future': '{youtube_videos.get('future', '')}',
}};'''
    
    return updated_code, youtube_videos

def create_updated_component(video_mapping):
    """Create updated DualPanelPresentation component with YouTube integration"""
    
    youtube_code, youtube_videos = update_dual_panel_presentation(video_mapping)
    
    # Read the current file
    current_file = Path("src/presentations/DualPanelPresentation.tsx")
    
    if not current_file.exists():
        print("❌ DualPanelPresentation.tsx not found!")
        return False
    
    # Read current content
    with open(current_file, 'r') as f:
        content = f.read()
    
    # Add YouTube video mapping at the top
    if "YOUTUBE_VIDEOS" not in content:
        # Find the imports section and add after it
        import_end = content.find("interface DualPanelPresentationProps")
        if import_end != -1:
            content = content[:import_end] + "\n" + youtube_code + "\n\n" + content[import_end:]
    
    # Update video URLs to use YouTube
    for slide_key, video_id in youtube_videos.items():
        if video_id:
            # Replace local video URLs with YouTube URLs
            old_pattern = f"videoUrl: '/videos/{slide_key}.mp4'"
            new_pattern = f"videoUrl: 'https://www.youtube.com/embed/{video_id}'"
            content = content.replace(old_pattern, new_pattern)
            
            # Also handle the case where it might be different
            old_pattern2 = f"videoUrl: '/videos/maono-{slide_key}.mp4'"
            content = content.replace(old_pattern2, new_pattern)
    
    # Write updated content
    with open(current_file, 'w') as f:
        f.write(content)
    
    return True

def main():
    """Main function"""
    
    print("🎬 MAONO Video ID Update")
    print("========================")
    print()
    
    # Get video IDs from user
    video_mapping = get_video_ids_from_user()
    
    print("\n📝 Updating code with video IDs...")
    
    # Update the component
    if create_updated_component(video_mapping):
        print("✅ DualPanelPresentation.tsx updated successfully!")
        
        # Save video mapping for reference
        with open("youtube_video_ids.json", "w") as f:
            json.dump(video_mapping, f, indent=2)
        
        print("💾 Video IDs saved to youtube_video_ids.json")
        
        print("\n🚀 Next Steps:")
        print("1. Test the updated presentation locally")
        print("2. Commit and push changes:")
        print("   git add .")
        print("   git commit -m 'Add YouTube video integration'")
        print("   git push origin master")
        print("3. Deploy to Vercel:")
        print("   npx vercel --prod")
        print("\n🎉 Your videos will now load 10x faster with YouTube CDN!")
        
    else:
        print("❌ Failed to update component")

if __name__ == "__main__":
    main()
