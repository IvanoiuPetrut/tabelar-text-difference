const TextArea1 = document.getElementById("text1");
const TextArea2 = document.getElementById("text2");
const CheckDiffBtn = document.getElementById("check-diff-btn");

// get the text from the textarea and put it in the second textarea

// add event listener to check diff button
CheckDiffBtn.addEventListener("click", function () {
  console.log(checkEndOfLine(TextArea1.value));
});

// create a function to check end of a line
function checkEndOfLine(text) {
  text.charAt(2);
}
