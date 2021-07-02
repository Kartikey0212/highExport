const axios = require("axios");
const fs = require("fs")

// bigger.json 
// browser-market-shares-in.svg 
// aapl-stock-price.svg 


let testPieStr = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Chrome',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'Internet Explorer',
            y: 11.84
        }, {
            name: 'Firefox',
            y: 10.85
        }, {
            name: 'Edge',
            y: 4.67
        }, {
            name: 'Safari',
            y: 4.18
        }, {
            name: 'Sogou Explorer',
            y: 1.64
        }, {
            name: 'Opera',
            y: 1.6
        }, {
            name: 'QQ',
            y: 1.2
        }, {
            name: 'Other',
            y: 2.61
        }]
    }]
}
// while passing json we donot convert it into string rather we pass it directly
// but for svg convert into string usin backticks
// var str = JSON.stringify(testPieStr)
var str = require("fs").readFileSync("./newPie.json",  {encoding:'utf8', flag:'r'});
console.log(str)
// return;



let fileName = str
let outFormat = "jpeg"
console.log(str.chart)
// let fileStr = fs.readFileSync(fileName,
//     {encoding:'utf8', flag:'r'})

axios.post(`http://localhost:7801`, {
    "infile": fileName,
    // "callback":"function(chart) {chart.renderer.arc(200, 150, 100, 50, -Math.PI, 0).attr({fill : '#FCFFC5',stroke : 'black','stroke-width' : 1}).add();}",
    "constr": "Chart",
    "b64": "1",
    "type": outFormat,
    "scale": "2",
})
.then (res =>{
    // console.log(res);
    var base64Data = res.data;

    // var outFile = fileName.split(".")[0]
    // fs.mkdir(outFile, function(err) {})
    // outFile += "/"
    // outFile += fileName.split(".")[0] + "-converted." + outFormat;
    
    // require("fs").writeFile(outFile, base64Data, "base64", function(err) {
    //     console.log(err);
    // });

    require("fs").writeFile("out.jpeg", base64Data, "base64", function(err) {
        console.log(err);
    });
    
}).catch(error =>{
    console.log(error);
})















// Normal http server does not work:=>


// const https = require('https')

// const data = JSON.stringify({infile:"{xAxis: {categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']},series: [{data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]}]};",callback:"function(chart) {chart.renderer.arc(200, 150, 100, 50, -Math.PI, 0).attr({fill : '#FCFFC5',stroke : 'black','stroke-width' : 1}).add();}",constr:"Chart"});

// const options = {
//   hostname: `localhost`,
//   port: 7801,
//   path: '/',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Content-Length': data.length
//   }
// }

// const req = https.request(options, res => {
//   console.log(`statusCode: ${res.statusCode}`)

//   res.on('data', d => {
//     process.stdout.write(d)
//   })
// })

// req.on('error', error => {
//   console.error(error)
// })

// req.write(data)
// req.end()