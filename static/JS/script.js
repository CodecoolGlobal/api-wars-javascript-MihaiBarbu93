const format = num =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')




let votes = async function () {
    $("#tbod2").html("");
    document.getElementById('myLoad2').style.display = "block";
    $.get('/voting_st',await function (data) {
        document.getElementById('myLoad2').style.display = "none";
        let table2 = document.getElementById("tbod2")
        let modal_title2 = document.getElementById("classModalLabel2");
        modal_title2.innerHTML = "Voting stats"
        for(let i=0; i<data['planet'].length; i++) {
            let row = table2.insertRow();
            let name = row.insertCell(0);
            let vote = row.insertCell(1);
            name.innerHTML = data['planet'][i];
            vote.innerHTML = data['votes'][i];
        }
    })
}

vt = document.getElementById('vt');
vt.addEventListener('click', function (e) {
    votes()
})


var residentss =async function(url1){
    $("#tbod").html("");
    document.getElementById('myLoad1').style.display = "block";
    $.get(url1,await function(data){
        document.getElementById('myLoad1').style.display = "none";
        let table = document.getElementById("tbod");
        let list_of_residents = data["residents"];
        let modal_title = document.getElementById("classModalLabel");
        modal_title.innerHTML = "Residents of " + data["name"]
        for (let j= 0; j<list_of_residents.length; j++) {
            let row = table.insertRow();
                let name = row.insertCell(0);
                let height = row.insertCell(1);
                let mass = row.insertCell(2);
                let hair_color = row.insertCell(3);
                let skin_color = row.insertCell(4);
                let eye_color = row.insertCell(5);
                let birth_year = row.insertCell(6);
                let gender = row.insertCell(7);
            $.get(list_of_residents[j], function(data) {
                name.innerHTML = data["name"];
                height.innerHTML = data["height"];
                mass.innerHTML = data["mass"];
                hair_color.innerHTML = data["hair_color"];
                skin_color.innerHTML = data["skin_color"];
                eye_color.innerHTML = data["eye_color"];
                birth_year.innerHTML =  data["birth_year"];
                gender.innerHTML = data["gender"];
            }); };});}
//
// async function getPlanets(url ='https://swapi.dev/api/planets/1/%27)') {
//     let planets_response = await fetch (url)
//     let planets = await planets_response.json();
//     console.log(planets)
// }
//
// getPlanets()
//

add_a_planet =async function(url1, nr){
    let user = document.getElementById("username");
    let table = document.getElementById("tbod1");
    let row = table.insertRow();
    let name = row.insertCell(0);
    let diameter = row.insertCell(1);
    let terrain = row.insertCell(2)
    let climate = row.insertCell(3);
    let swp = row.insertCell(4);
    let population = row.insertCell(5);
    let residents = row.insertCell(6);
    let vote = row.insertCell(7);

    $.get(url1,await function(data){

    name.innerHTML = data["name"];
    diameter.innerHTML = (format(data["diameter"])).toString() + " km" ;
    terrain.innerHTML = data["terrain"]
    climate.innerHTML = data["climate"];
    swp.innerHTML = data["surface_water"]!= "unknown" ? data["surface_water"] + "%" : data["surface_water"] ;
    population.innerHTML =   data["population"]!= "unknown" ? (format(data["population"])).toString() + " people" : data["population"] ;
    if (data["residents"]!=0){
         let but = document.createElement("button")
        but.setAttribute('class', 'btn btn-primary')
        but.setAttribute('id', 'button'+ nr)
        but.setAttribute('data-toggle', 'modal')
        but.setAttribute('data-target', '#classModal')
        but.innerHTML = data["residents"].length.toString() + "resident(s)"
        but.addEventListener('click', function () {
            residentss(url1)

        })
        residents.appendChild(but)
    } else {
        let but = document.createElement("p")
        but.innerHTML = "No known \nresindents";
        residents.appendChild(but)
    }

    vote.innerHTML = user ? "<a href='/vote/" + data['name'] + "'> Vote </a>" : "";

});};

add_planets =async function (nr){
    $("#tbod1").html("");
     document.getElementById('myLoad').style.display = "block";
    $.get("https://swapi.dev/api/planets/?page="+nr.toString(),await function(data){
        let plannet_url = (data["results"]);
            document.querySelector("#tbod1").innerHTML = "";
        for (let i =0 ; i<plannet_url.length; i++) {
             add_a_planet(plannet_url[i]['url'], i)

        }
        document.getElementById('myLoad').style.display = "none";
        })};

// event_btn = function(){
//     add_planets(10)
//
//
// }
//
// event_btn()


    // but.addEventListener('click', function (e) {
    //     residents(plannet_url[i]['url'])
    //     })

var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            }
        }



var nex = 1;


window.onload = (event) => {
    let prevP = document.getElementById("prev");
    prevP.disabled = true
    add_planets(nex);
};

// var nr = 10
//
let previousPage = function(event){
    event.preventDefault()
    nex--
    add_planets(nex)
    goTroughPages(nex, 'click')
}

let nextPage = function(event){
    event.preventDefault()
    nex++;
    add_planets(nex);
    goTroughPages(nex, 'click')
};

let nextP = document.getElementById("next");
nextP.addEventListener('click',goTroughPages);
let prevP = document.getElementById("prev");
prevP.addEventListener('click', goTroughPages);

function goTroughPages (e) {
    let table = document.querySelector('#tbod1');
    if (e.target.classList.contains('btnNext')) {
        table.innerHTML = "";
        e.target.previousElementSibling.disabled =false;
        nex++
        add_planets(nex)
        if (nex === 6) {
            e.target.disabled = true;
      }

    } else if (e.target.classList.contains('btnPrevious')) {
        e.target.nextElementSibling.disabled = false;
        table.innerHTML = "";
        nex--
        add_planets(nex)
        if (nex ===1){
            e.target.disabled = true;
        }

    }

}

// let prev = document.getElementById("next");
// prev.addEventListener('click', prev_next);




