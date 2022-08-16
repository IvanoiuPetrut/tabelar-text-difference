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
    compareTable(table1, table2);
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

function compareTable(table1, table2) {
  const rowsTable1 = table1.getElementsByTagName("tr");
  const rowsTable2 = table2.getElementsByTagName("tr");
  for (let i = 0; i < rowsTable1.length; i++) {
    for (let j = 0; j < rowsTable2.length; j++) {
      if (compareFirstTd(rowsTable1[i], rowsTable2[j])) {
        setTdStyle(rowsTable1[i], "highlight-td--first-success");
        setTdStyle(rowsTable2[j], "highlight-td--first-success");
        break;
      } else {
        setTdStyle(rowsTable1[i], "highlight-td--first-fail");
        setTdStyle(rowsTable2[j], "highlight-td--first-fail");
      }
    }
  }
}

function compareFirstTd(row1, row2) {
  const firstTd1 = row1.getElementsByTagName("td")[0];
  const firstTd2 = row2.getElementsByTagName("td")[0];
  if (firstTd1.innerHTML == firstTd2.innerHTML) {
    return true;
  } else {
    return false;
  }
}

function setTdStyle(row, style) {
  const td = row.getElementsByTagName("td")[0];
  td.classList.add(style);
}
