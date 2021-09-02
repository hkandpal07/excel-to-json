# Excel to JSON Converter

## Invocation 

*`"Pie Iesu Domine, dona eis requim"`* 

`*Proceeds to smack the forehead with a cardboard*`

Invoke by passing file name and/or sheet name to command line args as follows

`node app.js <filename.xlsx> <sheetname.xlsx> <mode>`

* Mode 1: Converts all columns to JSON with column headers as key name
* Mode 2: Needs specific column names (Venue ID, Account ID and Locale) to be in the file and will convert them to entityId, accountId and locale as key names in the json.

Example usage: 

1. Will pick the first sheet in file if sheet name is not provided => `node app.js baseFile.xlsx`

2. Will pick data from the given sheet name if provided => `node app.js baseFile.xlsx Sheet1`

3. Enclose sheetName or fileName in double quotes if it has spaces => `node app.js "base File.xlsx" "Sheet Name"`

4. Will default to mode 1 if no mode is provided

## Result

The resultant json will be printed in a file named `jsonArray.json` in the root of the program