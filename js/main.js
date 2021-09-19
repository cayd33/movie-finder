$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val()
        getMovies(searchText)
        e.preventDefault()
    })
})

//Api & Movies Cards
function getMovies(searchText) {
    axios
        .get('https://www.omdbapi.com/?apikey=681373f3&s=' + searchText)
        .then((response) => {
            console.log(response)
            let movies = response.data.Search
            let output = ''
            $.each(movies, (index, movie) => {
                output += `
            <div class="card mx-auto" style="width: 25rem; margin: 20px;">
                <img class="card-img-top" src="${movie.Poster}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
            </div>
        `
            })

            $('#movies').html(output)
        })
        .catch((err) => {
            console.log(err)
        })
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id)
    window.location = 'movie.html'
    return false
}

//Movie Info
function getMovie() {
    let movieId = sessionStorage.getItem('movieId')

    axios
        .get('https://www.omdbapi.com/?apikey=681373f3&i=' + movieId)
        .then((response) => {
            console.log(response)
            let movie = response.data

            let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail" alt="">
          </div>
          <div class="col-md-8">
              <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h2 class="mb-1">${movie.Title}</h2>
    </div>
  </a>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre: </strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released: </strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated: </strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating: </strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director: </strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer: </strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors: </strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        
        <!--Movie PLot-->
        <div class="row">
          <div class="info">
          <br/>
            ${movie.Plot}
            <hr>
            <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">IMDB</a>
            <a href="index.html" class="btn btn-secondary">Go Back To Search</a>
          </div>
        </div>
      `

            $('#movie').html(output)
        })
        .catch((err) => {
            console.log(err)
        })
}