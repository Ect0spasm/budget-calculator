let utils = {};

utils.get = (url) => {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();

        request.open('GET', url);

        request.onload = function () {
            if (request.status == 200) {
                console.log('Response OK');
                resolve(request.response);
            }

            else {
                reject(Error('promise error with ${request.status}'))
            }
        };

        request.onerror = function (error) {
            reject(Error('Network Error with ${url}: ${request.status}'))
        };

        request.send();
    });
}

utils.getJSON = async function (url) {
    let string = null;

    try {
        string = await utils.get(url);
    }
    catch (error) {
        console.log(error)
    }

    let data = JSON.parse(string);
    return data;
}


async function init() {
    //root element of web page
    let root = document.querySelector('#root');

    //holds url of JSON data of course
    let url = 'https://api-demo.cartwebapp.com/data/2024';

    //Variable to hold JSON data
    let occupations = null;

    //data retrieval attempt(try) via JSON server
    try {
        occupations = await utils.getJSON(url);
    }
    catch (error) {
        root.style.color = 'red';
        root.textContent = `error: ${error}`;
    }

    //This shows JSON data on the html page?!?!
    root.innerHTML = buildList(occupations);
}


function buildlist(jobs) {
    /*Empty string to hold html*/
    let html = '';

    /*loops through the array of job objects from JSON data*/
    for (let job of jobs) {

        //starts html section per job
        html += '<section>'; /*investigate l8r*/

        //Creates div element for the job title
        html += `<div><strong>Occupation</strong>: ${job.occupation}</div>`;

        //Creates div element for the salary / formats as dolla dolla bills
        html += `<div><strong>Salary</strong>: ${job.salary.toLocaleString('en-US')}</div>`;

        //Closes the section
        html += '</section>';
    }

    return html;
}

document.addEventListener('DOMContentLoaded', init);