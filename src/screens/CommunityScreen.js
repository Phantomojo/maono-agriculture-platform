import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  IconButton,
  Chip,
  AppBar,
  Toolbar,
  Fab,
} from '@mui/material';
import {
  Add as AddIcon,
  ThumbUp as LikeIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunityPosts, addPost, likePost } from '../store/actions/communityActions';

const posts = [
  {
    id: 1,
    author: 'John Mwangi',
    authorAvatar: 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=JM',
    content: 'Just harvested my maize crop! The yield is amazing this season. Anyone else having good results?',
    image: 'https://via.placeholder.com/400x200/4CAF50/FFFFFF?text=Maize+Harvest',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    likes: 12,
    comments: 5,
    liked: false,
  },
  {
    id: 2,
    author: 'Mary Wanjiku',
    authorAvatar: 'https://via.placeholder.com/40x40/FF5722/FFFFFF?text=MW',
    content: 'Sharing a tip: Mulching helps retain soil moisture during dry seasons. It has worked wonders for my tomatoes!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    likes: 8,
    comments: 3,
    liked: true,
  },
  {
    id: 3,
    author: 'Peter Kiprop',
    authorAvatar: 'https://via.placeholder.com/40x40/9C27B0/FFFFFF?text=PK',
    content: 'Looking for advice on organic pest control. Any recommendations for aphids on my beans?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    likes: 6,
    comments: 8,
    liked: false,
  },
];

function CommunityScreen() {
  const dispatch = useDispatch();
  const { posts: communityPosts } = useSelector(state => state.community);
  const [newPost, setNewPost] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  React.useEffect(() => {
    dispatch(fetchCommunityPosts());
  }, [dispatch]);

  const handleAddPost = () => {
    if (newPost.trim()) {
      dispatch(addPost({
        id: Date.now(),
        content: newPost,
        author: 'You',
        authorAvatar: 'https://via.placeholder.com/40x40/2E7D32/FFFFFF?text=U',
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        liked: false,
      }));
      setNewPost('');
      setShowNewPost(false);
    }
  };

  const handleLikePost = (postId) => {
    dispatch(likePost(postId));
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto', position: 'relative' }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#2E7D32', fontWeight: 'bold' }}>
            Community
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        {/* New Post Input */}
        {showNewPost && (
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  onClick={() => setShowNewPost(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddPost}
                  disabled={!newPost.trim()}
                >
                  Post
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Posts */}
        {posts.map((post) => (
          <Card key={post.id} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={post.authorAvatar} sx={{ mr: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {post.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatTime(post.timestamp)}
                  </Typography>
                </Box>
                <IconButton>
                  <MoreIcon />
                </IconButton>
              </Box>

              <Typography variant="body1" sx={{ mb: 2 }}>
                {post.content}
              </Typography>

              {post.image && (
                <Box
                  component="img"
                  src={post.image}
                  alt="Post image"
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 1,
                    mb: 2,
                  }}
                />
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                  onClick={() => handleLikePost(post.id)}
                  color={post.liked ? 'primary' : 'default'}
                >
                  <LikeIcon />
                </IconButton>
                <Typography variant="body2">{post.likes}</Typography>

                <IconButton>
                  <CommentIcon />
                </IconButton>
                <Typography variant="body2">{post.comments}</Typography>

                <IconButton>
                  <ShareIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 80, right: 16 }}
        onClick={() => setShowNewPost(!showNewPost)}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default CommunityScreen;

