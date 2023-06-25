import React from 'react'


import { useState } from 'react'
import Cell from './Cell';

const ROWS = 20;
const COLS = 20;

const makeGrid = () => {
    return Array(ROWS + 1).fill(0).map((row, row_i) => {
      return (
        Array(COLS + 1).fill(0).map((col, col_i) => {
          return ({
            row: row_i,
            col: col_i,
            value: ''
          })
        })
      )
    })
  }
  

export default function Spreadsheet() {
    const [grid, setGrid] = useState(makeGrid())
    const [selectedCell, setSelectedCell] = useState([1, 1])
    
    function handleCellUpdate(val, row, col) {
      const newGrid = [...grid]
      const cellVal = newGrid[row][col]
  
      newGrid[row][col] = {
        ...cellVal,
        value: val
      }
      setGrid([...newGrid])
    }
  
    return (
      <div className="app">
        {grid.map((row, row_i) => {
          return (
            <div className='row' key={`row_${row_i}`}>
              {row.map((cell, col_i) => {
                return (
                  <Cell 
                    key={`col_${col_i}`}
                    onChange={handleCellUpdate} 
                    grid={grid}
                    selectedCell={selectedCell}
                    setSelectedCell={setSelectedCell}
                    cell={cell} 
                    row={row_i} 
                    col={col_i}
                  />
                )
              })}
            </div>
          )
        } )}
      </div>
    )
}
  