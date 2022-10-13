import { useMutation, useQuery } from '@apollo/client';
import { Upload } from '@mui/icons-material';
import {
  Button,
  Container,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import axios, { AxiosProgressEvent } from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { initializeApollo } from '../lib/apollo';
import { AddVideoDocument, VideosDocument } from '../lib/graphql-operations';

const thumbnail = `https://placehold.jp/3d4070/ffffff/150x150.png`;

const Index = () => {
  const { data } = useQuery(VideosDocument);
  const [addVideoMutation] = useMutation(AddVideoDocument);

  const viewer = data?.videos;

  const router = useRouter();

  const ref = React.useRef<HTMLInputElement>(null);

  const handleUploadVideo = () => {
    //
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      description: { value: string };
    };
    const title = target.title.value;
    const description = target.description.value;
    await addVideoMutation({
      variables: {
        title,
        description,
        file: file as string,
        thumbnail,
      },
    });
    router.push('/videos');
  };

  var [progress, setProgress] = React.useState(0);
  var [file, setFile] = React.useState<string | null>(null);
  async function handleChange(files: FileList | null) {
    if (files) {
      setProgress(0);
      const formData = new FormData();
      formData.append('file', files[0]);

      const { data } = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          console.log(progressEvent.loaded, progressEvent.total);
          if (progressEvent && progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            // Update state here
            setProgress(progress);
          }
        },
      });

      setFile(data.file);
    }
  }
  return viewer ? (
    <Container sx={{ my: 5 }} maxWidth='sm'>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography variant='h4' gutterBottom>
              Upload
            </Typography>
          </Box>
          <Box component='form' onSubmit={handleSubmit}>
            <input
              ref={ref}
              type='file'
              name='file'
              style={visuallyHidden}
              onChange={e => handleChange(e.target.files)}
            />
            <Button
              onClick={() => ref.current?.click()}
              variant='outlined'
              startIcon={<Upload />}
              fullWidth
              size='large'
            >
              Upload
            </Button>
            {Boolean(progress) && (
              <LinearProgress value={progress} variant='determinate' />
            )}
            <TextField label='Title' fullWidth name='title' margin='normal' />
            <TextField
              label='Description'
              fullWidth
              name='description'
              margin='normal'
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button type='submit' variant='contained'>
                Upload
              </Button>
              <Button
                variant='outlined'
                color='inherit'
                onClick={() => router.push('/videos')}
              >
                Back
              </Button>
            </Box>
          </Box>
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
