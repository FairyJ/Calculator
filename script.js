//grab operators and numbers
var operator = document.getElementsByClassName("operator");
var number = document.getElementsByClassName("number");

//getting histor value and the show in screen
function getHistory() {
  return document.getElementById("hisory-value").innerText;
}
//print the history information
function showHistory(value) {
  return (document.getElementById("hisory-value").innerText = value);
}
// showHistory("1234567");

function getOutput() {
  return document.getElementById("outPut-value").value;
}

// print the result information
function showOutput(value) {
  if (value == "") {
    document.getElementById("outPut-value").value = value;
  } else {
    document.getElementById("outPut-value").value = formateVlaue(value);
  }
}
// showOutput("1234");

//our output value shoul be formated so we need a function to print our number in format insted of 10000 print 10,000
function formateVlaue(value) {
  if (value == "-") {
    return "";
  }
  let n = Number(value);
  //make my number to string
  let newValue = n.toLocaleString("en");
  return newValue;
}

//we need to make it to number to be able to have calculation on
function reverseFormat(value) {
  return Number(value.replace(/,/g, ""));
}
// alert(reverseFormat("1,234,3456"));

//using for loot to check which operator was pushed to take action

for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function() {
    let op = this.id;
    if (op == "Clear") {
      showOutput(0);
      showHistory("");
    } else if (op == "delete") {
      let value = reverseFormat(getOutput()).toString();
      console.log(value);
      showOutput(value);
      //if the output has number
      if (value) {
        value = value.substr(0, value.length - 1);
        showOutput(value);
      }
      //otherwise will be + or - or / or * or equal
    } else {
      var output = getOutput();
      var history = getHistory();
      //if output is empty but history is not and we have operator at the end we can change it
      if (output == "" && history != "") {
        //check last char is number or operator
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      if (output != "" || history != "") {
        //condition ?true:false
        //if output is empty output if not we reverse the format
        output = output == "" ? output : reverseFormat(output);
        history = history + output;
        if (op == "equal") {
          let result = eval(history);
          console.log(result);

          showOutput(result);
          showHistory("");
        } else {
          //for other operators
          if (op == "plus") {
            history = history + "+";
          } else if (op == "subtract") {
            history = history + "-";
          } else if (op == "multiplication") {
            history = history + "*";
          } else if (op == "division") {
            history = history + "÷";
          }
          showHistory(history);
          showOutput("");
        }
      }
    }
  });
}

for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function() {
    let output = reverseFormat(getOutput());
    //if output is number

    if (output != NaN) {
     
      output = output + this.id;
      showOutput(output);
    }
  });
}
