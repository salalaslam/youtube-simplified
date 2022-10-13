import { Resolvers } from './resolvers-types';

const userProfile = {
  id: String(1),
  name: 'John Smith',
  status: 'cached',
};

const video = {
  id: 1,
  title: 'John Smith',
  description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  thumbnail: 'https://placehold.jp/3d4070/ffffff/150x150.png',
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
      newVideo.description = _args.description;
      newVideo.thumbnail = _args.thumbnail;
      newVideo.file = _args.thumbnail;
      videosData.push(newVideo);
      return newVideo;
    },
  },
};

export default resolvers;
