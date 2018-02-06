(function() {

  function loadJSON(file, callback) {
    //AJAX call using XMLHttpRequest
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
    educationTemplet(data.education);
    awardsTemplet(data.awards);
    languages(data.languages);
    workTemplet(data.work);
  });

  var app = {
   icon: {
     github: "/resume/images/github-logo.svg",
     linkedin:"/resume/images/linkedin-button-logo.svg"
   },
   profileCard: document.querySelector('.profile-card'),
   summary: document.querySelector('.summary'),
   skills: document.querySelector('.skills-content'),
   education: document.querySelector('.education-content'),
   awards: document.querySelector('.awards-content'),
   languages: document.querySelector('.languages .content'),
   work: document.querySelector('.experience .work')
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

  function educationTemplet(education){
    let items = '';
    for(var i in education){
      items += [
        '<div class="education-item">',
          '<header>',
            '<p class="education-details">',
              '<strong>' + education[i].studyType + '</strong> ' + (education[i].area ? "in":"") + ' <strong>' + education[i].area + ',&nbsp;</strong>' + education[i].institution,
            '</p>',
            '<small><span class="date">' + getFormattedDate(education[i].startDate) + ' - '+ getFormattedDate(education[i].endDate) +'</span></small>',
            '<div class="gpa"><strong> Grade:</strong><i>' + education[i].gpa + '</i></div>',
          '<header>',
        '</div>'
      ].join("\n");
   }
   app.education.innerHTML = items;
  }

  function awardsTemplet(awards){
    let items = '';
    for(var i in awards){
      items += [
        '<p><strong>' + awards[i].title + ',&nbsp;</strong>' + awards[i].awarder + '</p>',
        '<p><small>Awarded on: ' + getFormattedDate(awards[i].date) + '</small></p>'
      ].join("\n");
   }
   app.awards.innerHTML = items;
  }

  function languages(languages){
    let lang = [];
    for(var i in languages){
      lang.push(languages[i].language);
    }
    let items = '<p><strong>' + lang.join(", ") + '</strong></p>';
    app.languages.innerHTML = items;
  }

  function workTemplet(work){
    for(var i in work){
      let item = document.createElement("div");
      item.classList.add("work-item");
      let header = document.createElement("header");
      let workHeader = [
        '<p class="position-company">',
          '<strong>' + work[i].position + '</strong>,&nbsp;',
          '<a href="'+ work[i].website +'" target="_blank">' + work[i].company + '</a>',
        '</p>',
        '<small><span class="date">' + getFormattedDate(work[i].startDate) + ' - ' + getFormattedDate(work[i].endDate) +'</span></small>'
      ].join("\n");
      header.innerHTML = workHeader;

      let workContent = document.createElement("div");
      workContent.classList.add("content");
      let summary = document.createElement("div");
      summary.classList.add("summary");
      let p = document.createElement("p");
      p.textContent = work[i].summary;
      summary.appendChild(p);

      let ul = document.createElement("ul");
      ul.classList.add("highlights");
      for(var j in work[i].highlights){
        let li = document.createElement("li");
        li.textContent = work[i].highlights[j];
        ul.appendChild(li);
      }

      workContent.appendChild(summary);
      workContent.appendChild(ul);

      item.appendChild(header);
      item.appendChild(workContent);
      app.work.appendChild(item);
    }
  }

  function getFormattedDate(stringDate) {
    let monthNames = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
    var date = new Date(stringDate);
    var formattedDate = monthNames[date.getMonth()].slice(0,3) + ', ' + date.getFullYear();
    return formattedDate;
  }

})();
