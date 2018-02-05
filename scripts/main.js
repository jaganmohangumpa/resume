(function() {

  function loadJSON(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
        callback(rawFile.responseText);
      }
    };
    rawFile.send(null);
  }

  //usage: loading data.json
  loadJSON("resources/data.json", function(text){
    let data = JSON.parse(text);
    console.log(data);
  });

  var app = {
   icon: {
     github: "/images/github-logo.svg",
     linkedin:"/images/linkedin-button-logo.svg"
   },
   profileCard: document.querySelector('.profile-card')
 };

})();
