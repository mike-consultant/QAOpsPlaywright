const { test, expect } = require('@playwright/test');
const ExcelJs = require('exceljs');

async function writeExcel(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook();

    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');

    const output = readExcel(worksheet, searchText);

    if (output.row !== -1 && output.column !== -1) {
        worksheet.getCell(
            output.row + change.rowChange,
            output.column + change.colChange
        ).value = replaceText;

        await workbook.xlsx.writeFile(filePath);
        console.log("Excel file updated successfully.");
    } else {
        console.log(`${searchText} was not found.`);
    }
}

function readExcel(worksheet, searchText) {
    for (let i = 1; i <= worksheet.rowCount; i++) {
        const row = worksheet.getRow(i);

        for (let j = 1; j <= row.cellCount; j++) {
            const cell = row.getCell(j);

            if (cell.value === searchText) {
                console.log(`Row ${i}, Column ${j}: ${cell.value}`);
                return { row: i, column: j };
            }
        }
    }

    return { row: -1, column: -1 };
}

test('Upload and Download Excel Validation', async ({ page }) => {
    const updateValue = '350';
    const textSearch = "Mango";
    const filePath = "C:\\Users\\MiguelCruz\\Downloads\\download.xlsx";

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    const downloadPromise = page.waitForEvent('download');
    await page.locator("#downloadButton").click();

    const download = await downloadPromise;
    await download.saveAs(filePath);

    await writeExcel(
        textSearch,
        updateValue,
        { rowChange: 0, colChange: 2 },
        filePath
    );

    await page.locator("#fileinput").setInputFiles(filePath);

    const textLocator = page.getByText(textSearch);
    const desiredRow = page.getByRole("row").filter({ has: textLocator });

    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

    await page.pause();
});

