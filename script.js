const textArea1 = document.getElementById("text1");
const textArea2 = document.getElementById("text2");
const checkDiffBtn = document.getElementById("check-diff-btn");

// get the text from the textarea and put it in the second textarea
let text = `hellow                 world how are you
today is a good day`;
// add event listener to check diff button
checkDiffBtn.addEventListener("click", function () {
  console.log(textToArray(text, "\n"));
  let newText = textToArray(textArea1.value, "\n");
  console.log(newText);
  newText[0] = removeWhiteSpace(newText[0]);
  console.log(newText);
});

function textToArray(text, separator = " ") {
  let textArray = text.split(separator);
  return textArray;
}

// create a function that removes the white space from the text
function removeWhiteSpace(text) {
  let newText = text.replace(/\s+/g, " ");
  return newText;
}

// create a function that generates a table
function generateTable(data) {
  const tbl = document.createElement("table");
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

  tbl.appendChild(tblBody);
  document.body.appendChild(tbl);
  tbl.setAttribute("border", "2");
}
