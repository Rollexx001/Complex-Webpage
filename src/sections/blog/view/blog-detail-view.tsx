import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import type { IPostItem } from '../post-item';

// ----------------------------------------------------------------------

type Props = {
  post: IPostItem;
  property: string;
};

export function BlogDetailView({ post, property }: Props) {
  const navigate = useNavigate();

  const getPropertyData = () => {
    const propertyMap: Record<string, any> = {
      comments: {
        title: 'Comments',
        count: post.totalComments,
        icon: 'solar:chat-round-dots-bold',
        description: 'Users who commented on this post',
      },
      views: {
        title: 'Views',
        count: post.totalViews,
        icon: 'solar:eye-bold',
        description: 'Total views received by this post',
      },
      shares: {
        title: 'Shares',
        count: post.totalShares,
        icon: 'solar:share-bold',
        description: 'Times this post has been shared',
      },
    };
    return propertyMap[property] || propertyMap.comments;
  };

  const data = getPropertyData();

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate('/blog')}
          startIcon={<Iconify icon="solar:restart-bold" />}
        >
          Back to Blog
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Post Card */}
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Card>
            <CardMedia component="img" height="300" image={post.coverUrl} alt={post.title} />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {post.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <Avatar src={post.author.avatarUrl} alt={post.author.name} />
                <Box>
                  <Typography variant="subtitle2">{post.author.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {fDate(post.postedAt)}
                  </Typography>
                </Box>
              </Box>

              {/* Stats */}
              <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
                <Chip
                  icon={<Iconify icon="solar:chat-round-dots-bold" width={16} />}
                  label={`${fShortenNumber(post.totalComments)} Comments`}
                  variant="outlined"
                />
                <Chip
                  icon={<Iconify icon="solar:eye-bold" width={16} />}
                  label={`${fShortenNumber(post.totalViews)} Views`}
                  variant="outlined"
                />
                <Chip
                  icon={<Iconify icon="solar:share-bold" width={16} />}
                  label={`${fShortenNumber(post.totalShares)} Shares`}
                  variant="outlined"
                />
                <Chip
                  icon={<Iconify icon="solar:share-bold" width={16} />}
                  label={`${fShortenNumber(post.totalFavorites)} Favorites`}
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Property Details Card */}
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 4,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              color: 'white',
            }}
          >
            <Iconify
              icon={data.icon}
              width={80}
              height={80}
              sx={{ mb: 2, opacity: 0.8 }}
            />
            <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
              {data.title}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              {fShortenNumber(data.count)}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', opacity: 0.9 }}>
              {data.description}
            </Typography>

            <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid rgba(255,255,255,0.3)', width: '100%' }}>
              <Typography variant="subtitle2" sx={{ mb: 2, textAlign: 'center' }}>
                Post Engagement Summary
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{fShortenNumber(post.totalComments)}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Comments
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{fShortenNumber(post.totalViews)}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Views
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{fShortenNumber(post.totalShares)}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Shares
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
