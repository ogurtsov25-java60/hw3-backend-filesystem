import fs from "node:fs/promises";
import { parse } from "csv-parse/sync";
import {
    calculate_average_fares_by_class,
    calculate_total_quantity_survived_non_survived, calculate_total_quantity_survived_non_survived_by_gender,
    calculateTotalFares
} from "./actions.js";

async function loadCsvWithNumbers(path) {
    const fileContent = await fs.readFile(path, "utf8");

    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });

    return records.map(row =>
        Object.fromEntries(
            Object.entries(row).map(([k, v]) =>
                [k, v === "" ? null : (isNaN(v) ? v : Number(v))]
            )
        )
    );
}

const data = await loadCsvWithNumbers("../train.csv");



fs.appendFile('./result.txt', `1.Total fares:${calculateTotalFares(data)} 
2.Average fare for 1,2,3 classes of travel:${JSON.stringify(calculate_average_fares_by_class(data), null)}
3.Total quantity of survived and non survived passengers:${JSON.stringify(calculate_total_quantity_survived_non_survived(data),null)} 
4.Total quantity of survived and non survived passengers by gender: ${JSON.stringify(calculate_total_quantity_survived_non_survived_by_gender(data),null)}
 `  ,  (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('File updated successfully!');
    }
})


