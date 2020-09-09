/**
 * Complete the implementation of parseStory.
 * 
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 * 
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 * 
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 * 
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 * 
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */


// function to parse the story and return an array of parsed data
function parseStory(rawStory) {
  const arr = rawStory.split(' ');
  const newArr = arr.map(el => {
    if(el.includes('[')){
      let pos;
      const index = el.indexOf('[');
      const word = el.slice(0,index);
      const regex = el.match(/\[(.*?)\]/)[1];
      if(regex === 'verb'){
        pos = 'verb';
      } else if(regex === 'noun'){
        pos = 'noun';
      } else if(regex === 'adjective'){
        pos = 'adjective';
      } else if(regex === 'subject'){
        pos = 'subject';
      } else if(regex === 'possessive'){
        pos = 'possessive';
      } else if(regex === 'object'){
        pos = 'object';
      }
      return {word: word, pos: pos}
    } else{
      return {word: el}
    }
  });
  return newArr;
}


// function to build the structure of HTML body
function setContainers() {
  // selecting the body of HTML
  const body = document.body;

  // creating a div for our challenge title
  const container1 = document.createElement('div');
  container1.innerHTML = "<h1>Let's write an exciting story!!</h1>";
  container1.setAttribute("id", "container1");
  body.insertBefore(container1, body.firstElementChild);
  
  // creating a title for the input box
  const container2 = document.createElement('div');
  container2.innerHTML = "<b>Fill the following blanks to write your own strory:</b>";
  container2.setAttribute("id", "container2");
  body.insertBefore(container2, body.children[1]);

  // creating a container for the input boxes
  const madLibsEdit_Div = document.querySelector('.madLibsEdit');
  madLibsEdit_Div.setAttribute("id", "container3");
  const inputDiv = document.createElement('div');
  inputDiv.setAttribute("id", "input");
  madLibsEdit_Div.appendChild(inputDiv);


  // creating a title for the output box
  const container4 = document.createElement('div');
  container4.innerHTML = "<h2>Here's your story:</h2>";
  container4.setAttribute("id", "container4");
  body.insertBefore(container4, body.children[3]);

  // creating a container for the output boxes
  const madLibsPreview_Div = document.querySelector('.madLibsPreview');
  madLibsPreview_Div.setAttribute("id", "container5");
  const outputDiv = document.createElement('div');
  outputDiv.setAttribute("id", "output");
  madLibsPreview_Div.appendChild(outputDiv);
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory().then(parseStory).then((processedStory) => {
  console.log(processedStory);
  
  setContainers();
  
  const madLibsPreview = document.querySelector('#output');
  const storyInput = document.querySelector('#input');

  let ids = 0;
  
  for (let i = 0; i < processedStory.length; i++) {

      const spaceSpan = document.createElement("span"); 
    if (!("pos" in processedStory[i])) {
      const outputSpan = document.createElement("span");
      const inputSpan = document.createElement("span"); 
      inputSpan.innerHTML = processedStory[i].word;
      outputSpan.innerHTML = processedStory[i].word;

      if (i !== processedStory.length - 1 && !((processedStory[i + 1].word == ",") || (processedStory[i + 1].word == "."))){
        outputSpan.innerHTML += " ";
        spaceSpan.innerHTML = " ";
      } 
      madLibsPreview.appendChild(outputSpan);
      storyInput.appendChild(inputSpan); 
      storyInput.appendChild(spaceSpan); 

     } else {
      const newSpan1 = document.createElement("span");
      const input = document.createElement("input");
      input.setAttribute("id", `${ids}`);
      ids++;
      input.setAttribute("placeholder", `${processedStory[i].pos}`);
      input.setAttribute("maxlength", "20");
      input.classList.add("inputs");
      
      input.oninput = handleInput;
      function handleInput(e) {
        if (e.target.value.length == 0) {
          newSpan1.textContent = "(" + processedStory[i].pos + ")";
          newSpan1.style.opacity = 0.5;
          newSpan1.style.color = "black";
        } else {
          newSpan1.textContent = e.target.value;
          newSpan1.style.opacity = 1;
          newSpan1.style.color = "red";
          newSpan1.style.fontWeight = "700";
        }
          
      } 

      spaceSpan.innerHTML = " ";

      if ((processedStory[i + 1].word == ",") || (processedStory[i + 1].word == ".")) {
        newSpan1.setAttribute("id", `${i}`);
        newSpan1.innerHTML = "(" + processedStory[i].pos + ")";
        newSpan1.style.opacity = 0.5;
        madLibsPreview.appendChild(newSpan1);
        storyInput.appendChild(input);
      } else {
        
        let newSpan2 = document.createElement("span");
        newSpan2.innerHTML = " ";
        newSpan1.setAttribute("id", `${i}`);
        newSpan1.innerHTML = "(" + processedStory[i].pos + ")";
        newSpan1.style.opacity = 0.5;
        madLibsPreview.appendChild(newSpan1);
        madLibsPreview.appendChild(newSpan2);
        storyInput.appendChild(input);
        storyInput.appendChild(spaceSpan);
      }
    }
  }

  // setting hotkey for "Enter" key
  for ( let i = 0 ; i < ids ; i++) {

    let input = document.getElementById(`${i}`);
    input.addEventListener("keydown", function (event) {
        if (event.keyCode == 13) {

          // to loop from the beginning
          if (i === ids-1) { 
            // to go and start from the beginning
            document.getElementById("0").focus();
          } else {
            document.getElementById(`${i + 1}`).focus();
          }

        }
      })

  }


});







window.onload = (event) => {
  console.log('page is fully loaded');
};