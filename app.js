const fs = require('fs');

const xlsx = require('node-xlsx');

const filePath = process.argv[2];
const sheetName = process.argv[3];
const mode = process.argv[4]; 

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

const buildJSON = (filePath, sheetName, mode = '1') => {
    try {
        const data = getWorksheet(filePath, sheetName);

        const jsonArray = [];

        const iterationDataset = data.slice(1,data.length);

        if (mode === '1') {
            const keyArray = data[0];

            for (const record of iterationDataset) {
                let currentObject = {};

                keyArray.forEach((el, index) => {
                    currentObject[el] = record[index];
                });

                jsonArray.push(currentObject);
            }

            fs.writeFileSync('jsonArrayMode1.json', JSON.stringify(jsonArray))
            
        } else {
            const entityIdIndex = data[0].findIndex(el => el === 'Venue ID');
            const accountIdIndex = data[0].findIndex(el => el === 'Account ID');
            const localeIndex = data[0].findIndex(el => el === 'Locale');

            if (entityIdIndex === -1 || accountIdIndex === -1 || localeIndex === -1) {
                throw `Invalid column name(s). Sheet needs to have "Venue ID", "Account ID" and "Locale" column names.`;
            }

            for (const record of iterationDataset) {
                jsonArray.push({
                    entityId: record[entityIdIndex],
                    accountId: record[accountIdIndex],
                    locale: record[localeIndex]
                })
            }

            fs.writeFileSync('jsonArrayMode2.json', JSON.stringify(jsonArray));
        }

    } catch(err) {
        console.error(err);
    }
}

buildJSON(filePath, sheetName, mode);