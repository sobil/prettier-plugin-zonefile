import { zonefile } from "./parsers"
import { zonefileAst } from "./printers"
import { SupportLanguage } from "prettier"

export const languages: SupportLanguage[] = [
    {
        name: "zonefile",
        parsers: ["zonefile"],
        extensions: ['.zf','.zonefile'],
        vscodeLanguageIds: ['zonefile']
    },
];

export const parsers = { zonefile };
export const printers = { zonefileAst };
