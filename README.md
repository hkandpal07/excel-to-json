# Excel to JSON Converter

## Invocation 

Invoke by passing file name and/or sheet name to command line args as follows

`node app.js <filename.xlsx> <sheetname.xlsx>`

Example usage: 

1. Will pick the first sheet in file if sheet name is not provided => `node app.js baseFile.xlsx`

2. Will pick data from the given sheet name if provided => `node app.js baseFile.xlsx Sheet1`

3. Enclode sheetName or fileName in double quotes if it has spaces => `node app.js "base File.xlsx" "Sheet Name"`

## Result

The resultant json will be printed in a file named `jsonArray.json` in the root of the program