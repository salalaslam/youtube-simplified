import { Resolvers } from './resolvers-types';

const userProfile = {
  id: String(1),
  name: 'John Smith',
  status: 'cached',
};

const video = {
  id: 1,
  title: 'John Smith',
  description: '',
  thumbnail: '',
  file: '',
};

const videosData = [video];

const resolvers: Resolvers = {
  Query: {
    viewer(_parent, _args, _context, _info) {
      return userProfile;
    },
    videos(_parent, _args, _context, _info) {
      return videosData;
    },
  },
  Mutation: {
    updateName(_parent, _args, _context, _info) {
      userProfile.name = _args.name;
      return userProfile;
    },
    addVideo(_parent, _args, _context, _info) {
      let newVideo = Object.assign({}, video);
      newVideo.id = videosData.length + 1;
      newVideo.title = _args.title;
      videosData.push(newVideo);
      return newVideo;
    },
  },
};

export default resolvers;
