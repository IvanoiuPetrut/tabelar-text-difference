const textArea1 = document.getElementById("text1");
const textArea2 = document.getElementById("text2");
const table1 = document.getElementById("table--1");
const table2 = document.getElementById("table--2");
const tableWrapper = document.getElementById("table--wrapper");
const checkDiffBtn = document.getElementById("check-diff-btn");

checkDiffBtn.addEventListener("click", function () {
  if (textArea1.value.length > 0 && textArea2.value.length > 0) {
    let newText1 = textToArray(textArea1.value, "\n");
    let newText2 = textToArray(textArea2.value, "\n");

    for (let i = 0; i < newText1.length; i++) {
      newText1[i] = removeWhiteSpace(newText1[i]);
      newText1[i] = newText1[i].split(" ");
    }
    for (let i = 0; i < newText2.length; i++) {
      newText2[i] = removeWhiteSpace(newText2[i]);
      newText2[i] = newText2[i].split(" ");
    }
    removeTableBody(table1);
    removeTableBody(table2);
    table1.appendChild(generateTableBody(newText1));
    table2.appendChild(generateTableBody(newText2));
    // checkIfTdExists(table1, table2);
    compareTables(table1, table2);
  }
});

function hasTextArea(textArea) {
  if (textArea.value.length > 0) {
    return true;
  } else {
    return false;
  }
}

function textToArray(text, separator = " ") {
  let textArray = text.split(separator);
  return textArray;
}

function removeWhiteSpace(text) {
  let newText = text.replace(/\s+/g, " ");
  return newText;
}

function generateTableBody(data) {
  const tblBody = document.createElement("tbody");

  for (let i = 0; i < data.length; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < data[i].length; j++) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(data[i][j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  return tblBody;
}

function hasTableBody(table) {
  if (table.getElementsByTagName("tbody").length > 0) {
    return true;
  } else {
    return false;
  }
}

function removeTableBody(table) {
  if (hasTableBody(table)) {
    table.removeChild(table.getElementsByTagName("tbody")[0]);
  }
}

function checkIfTdExists(table1, table2) {
  let td1 = table1.getElementsByTagName("td");
  let td2 = table2.getElementsByTagName("td");
  for (let i = 0; i < td1.length; i++) {
    for (let j = 0; j < td2.length; j++) {
      if (td1[i].innerHTML === td2[j].innerHTML) {
        td1[i].classList.add("highlight");
        td2[j].classList.add("highlight");
      }
    }
  }
}

function compareTables(table1, table2) {
  let rows1 = table1.getElementsByTagName("tr");
  let rows2 = table2.getElementsByTagName("tr");
  checkIfRowHasSameTd(rows1, rows2);
}

// function that checks if the row has the same td as the other row
function checkIfRowHasSameTd(rows1, rows2) {
  for (let i = 0; i < rows1.length; i++) {
    for (let j = 0; j < rows2.length; j++) {
      if (compareRowsFirstTd(rows1[i], rows2[j])) {
        rows1[i].classList.add("highlight--row");
        rows2[j].classList.add("highlight--row");
      }
    }
  }
}

function compareRowsFirstTd(row1, row2) {
  let td1 = row1.getElementsByTagName("td");
  let td2 = row2.getElementsByTagName("td");
  if (td1[0].innerHTML === td2[0].innerHTML) {
    return true;
  } else {
    return false;
  }
}

// first find a row that has the first td the same as in another row first td
function findRowWithSameTd(table1, table2) {
  let td1 = table1.getElementsByTagName("td");
  let td2 = table2.getElementsByTagName("td");
  for (let i = 0; i < td1.length; i++) {
    for (let j = 0; j < td2.length; j++) {
      if (td1[i].innerHTML === td2[j].innerHTML) {
        return true;
      }
    }
  }
  return false;
}
