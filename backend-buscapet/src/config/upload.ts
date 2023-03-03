import path from 'path';

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  directory: string;
  config: {
    aws: {
      bucket: string;
    };
  };
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  directory: uploadFolder,
  config: {
    aws: {
      bucket: 'api-buscapet',
    },
  },
} as IUploadConfig;
