import * as prettier from 'prettier';
import * as FS from 'fs'

describe('zonefile plugin', () => {
    test('should parse an example file without error', () => {
        const testFilename = "./test/example1.zf"
        const testFileContent = FS.readFileSync(testFilename,"utf-8")
        const prettierOutput = prettier.format(testFileContent, { filepath: FS.realpathSync(testFilename),plugins: ["."]})
        expect(prettierOutput).toEqual(testFileContent);
    })
});