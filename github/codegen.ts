import { CodegenConfig } from '@graphql-codegen/cli';
 
const config: CodegenConfig = {
  schema: [
    {
      'https://api.github.com/graphql': {
        headers: {
          Authorization: `bearer ${process.env.ACCESS_TOKEN}`,
        }
      }
    }
  ],
  generates: {
    './github/query.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      config: {
        namingConvention: {
          typeNames: 'change-case-all#pascalCase',
          transformUnderscore: true,
          enumValues: 'keep',
          rawRequest: true
        }
      }
    }
  }
};
export default config;
 