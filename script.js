const textArea1 = document.getElementById("text1");
const textArea2 = document.getElementById("text2");
const table1 = document.getElementById("table--1");
const table2 = document.getElementById("table--2");
const tableWrapper = document.getElementById("table--wrapper");
const checkDiffBtn = document.getElementById("check-diff-btn");
const clearBtn = document.getElementById("clear-btn");
const howToUseBtn = document.getElementById("how-to-use-btn");
const closeHowToUseBtn = document.getElementById("close-how-to-use-btn");
const howToUseWrapper = document.getElementById("how-to-use-wrapper");
const howToUseBackdrop = document.getElementById("how-to-use-backdrop");

checkDiffBtn.addEventListener("click", function () {
  try {
    if (textArea1.value.length == 0 || textArea2.value.length == 0) {
      throw (notification = new Notification(
        "Please enter text in both text areas",
        false
      ));
    }
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
      if (tableWrapper.classList.contains("hidden")) {
        toggleVisibility(tableWrapper);
      }
      throw (notification = new Notification("Comparison successful", true));
    }
  } catch (error) {
    displayNotification(error.message, error.success);
  }
});

clearBtn.addEventListener("click", function () {
  try {
    if (
      textArea1.value.length > 0 &&
      textArea2.value.length > 0 &&
      !tableWrapper.classList.contains("hidden")
    ) {
      toggleVisibility(tableWrapper);
    }
    if (textArea1.value.length > 0 || textArea2.value.length > 0) {
      clearTextArea(textArea1);
      clearTextArea(textArea2);
      removeTableBody(table1);
      removeTableBody(table2);
      throw (notification = new Notification("Text areas cleared", true));
    }
  } catch (error) {
    displayNotification(error.message, error.success);
  }
});

howToUseBtn.addEventListener("click", function () {
  toggleVisibility(document.getElementById("how-to-use-wrapper"));
});

closeHowToUseBtn.addEventListener("click", function () {
  toggleVisibility(document.getElementById("how-to-use-wrapper"));
});

howToUseBackdrop.addEventListener("click", function (event) {
  if (event.target == howToUseBackdrop) {
    toggleVisibility(document.getElementById("how-to-use-wrapper"));
    console.log("clicked");
  }
});

class Notification {
  constructor(message, success) {
    this.message = message;
    this.success = success;
  }
}

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
        setFirstTdStyle(rowsTable1[i], "highlight-td--first-success");
        setFirstTdStyle(rowsTable2[j], "highlight-td--first-success");
        compareAllTd(rowsTable1[i], rowsTable2[j]);
      }
      if (!compareFirstTd(rowsTable1[i], rowsTable2[j])) {
        if (
          !rowsTable1[i]
            .getElementsByTagName("td")[0]
            .classList.contains("highlight-td--first-success")
        ) {
          setFirstTdStyle(rowsTable1[i], "highlight-td--first-fail");
        }
        if (
          !rowsTable2[j]
            .getElementsByTagName("td")[0]
            .classList.contains("highlight-td--first-success")
        ) {
          setFirstTdStyle(rowsTable2[j], "highlight-td--first-fail");
        }
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

function compareAllTd(row1, row2) {
  const td1 = row1.getElementsByTagName("td");
  const td2 = row2.getElementsByTagName("td");
  for (let i = 0; i < td1.length; i++) {
    for (let j = 0; j < td2.length; j++) {
      if (td1[i].innerHTML == td2[j].innerHTML) {
        td1[i].classList.add("highlight-td");
        td2[j].classList.add("highlight-td");
      }
      if (td1[i].innerHTML != td2[j].innerHTML) {
        if (!td1[i].classList.contains("highlight-td")) {
          td1[i].classList.add("highlight-td--fail");
        }
        if (!td2[j].classList.contains("highlight-td")) {
          td2[j].classList.add("highlight-td--fail");
        }
      }
    }
  }
}

function setFirstTdStyle(row, style) {
  const td = row.getElementsByTagName("td")[0];
  td.classList.add(style);
}

function clearTextArea(textArea) {
  textArea.value = "";
}

function displayNotification(message, success) {
  const notification = document.getElementById("notification");
  const notificationText = document.getElementById("notification-text");
  notificationText.innerHTML = message;
  success
    ? notification.classList.add("notification--success")
    : notification.classList.add("notification--fail");
  notification.classList.add("notification--show");
  setTimeout(function () {
    notification.classList.remove("notification--show");
  }, 2500);
  setTimeout(function () {
    notificationText.innerHTML = "";
    notification.classList.remove("notification--success");
    notification.classList.remove("notification--fail");
  }, 3000);
}

function toggleVisibility(element) {
  element.classList.toggle("hidden");
}
