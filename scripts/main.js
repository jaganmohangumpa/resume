(function() {

  function loadJSON(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
        callback(rawFile.responseText);
      }
    }
    rawFile.send(null);
  }

  //usage:
  loadJSON("resources/data.json", function(text){
    let data = JSON.parse(text);
    console.log(data);
    creatingSummary(data.basics.summary);
  });

  var resumeDiv = document.getElementById("resume");

  function creatingSummary(summary){
    var section = document.createElement("section");
    section.classList.add("section", "main-summary");
    var summary_section = document.createElement("section")
    var div = document.createElement("div");
    div.innerHTML = summary;
    summary_section.appendChild(div);
    section.appendChild(summary_section);
    resumeDiv.appendChild(section);
  }

})();
