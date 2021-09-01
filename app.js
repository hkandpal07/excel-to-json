const fs = require('fs');

const xlsx = require('node-xlsx');

const filePath = process.argv[2];
const sheetName = process.argv[3]; 

const getWorksheet = (path, sheetName) => {
    try {
        const worksheet = xlsx.parse(path);

        if(!sheetName) {
            return worksheet[0].data;
        } 

        const sheetIndex = worksheet.findIndex(el => el.name === sheetName);

        if(sheetIndex === -1) {
            throw 'Invalid Sheet Name!';
        }
        
        return worksheet[sheetIndex].data;
    } catch(err) {
        throw `Error: ${err}`
    }
};

const buildApiCall = (filePath, sheetName) => {
    try {
        const data = getWorksheet(filePath, sheetName);

        const apiJSONArray  = [];

        const entityIdIndex = data[0].findIndex(el => el === 'Venue ID');
        const accountIdIndex = data[0].findIndex(el => el === 'Account ID');
        const localeIndex = data[0].findIndex(el => el === 'Locale');

        if (entityIdIndex === -1 || accountIdIndex === -1 || localeIndex === -1) {
            throw `Invalid column name(s). Sheet needs to have "Venue ID", "Account ID" and "Locale" column names.`;
        }

        const iterationDataset = data.slice(1,data.length);

        for (const record of iterationDataset) {
            apiJSONArray.push({
                entityId: record[entityIdIndex],
                accountId: record[accountIdIndex],
                localeIndex: record[localeIndex]
            })
        }

        fs.writeFileSync('apiCallJSON.json', JSON.stringify(apiJSONArray));

    } catch(err) {
        console.error(err);
    }
}

buildApiCall(filePath, sheetName);