/*
Design a spreadsheet which can support two operations: setting cell values, and getting cell values. Cells are indexed as they are in a conventional spreadsheet.

setCell("A1", "13")
setCell("A2", "1")
setCell("A4", "=A1+A2+12")
getCell("A4") // should return → 26

Cell values are set with strings containing either a formula or number, formatted like the example above. Getting a cell must return the current numerical value of the expression in the cell. For this problem, assume formulas contain only addition.
*/

function isNumber(s: string) {
    return !isNaN(Number(s))
}
  
class Spreadsheet {
    spreadsheet: {[key: string]: string} = {};
  
    constructor() {
        this.spreadsheet = {};
    }
  
    setCell(cell: string, value: string) {
        this.spreadsheet[cell] = value;
    }
  
    getCell(cell: string) {
        let value = this.spreadsheet[cell];

        if (value == undefined) return ''; 

        else if (value.includes('=')) {
        const cells = value.slice(1).split('+');
        let valueTotal = 0;
        cells.forEach(e => {
            if (isNumber(e)) {
                valueTotal += Number(e)
            } else {
                const spreadsheetVal = this.getCell(e);
                valueTotal += Number(spreadsheetVal)
            }
        }) 
            return valueTotal
        } else {
            return Number(value);
        } 
    }
}

  
const spreadsheet = new Spreadsheet()

spreadsheet.setCell("A1", "13")
spreadsheet.setCell("A2", "1")
spreadsheet.setCell("A4", "=A1+A2+12")

console.log((spreadsheet.getCell("A1")))
console.log((spreadsheet.getCell("A2")))
console.log((spreadsheet.getCell("A4")))
