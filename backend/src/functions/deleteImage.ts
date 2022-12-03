import * as fsPromises from 'fs/promises';

const deleteImage = async (filePath: string) => {
  try {
    await fsPromises.unlink('./uploads/' + filePath);
  } catch (err) {
    console.log(err);
  }
};

export default deleteImage;
