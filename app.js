// create initalizing function
function init() {
  // select dataset ID
  var dropdown = d3.select("#selDataset");
  // grab and transform the data
  d3.json("samples.json").then((data)=> {
      data.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value");
      });

      // call the functions to display the data and the plots to the page
      Plot(data.names[0]);
      Info(data.names[0]);
  });
}

// Creating function for Data plotting 
function Plot(id) {
  // getting data from the json file
  d3.json("samples.json").then((data)=> {
      var wfreq = data.metadata.map(d => d.wfreq)
         
      // filter sample by id 
      var samples = data.samples.filter(s => s.id.toString() === id)[0];
      var sampleValues = samples.sample_values.slice(0, 10).reverse();

      // Create variable for top 10 & reverse them. 
      var OTUtop = (samples.otu_ids.slice(0, 10)).reverse();
      var OTUid = OTUtop.map(d => "OTU " + d)
      var labels = samples.otu_labels.slice(0, 10);

      // build my trace
      var trace = {
          x: sampleValues,
          y: OTUid,
          text: labels,
          marker: {
            color: 'rgb(158,202,225)',
            line: {
                color:'rgb(8,48,107)',
                width: 1.5}

              },
          type:"bar",
          orientation: "h",
      };

      var data = [trace];

      // build layout
      var layout = {
          title: "Top 10 OTU",
          yaxis:{
              tickmode:"linear",
          },
          margin: {
              l: 80,
              r: 80,
              t: 80,
              b: 50
          }
      };

      // Use Plotly to plot bar chart 
      Plotly.newPlot("bar", data, layout);
   
      // Build trace for bubble chart
      var trace1 = {
          x: samples.otu_ids,
          y: samples.sample_values,
          showlegend: false,
          mode: "markers",
          marker: {
              size: samples.sample_values,
              color: samples.otu_ids,
              opacity: 0.8,
              type: 'scatter'
          },
          text: samples.otu_labels
      };

      // Build layout for 
      var layout1 = {
          xaxis:{title: "OTU ID"},
          height: 700,
          width: 1000
      };

      // creating data variable 
      var data1 = [trace1];

      // create the bubble plot
      Plotly.newPlot("bubble", data1, layout1); 

      });
  }  
//create the function to get the necessary data
function Info(id) {
  // read in json data
  d3.json("samples.json").then((data)=> {
      
      // variable for metadata
      var metadata = data.metadata;
      // filter meta data info by id
      var result = metadata.filter(meta => meta.id.toString() === id)[0];
      // grab metadata id
      var demoInfo = d3.select("#sample-metadata");      
      // reset demo panel
      demoInfo.html("");
      Object.entries(result).forEach((key) => {   
          demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
      });
  });
}

// create the function for the change event
function optionChanged(id) {
  Plot(id);
  Info(id);
}
init();
