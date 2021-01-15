

// SLIDER 1
//=======================================================
// the value we need to get from the quant slider
var quantSlider = document.getElementById("quantSlider");

// the value we output based on the slider position
var sliderOutput1 = document.getElementById("sliderText1");

// the text that shows must be the slider value
sliderOutput1.innerText = quantSlider.value;

// Update the current slider value (each time you drag the slider handle)
quantSlider.oninput = function() {
    sliderOutput1.innerText = this.value;
}
//=======================================================

// SLIDER 2
//=======================================================
// the value we need to get from the range slider
var rangeSlider = document.getElementById("rangeSlider");

// the value we output based on the slider position
var sliderOutput2 = document.getElementById("sliderText2");

// the text that shows must be the slider value
sliderOutput2.innerText = rangeSlider.value;

// Update the current slider value (each time you drag the slider handle)
rangeSlider.oninput = function() {
    sliderOutput2.innerText = this.value;
}
//=======================================================



// the chart 
let context = document.getElementById('myChart').getContext('2d');

let barChart = null;
generateRandom();

// function to generate random numbers and 
function generateRandom(){

    // destory the old chart data before generating a new one
    if(barChart != null){
        barChart.destroy();
    }

    // the array to store all building heights
    let heightsArray = [];
    let backgroundArrays = [];
    let buildingNames = [];

    let maxHeightFound = 0;

    // generate random building heights 
    for(let i = 0; i < quantSlider.value; i++){

        // the temporary random height we will push into the height array 
        let tempRandomHeight = Math.ceil(rangeSlider.value * Math.random())

        // the magic if statement to find the sunset buildings
        if(tempRandomHeight > maxHeightFound){
            maxHeightFound = tempRandomHeight;
            // each time we find one that can see the sun we make the building orange
            backgroundArrays.push('#ff7b00');
        }
        else{ // the building is blocked by a larger one
            backgroundArrays.push('#007bff');
        }
        
        // assign the height and building names to the arrays
        heightsArray.push(tempRandomHeight);
        buildingNames.push(`Building ${i+1}`);
    }

    console.log(heightsArray);

    barChart = new Chart(context, {
        type:'bar',
        data:{
            labels:buildingNames,
            datasets:[{
                label: 'Height',
                data:heightsArray,
                backgroundColor:backgroundArrays,
            }], 
        },
        options: {
            tooltips:{
                enabled:true
            },
            legend:{
                display:false
            },
            title:{
                display:true,
                text: "Building Heights",
                fontSize:25
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}



document.getElementById("submitButton").addEventListener("click", generateRandom);



