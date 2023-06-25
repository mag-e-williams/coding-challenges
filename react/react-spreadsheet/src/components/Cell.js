import React from 'react'

import { useState } from 'react'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getColLetter = (col_i) => {
    const n = Math.floor((col_i-1)/ALPHABET.length) - 1
    const i = (col_i-1) % ALPHABET.length
     
    if (n >= 0) {
      return [ALPHABET[n], ALPHABET[i]].join('')
    }
    return ALPHABET[i]
  }
  
  const getColumnIndex = (colLetter) => {
    let index = 0
    for (let i = 0; i < colLetter.length; i++) {
      const char = colLetter[i]
      const position = ALPHABET.indexOf(char) + 1
      index = index * ALPHABET.length + position
    }
    return index
  }

export default function Cell({onChange, grid, cell, row, col, selectedCell, setSelectedCell}) {
    const [focus, setFocus] = useState(false)
    const isLegendCell = row == 0 || col == 0;
    
    const classNames = () => {
      const res = []
      const selectedRow = selectedCell[0]
      const selectedCol = selectedCell[1]
  
      if (isLegendCell){ 
        res.push('spreadsheet-legend')
  
        if (row == selectedRow || col == selectedCol) {
          res.push('selected')
        }
      }
      else {
        res.push('spreadsheet-field')
        if (row == selectedRow && col == selectedCol) {
          res.push('selected')
        }
      }
  
      if (row == 0) res.push('legend-row')
      if (col == 0) res.push('legend-col')
   
      return res.join(' ')
    }
  
    function evalCell(cell) {
      const value = cell.value;
      if (value.startsWith('=')) {
        const formula = value.slice(1); 
        const cellRefPattern = /([A-Z]+)(\d+)/g;
  
        const evaluatedFormula = formula.replace(cellRefPattern, (match, col, row) => {
          const referencedCell = grid[row][getColumnIndex(col)];
          const referencedCellValue = evalCell(referencedCell);
          return String(referencedCellValue);
        });
        try {
          return eval(evaluatedFormula);
        } catch (error) {
          console.error(`Error evaluating formula in cell ${cell}: ${error}`);
          return '#ERROR';
        }
      }  
      return value
    }
  
    function cellValue(cell) {
      if (isLegendCell) {
        if (col == 0 && row ==0) return ''
        else if (col == 0) return row
        return getColLetter(col);
      } 
      return !focus ? evalCell(cell) : cell.value
    } 
  
    function handleFocus() {
      setFocus(true)
      setSelectedCell([row, col])
    }
  
    return (
      <input
        type="text"
        className={classNames()}
        value={cellValue(cell)}
        disabled={isLegendCell}
        onChange={(e) => onChange(e.target.value, row, col)}
        onFocus={() => handleFocus()}
        onBlur={() => setFocus(false)}
      />
    )
  }