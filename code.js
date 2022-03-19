// -----------
// WORD BUTTON
// -----------

let card = document.querySelector("#card1");

let wordButton = document.querySelector("#submit-word");
console.log(wordButton);

wordButton.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("button click");

  let wordChoice = document.querySelector("#word-choice");
  console.log(wordChoice);
  let word = wordChoice.value;
  console.log(word);

  let answer = document.getElementById("answer");
  let p = document.getElementById('pig-latin')
  answer.append(p);

  let newWord = encodeWord(word);
  console.log(newWord);
  p.innerHTML += `${newWord}`;

  wordChoice.value = "";
  
  const removeText = setTimeout(userAnswer, 4000);

  function userAnswer(){
    p.innerHTML = " ";
  }
  
  function removeAnswer(){
    clearTimeout(removeText);
  }
});

// ---------------
// SENTENCE BUTTON
// ---------------

let card2 = document.querySelector("#card2");

let sentenceButton = document.querySelector("#submit-sentence");
console.log(sentenceButton);

sentenceButton.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("button click");

  let sentenceChoice = document.querySelector("#sentence-choice");
  console.log(sentenceChoice);
  let sentence = sentenceChoice.value;
  console.log(sentence);

  let userSentence = document.getElementById("user-sentence");
  let p = document.getElementById('pig-latin-sentence')
  userSentence.append(p);

  let newSentence = encodeText(sentence);
  console.log(newSentence);
  p.innerHTML += `${newSentence}`;

  sentenceChoice.value = ""; 
  
  const removeText = setTimeout(userAnswer, 4000);

  function userAnswer(){
    p.innerHTML = " ";
  }
  
  function removeAnswer(){
    clearTimeout(removeText);
  }
});

//-----------------------
// Open Window in new tab
// ----------------------

window.open('https://github.com/KingDrahggo/piglatin-unittesting', '_blank');

// ----------------
// Encode Functions
// ----------------
/*  --------------------------------------------------------
    encodeVowelWord()

    Encode words that begin with a vowel sound from english to pig latin
    For words that begin with vowel sounds, one just adds "yay" to the end.

    For example:
        "eat" becomes "eat-yay"
        "omelet" becomes "omelet-yay" 
*/
function encodeVowelWord(word) {
  let vowel = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
  let emptyWord = "";
  let firstLetterVowel = word[0];

  if (vowel.includes(firstLetterVowel)) {
    word.concat(emptyWord);
    return `${word}-yay`;
  } 
}
console.log(encodeVowelWord("ate"));

// Unit Tests 
console.assert(encodeVowelWord("I"), {
  test: "create string I-yay",
  expected: "I-yay",
  result: encodeVowelWord("I"),
});

console.assert(encodeVowelWord("eat"), {
  test: "create string eat-yay",
  expected: "eat-yay",
  result: encodeVowelWord("eat"),
});

console.assert(encodeVowelWord("omelet"), {
  test: "create string omelet-yay",
  expected: "omelet-yay",
  result: encodeVowelWord("omelet"),
});



/*  --------------------------------------------------------
    encodeConsonantWord()

    Encode words that begin with a consonant sound from english to pig latin.
    For words that begin with consonant sounds, all letters before the initial vowel 
    are placed at the end of the word sequence, preceded by a hyphen "-". Then, "ay" is added. 
    
    For example:
        "latin" becomes "atin-lay"
        "cheers" becomes "eers-chay"
*/
function encodeConsonantWord(word) {
  
  let firstVowel = word.match(/[aeiouAEIOU]/);
  let reachedVowel = word.indexOf(firstVowel);
  for (let index = 0; index < word.length; index++) {
    if (reachedVowel !== firstVowel[index]) {
      let emptyWord = "";
      return emptyWord = `${word.slice(reachedVowel)}-${word.slice(
        0,
        reachedVowel
      )}ay`;
    }
  }
}
console.log(encodeConsonantWord("mapple"));

// Unit Test
  console.assert(encodeConsonantWord("ape"), {
    test: "create string ape",
    expected: "ape",
    result: encodeConsonantWord("ape"),
  });
  console.assert(encodeConsonantWord("latin"), {
    test: "create string atin-lay",
    expected: "atin-lay",
    result: encodeConsonantWord("latin"),
  });
  console.assert(encodeConsonantWord("cheers"), {
    test: "create string eers-chay",
    expected: "eers-chay",
    result: encodeConsonantWord("cheers"),
  });



/*  --------------------------------------------------------
    encodeWord()

    Decide whether a given word starts with a vowel sound or consonant sound,
    and call encodeVowelWord(word) or encodeConsonantWord(word) when relevant.

    For example:
        "eat" becomes "eatyay" because it starts with a vowel "e"
        "omelet" becomes "omeletyay" because it starts with a vowel "o"
        "latin" becomes "atin-lay" because it starts with a consonant "l""
        "cheers" becomes "eers-chay" because it starts with a consonant cluster "ch"
        "you" becomes "ou-yay" because it starts with a consonant "y"
*/
function encodeWord(word) {
  let firstVowel = word.match(/[aeiouAEIOU]/);
  let emptyWord = "";

  let reachedVowel = word.indexOf(firstVowel);
  for (let index = 0; index < word.length; index++) {
    if (word[0] === firstVowel[0]) {
      let newVowelWord = encodeVowelWord(word);
      return newVowelWord.concat(emptyWord);
    } else if (reachedVowel !== firstVowel[index]) {
      let newConstantWord = encodeConsonantWord(word);
      return newConstantWord.concat(emptyWord);
    }
  }
  return;
}
console.log(encodeWord("level"));

// Unit Test
console.assert(encodeWord("ape"), {
  test: "create string ape-yay",
  expected: "ape-yay",
  result: encodeWord("ape"),
});
console.assert(encodeWord("latin"), {
  test: "create string atin-lay",
  expected: "latin > atin-lay",
  result: encodeWord("latin"),
});
console.assert(encodeWord("cheers"), {
  test: "create string eers-chay",
  expected: "cheers > eers-chay",
  result: encodeWord("cheers"),
});



/*  --------------------------------------------------------
    encodeText()    

    Encode a full sentence or paragraph from english to pig latin.
*/
function encodeText(sentence) {
  let splitText = sentence.split( ` `);
  let emptyArray = [];
  for (let i = 0; i < splitText.length; i++) {
    let word = splitText[i];
    let pigLatinWord = encodeWord(word);
    emptyArray.push(pigLatinWord);
  }
  let joinedText = emptyArray.join(` `);
  return joinedText;
}

console.log(encodeText("I love turtles"));

// Unit Tests
console.assert(encodeText("I ate an apple"), {
  test: "create sentence: I-yay ate-yay an-yay apple-yay",
  expected: "every word to adhere to piglatin rules",
  result: encodeText("I like turtles"),
});
console.assert(encodeText("Hank was very mad"), {
  test: "create sentence: ank-hay as-way ery-way ad-may",
  expected: "every word to adhere to piglatin rules",
  result: encodeText("Hank was very mad"),
});
