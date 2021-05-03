"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const federation_1 = require("@apollo/federation");
const graphql_tools_1 = require("graphql-tools");
/*
 * These are the fields and types that will be stripped from the printed
 * schema.
 */
const FEDERATION_QUERY_FIELDS = ["_entities", "_service"];
const FEDERATION_TYPE_NAMES = ["_Any", "_FieldSet", "_Service"];
// For memoization:
let lastSchema;
let lastPrint;
/**
 * When we print the federated schema we need to transform it to remove the
 * Apollo Federation fields (whilst keeping the directives). We need to use the
 * special `printSchema` function from the `@apollo/federation` package because
 * GraphQL's `printSchema` does not include directives.
 *
 * We've added simple memoization for performance reasons; better memoization
 * may be needed if you're dealing with multiple concurrent GraphQL schemas.
 */
function printFederatedSchema(schema) {
    // If the schema is new or has changed, recalculate.
    if (schema !== lastSchema) {
        lastSchema = schema;
        /**
         * The Apollo federation spec states:
         *
         * > The federation schema modifications (i.e. new types and directives)
         * > should not be included in this SDL.
         *
         * But we need these fields in the schema for resolution to work, so we're
         * removing them from the schema that gets printed only.
         */
        const schemaSansFederationFields = graphql_tools_1.wrapSchema({
            schema,
            transforms: [
                // Remove the federation fields:
                new graphql_tools_1.TransformRootFields((operation, fieldName, _field) => {
                    if (operation === "Query" &&
                        FEDERATION_QUERY_FIELDS.includes(fieldName)) {
                        // Federation query fields: remove (null).
                        return null;
                    }
                    // No change (undefined).
                    return undefined;
                }),
                // Remove the federation types:
                new graphql_tools_1.FilterTypes((type) => !FEDERATION_TYPE_NAMES.includes(type.name)),
            ],
        });
        // Print the schema, including the federation directives.
        lastPrint = federation_1.printSchema(schemaSansFederationFields);
    }
    return lastPrint;
}
exports.default = printFederatedSchema;
//# sourceMappingURL=printFederatedSchema.js.map