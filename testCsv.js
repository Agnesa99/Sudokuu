const csv = require("csv-parser");
const fs = require("fs");

const getCsvData = (path, callback) => {
  let sudokuBoard = [];
  let bodyValues = [];
  try {
    fs.createReadStream(path)
      .pipe(csv())
      .on("headers", (header) => sudokuBoard.push(header))
      .on("data", (data) => bodyValues.push(data))
      .on("end", () => {
        bodyValues.forEach((element) => {
          sudokuBoard.push(Object.values(element));
        });
        callback(sudokuBoard);
      });
  } catch (error) {
    console.log(error);
  }
};


function notInRow(arr, row) {
  let st = new Set();

  for (let i = 0; i < 9; i++) {
    if (st.has(arr[row][i])) return false;
     st.add(arr[row][i]);
  }
  return true;
}

function notInCol(arr, col) {
  let st = new Set();

  for (let i = 0; i < 9; i++) {
    if (st.has(arr[i][col])) return false;
    st.add(arr[i][col]);
  }
  return true;
}

function notInBox(arr, startRow, startCol) {
  let st = new Set();

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      let curr = arr[row + startRow][col + startCol];

      if (st.has(curr)) return false;

       st.add(curr);
    }
  }
  return true;
}


function isValid(arr, row, col) {
  return (
    notInRow(arr, row) &&
    notInCol(arr, col) &&
    notInBox(arr, row - (row % 3), col - (col % 3))
  );
}

function isValidConfig(arr) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!isValid(arr, i, j)) return false;
    }
  }
  return true;
}



getCsvData("./rowError.csv", (data) => {
  console.log(data);
  console.log(isValidConfig(data) ? "True" : "False") 
});