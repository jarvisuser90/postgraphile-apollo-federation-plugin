"use strict";
/**
 * These helpers help us to construct AST nodes required for Apollo Federation's printSchema to work.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Directive = exports.ObjectTypeDefinition = exports.StringValue = exports.Name = void 0;
/**
 * Construct AST `name` node required for Apollo Federation's printSchema.
 * @param value The value.
 * @returns The AST name node.
 */
function Name(value) {
    return {
        kind: "Name",
        value,
    };
}
exports.Name = Name;
/**
 * Construct AST `StringValue` node required for Apollo Federation's printSchema.
 * @param value The value.
 * @param block A value indicating whether or not to block.
 * @returns The AST `stringValue` node.
 */
function StringValue(value, block = false) {
    return {
        kind: "StringValue",
        value,
        block: String(block),
    };
}
exports.StringValue = StringValue;
/**
 * Construct AST `ObjectTypeDefinition` node required for Apollo Federation's printSchema.
 * @param spec The field specification.
 * @returns The AST `ObjectTypeDefinition` node.
 */
function ObjectTypeDefinition(spec) {
    return {
        kind: "ObjectTypeDefinition",
        name: Name(spec.name),
        description: spec.description
            ? StringValue(spec.description, true)
            : undefined,
        directives: [],
    };
}
exports.ObjectTypeDefinition = ObjectTypeDefinition;
/**
 * Construct AST `Directive` node required for Apollo Federation's printSchema.
 * @param name The GraphQL directive.
 * @param args The directive args.
 * @returns The AST `Directive` node.
 */
function Directive(name, args = {}) {
    return {
        kind: "Directive",
        name: Name(name),
        arguments: Object.entries(args).map(([argName, value]) => ({
            kind: "Argument",
            name: Name(argName),
            value,
        })),
    };
}
exports.Directive = Directive;
//# sourceMappingURL=AST.js.map