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
    skillsTable(data.skills);
  });

  var app = {
   icon: {
     github: "/images/github-logo.svg",
     linkedin:"/images/linkedin-button-logo.svg"
   },
   profileCard: document.querySelector('.profile-card'),
   summary: document.querySelector('.summary'),
   skills: document.querySelector('.skills-content'),
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
      summaryCard(data);
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

  function summaryCard(data) {
   let p = document.createElement("p");
   p.textContent = data.summary;
   app.summary.appendChild(p);

   let ul = document.createElement("ul");
   ul.classList.add("highlights");
   for(var i in data.highlights){
     let li = document.createElement("li");
     li.textContent = data.highlights[i];
     ul.appendChild(li);
   }
   app.summary.appendChild(ul);
 }

 function skillsTable(skills) {
    var table = document.createElement("table");
    table.className = 'skill';
    table.setAttribute('id','skill');
    let row = '';
    for(var i in skills){
      row += "<tr><td><strong>" + skills[i].name + "</strong></th><td>" + skills[i].keywords.join(', ') + "</td></tr>";
    }
    table.innerHTML = row;
    app.skills.appendChild(table);
  }

})();
