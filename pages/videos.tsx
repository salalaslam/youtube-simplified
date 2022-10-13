import { useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import {
  Avatar,
  Container,
  Fab,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { initializeApollo } from '../lib/apollo';
import { VideosDocument } from '../lib/graphql-operations';

const Index = () => {
  const { data } = useQuery(VideosDocument);

  const viewer = data?.videos;

  const router = useRouter();
  return viewer ? (
    <Container sx={{ my: 5 }} maxWidth='sm'>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography variant='h4'>Videos list</Typography>
            <Fab
              color='primary'
              onClick={() => router.push('/upload')}
              size='small'
            >
              <Add />
            </Fab>
          </Box>
          <List>
            {viewer.map((video, i) => (
              <ListItemButton key={i}>
                <ListItemAvatar>
                  <Avatar src={video.thumbnail} />
                </ListItemAvatar>
                <ListItemText
                  primary={video.title}
                  secondary={video.description}
                />
              </ListItemButton>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  ) : null;
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: VideosDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
