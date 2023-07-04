import * as tsConfigPaths from 'tsconfig-paths';

const baseUrl = './dist';
const paths = {
  '@api/*': ['src/api/*'],
  '@config/*': ['src/config/*'],
};

tsConfigPaths.register({
  baseUrl,
  paths,
});
