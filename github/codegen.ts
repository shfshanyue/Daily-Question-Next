import { CodegenConfig } from '@graphql-codegen/cli';
 
const config: CodegenConfig = {
  schema: './github/schema.json',
  documents: './github/query.gql',
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
 