import { Printer, doc } from "prettier"

export const zonefileAst: Printer = {
    print: (path,options,print) => {
        const node = path.getValue();
        if (Array.isArray(node)) {
          return doc.builders.concat(path.map(print));
        }
        return options
    }
}
