import { Parser } from "prettier"

export const zonefile: Parser = {
    parse: (text, parsers) => {
        const ast = {};

        ast['mappings'] = text.split('/n').forEach((line, index) => {
            return {
                value: line,
                line: index + 1
            }
        })
        ast['endPosition'] = text.length
        return ast
    },
    astFormat: "zonefileAst",
    hasPragma: (text) => {
        return Boolean(text.match(/$;@prettier/))
    },
    locStart: (node) => {
        return 0
    },
    locEnd: (node) => {
        return 0
    },
}