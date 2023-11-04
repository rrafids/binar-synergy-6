import path from 'path';

export default (fullname: string): { base: string; ext: string } => {
  return {
    base: path.basename(fullname, path.extname(fullname)),
    ext: path.extname(fullname),
  };
};
