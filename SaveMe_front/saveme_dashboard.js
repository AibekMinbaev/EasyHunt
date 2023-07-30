let section1 = document.getElementById("section1") 
let section2 = document.getElementById("section2") 
let section3 = document.getElementById("section3") 
let section4 = document.getElementById("section4") 
let section5 = document.getElementById("section5") 


fetch("http://127.0.0.1:8000/saveme/search/", {
    method: "POST", 
    headers: {
        "Content-Type" : "application/json"
    }, 
    body: JSON.stringify({
        "company": "", 
        "status" : "WA"

    })
})
    .then(response => response.json()) 
    .then(data => {
        section1.innerHTML = "" 

        for(let result of data){
            let resultEl = document.createElement("li") 
            resultEl.textContent = result.company 
            section1.appendChild(resultEl) 
        }
    })
    .catch(error => console.error(error)) 



fetch("http://127.0.0.1:8000/saveme/search/", {
    method: "POST", 
    headers: {
        "Content-Type" : "application/json"
    }, 
    body: JSON.stringify({
        "company": "", 
        "status" : "A"

    })
})
    .then(response => response.json()) 
    .then(data => {
        section2.innerHTML = "" 

        for(let result of data){
            let resultEl = document.createElement("li") 
            resultEl.textContent = result.company 
            section2.appendChild(resultEl) 
        }
    })
    .catch(error => console.error(error)) 



    fetch("http://127.0.0.1:8000/saveme/search/", {
    method: "POST", 
    headers: {
        "Content-Type" : "application/json"
    }, 
    body: JSON.stringify({
        "company": "", 
        "status" : "OA"

    })
})
    .then(response => response.json()) 
    .then(data => {
        section3.innerHTML = "" 

        for(let result of data){
            let resultEl = document.createElement("li") 
            resultEl.textContent = result.company 
            section3.appendChild(resultEl) 
        }
    })
    .catch(error => console.error(error)) 


    fetch("http://127.0.0.1:8000/saveme/search/", {
    method: "POST", 
    headers: {
        "Content-Type" : "application/json"
    }, 
    body: JSON.stringify({
        "company": "", 
        "status" : "I1"

    })
})
    .then(response => response.json()) 
    .then(data => {
        section4.innerHTML = "" 

        for(let result of data){
            let resultEl = document.createElement("li") 
            resultEl.textContent = result.company 
            section4.appendChild(resultEl) 
        }
    })
    .catch(error => console.error(error)) 


    fetch("http://127.0.0.1:8000/saveme/search/", {
    method: "POST", 
    headers: {
        "Content-Type" : "application/json"
    }, 
    body: JSON.stringify({
        "company": "", 
        "status" : "I2"

    })
})
    .then(response => response.json()) 
    .then(data => {
        section5.innerHTML = "" 

        for(let result of data){
            let resultEl = document.createElement("li") 
            resultEl.textContent = result.company 
            section5.appendChild(resultEl) 
        }
    })
    .catch(error => console.error(error)) 
