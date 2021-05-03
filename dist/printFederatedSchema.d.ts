import { GraphQLSchema } from "graphql";
/**
 * When we print the federated schema we need to transform it to remove the
 * Apollo Federation fields (whilst keeping the directives). We need to use the
 * special `printSchema` function from the `@apollo/federation` package because
 * GraphQL's `printSchema` does not include directives.
 *
 * We've added simple memoization for performance reasons; better memoization
 * may be needed if you're dealing with multiple concurrent GraphQL schemas.
 */
export default function printFederatedSchema(schema: GraphQLSchema): string;
