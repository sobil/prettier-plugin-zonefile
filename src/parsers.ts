import { Parser } from "prettier"

interface ZoneFileRecord {
    directive: string
    comment: string,
    name: string,
    ttl: number,
    recordClass: string,
    recordType: string,
    recordData: string
}
const whitespace = /[\xa0\s\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000]*/



const parseDirective = (name: string, entry: string, lineNumber) => {

    return {
        type: "Directive",
        name: entry.split(/[ \t]{1,}/, 2)[0],
        value: entry.split(/[ \t]{1,}/, 2)[1].split(/;/, 2)[0],
        comment: parseComment(entry, lineNumber),
        lineNumber: lineNumber,
        raw: entry,
    }
}

const parseComment = (entry: string, lineNumber: number) => {
    if (!/;/.test(entry)) return ''
    const comment = entry.split(";",2)[1]
    return {
        type: "Comment",
        length: entry.length,
        comment,
        raw: entry,
    }
}


const parseINRecords = (name: string, entry: string, lineNumber) => {
    const records = []
    entry.split('\n').forEach((line, index) => {
        records.push(!line.split(";", 2)[0] ? parseComment(line, lineNumber + index) : {
            type: "IN",
            name: name,
            value: entry.split(/[ \t]{1,}/, 2)[1],
            comment: parseComment(entry, lineNumber),
            lineNumber: lineNumber,
            raw: entry,

        })
    })
    return records

}

const parseEntry = (entry: string, lineNumber: number) => {
    const name = /^[^\s;]*/.exec(entry)[0]

    if (name.startsWith("$")) {
        return parseDirective(name, entry, lineNumber)
    }
    if (/[^\s]*[\t ]{1,}IN/) {
        return parseINRecords(name, entry, lineNumber)
    }
}

export const zonefile: Parser = {
    parse: (text, parsers) => {
        let zonefile = []
        text.split(/[\n](?![ \t\n;])/).forEach((entry, index) => {
            const parsed = parseEntry(entry, index + 1)
            if (Array.isArray(parsed)) {
                zonefile = zonefile.concat(parsed)
            }
            else {
                zonefile.push(parsed)
            };
        })
        return {
            startPosition: 0,
            endPosition: text.length,
            zonefile,
            errors: []
        }
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