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
    basicsCard(data.basics);
  });

  var app = {
   icon: {
     github: "/images/github-logo.svg",
     linkedin:"/images/linkedin-button-logo.svg"
   },
   profileCard: document.querySelector('.profile-card')
 };

 function basicsCard(data){
      //app.profileCard.querySelector('.name').textContent = data.name;
      var card = app.profileCard;
      card.querySelector('.name').textContent = data.name;
      card.querySelector('.label').textContent = data.label;
      let mobile = card.querySelector('.mobile .info .value');
      mobile.textContent = data.phone;
      mobile.href = "tel:" + data.phone;
      let email = card.querySelector('.email .info .value');
      email.textContent = data.email;
      email.href = "mailto:" + data.email;
      let link = "";
      for(var i in data.profiles){
        link += "<a href='" + data.profiles[i].url + "' ><img src='" + app.icon[data.profiles[i].network] + "' /></a>";
      }
      card.querySelector('.social-links').innerHTML = link;

      card.querySelector('.location .info').textContent = address(data.location);
  }

  function address(location){
    let loc = [];
    for(var key in location){
      if(location.hasOwnProperty(key)) {
      loc.push(location[key]);
     }
    }
    return loc.join(", ");
  }

})();
