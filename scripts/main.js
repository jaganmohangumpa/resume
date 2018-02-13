/*
function loadJSON(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === "200") {
      callback(xhr.responseText);
    }
  };
  xhr.send(null);
}

//usage:
loadJSON("resources/data.json", function(text) {
  let data = JSON.parse(text);
  console.log(data);
});
*/

function loadJSON(url) {
  return new Promise((resolve, reject) => {
    return fetch(url).then(response => {
      if (response.ok) {
        resolve(response.json());
      } else {
        reject(new Error('error'));
      }
    })
  })
}

var myPromise = loadJSON("resources/data.json");
myPromise.then(data => {
  // Here's a list of repos!
  console.log(data);
  //basicsCard(data.basics)
  //skillsTable(data.skills);
  //educationTemplet(data.education);
  //awardsTemplet(data.awards);
  //languages(data.languages);
  //workTemplet(data.work);
});

var app = {
   icon: {
     github: "/images/github-logo.svg",
     linkedin:"/images/linkedin-button-logo.svg"
   },
   profileCard: document.querySelector('.profile-card'),
   summary: document.querySelector('.summary'),
   skills: document.querySelector('.skills-content'),
   education: document.querySelector('.education-content'),
   awards: document.querySelector('.awards-content'),
   languages: document.querySelector('.languages .content'),
   work: document.querySelector('.experience .work')
 };

 function summaryCard(basics) {
   let p = document.createElement("p");
   p.textContent = basics.summary;
   app.summary.appendChild(p);

   let ul = document.createElement("ul");
   ul.classList.add("highlights");
   for(var i in basics.highlights){
     let li = document.createElement("li");
     li.textContent = basics.highlights[i];
     ul.appendChild(li);
   }
   app.summary.appendChild(ul);
 }

  function basicsCard(basics){
      //app.profileCard.querySelector('.name').textContent = data.name;
      var card = app.profileCard;
      card.querySelector('.name').textContent = basics.name;
      card.querySelector('.label').textContent = basics.label;
      let mobile = card.querySelector('.mobile .info .value');
      mobile.textContent = basics.phone;
      mobile.href = "tel:" + basics.phone;
      let email = card.querySelector('.email .info .value');
      email.textContent = basics.email;
      email.href = "mailto:" + basics.email;
      let link = "";
      for(var i in basics.profiles){
        link += "<a href='" + basics.profiles[i].url + "' ><img src='" + app.icon[basics.profiles[i].network] + "' /></a>";
      }
      card.querySelector('.social-links').innerHTML = link;
      summaryCard(basics);
      card.querySelector('.location .info').textContent = address(basics.location);
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

  function skillsTable(skills) {
    var table = document.createElement("table");
    table.className = 'skill';
    table.setAttribute('id','skill');
    let row = '';
    for(var i in skills){
      row += "<tr>"+
                "<td><strong>" + skills[i].name + "</strong></td>"+
                "<td>" + skills[i].keywords.join(', ') + "</td>"+
             "</tr>";
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
              '<strong>' + education[i].studyType + '</strong> ' +
              (education[i].area ? "in":"") + ' <strong>' + education[i].area + ',&nbsp;</strong>' + education[i].institution,
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
      workContent.classList.add("work-content");
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
    let monthNames = new Array('January', 'February','March','April','May','June','July',
                               'August','September','October','November','December');
    var date = new Date(stringDate);
    var formattedDate = monthNames[date.getMonth()].slice(0,3) + ', ' + date.getFullYear();
    return formattedDate;
  }
