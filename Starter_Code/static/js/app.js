// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
d3.json("samples.json").then((incomingData) => {
    function filteredData(data) {
      return data.names;
    }
  console.log(sample.names)
    // Use filter() to pass the function as its argument
   // var filteredData = incomingData.filter(filterMovieRatings);
//console.log(name)
// access the data 