let today = new Date
// create todays date in specific YYYY-MM-DD format contained in fullDate
let year = today.getFullYear()
let month;
if ((today.getMonth() + 1) <= 9) {
  month = "0" + (today.getMonth() + 1)
} else {
  month = today.getMonth() + 1
}
let day = today.getDate()
let fullDate = `${year}-${month}-${day}`



// object that has a method to return all of the concerts in nashville metroID area happening "today"
songkickAPI = {
  fetchConcerts() {
    return fetch(`https://api.songkick.com/api/3.0/metro_areas/11104/calendar.json?min_date=${fullDate}&max_date=${fullDate}&per_page=50&apikey=U7F3aXQFBYvzB9Uz`)
      .then((concerts) => concerts.json())
      .then((resultsObj) => {
        let concertArray = []
        concertArray = resultsObj.resultsPage.results.event
        // console.table(concertArray)
        return concertArray
      })
  }
}

let eventList=[]
let showByVenue = (venueID) => {
  songkickAPI.fetchConcerts().then((array) => {
    // console.log(array[0].venue.id)
    array.forEach((event) => {
      if (event.venue.id === venueID) {
        let eventObj ={}
        eventObj.name = event.displayName
        eventList.push(eventObj)
      }
    })
    console.log(eventList)
  })
}

showByVenue(795);

