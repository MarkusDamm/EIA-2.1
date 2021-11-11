namespace Betreuer {
  let word: string = "Hallo Welt";
  console.log(word);
  
  // prompt("type something");
  word = prompt("type something", "type here"); 
  console.log(word);
  
  document.addEventListener("DOMContendLoaded", hdlLoad);


  function hdlLoad(): void {
    // loading goes here
  }
}