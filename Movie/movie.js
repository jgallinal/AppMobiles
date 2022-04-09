let selectedCine = null;
let selectedMovie = null;

function fetchApi(){
    $('form#add_systemgoal .error').remove();
    var formdata = $('form#add_systemgoal').serialize();
    $.ajax({
        type: 'GET',
        url: 'https://api.movie.com.uy/api/shows/rss/data',
        crossDomain: true,
        data: formdata}
    ).done(function(data) {
        console.log(data.contentCinemaShows);
        displayFilms(data.contentCinemaShows);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus)
    });
}

function showList(){
    this.fetchApi();
}

function displayFilms(data){
    let list = "";
    $(".movies").each(function(){
        for(let i = 0; i < data.length; i++){
            if(filterCinema(data[i])){
                list += '<div class="movie-principal-container" onClick="showShows('+i+')"> <div class="movie-secondary-container"> <img alt="" src="' + data[i].posterURL + '"> <div class="movie-information"><h3>' + data[i].movie + '</h3><label>'+ data[i].genre+'</label> <br/><label>'+ data[i].description+'</label></div> </div> ' + displayShows(data[i], i).toString() +'</div>';
                console.log(data[i]);
            }
        }
        $(this).html(list);
    });
}

function  displayShows(data, i) {
    let table = '<table id='+ i +' style="display: none;"> <tr> <th>Fecha</th> <th>Formato</th> <th>Sala</th></tr>'
    const cinemas = data.cinemaShows;
    for (cine of cinemas){
        if(selectedCine === cine.cinema){
            for (show of cine.shows){
                table += '<tr> <td> ' + show.timeToDisplay + '</td> <td> ' + show.formatLang + '</td> <td> ' + show.screenName + '</td> </tr>';
            }
        }
    }
    table += '</table>';
    return table;
}

function showShows(i){
    if(document.getElementById(i).style.display == "none"){
        document.getElementById(i).style.display = "table";
    }else{
        document.getElementById(i).style.display = "none";
    }
}

function filterCinema(data){
	selectedCine = document.getElementById("cinemaSelect").value;
	document.getElementById("cinemaSelect").selected == "true";
    const cinemas = data.cinemaShows;
    for (cine of cinemas){
        if(selectedCine != "" && selectedCine === cine.cinema){
            return true;
        }else if(selectedCine == ""){
            return true;
        }
    }
    return false;
}
