let companyEl = document.getElementById("company") 
let countryEl = document.getElementById("country")  
let cityEl = document.getElementById("city") 
let commentEl = document.getElementById("comment")
let urlEl = document.getElementById("url")  

let saveBtn = document.getElementById("save-btn")
let searchBtn = document.getElementById("search-btn") 


// //Setting the url to the current tab's url 
chrome.tabs.query({active:true, currentWindow:true}, function(tabs){ // this function will work only when the extension is deployed, do now forget to update extensions page on the Chrome 
    let active_tab = tabs[0] 
    urlEl.value = active_tab.url})


saveBtn.addEventListener('click', function saveForm(){ 
    let statusEl = document.querySelector('input[name="status"]:checked')

    fetch("http://127.0.0.1:8000/saveme/create/", {
        method: 'POST', 
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "company":companyEl.value.trim(), 
            "country": countryEl.value.trim(), 
            "city": cityEl.value.trim(), 
            "comments": commentEl.value.trim(), 
            "URL": urlEl.value.trim(), 
            "status": statusEl.value.trim()
        })
    }) 

   
    .then(response => response.json()) 
    .then(data => console.log(data)) 
    .catch(error => console.error(error))  
}) 


searchBtn.addEventListener('click', function(event){
    event.preventDefault()

    let searchStatusEl = document.getElementById("status-dropdown")
    let searchCompanyEl = document.getElementById("search-company")
    let searchResultsEl = document.getElementById("search-results") 

    fetch("http://127.0.0.1:8000/saveme/search/", {
        method: "POST", 
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "company":searchCompanyEl.value.trim(), 
            "status": searchStatusEl.value.trim()
        })
})

    .then(response => response.json())
    .then(data =>{
        searchResultsEl.innerHTML = ""
        searchResultsEl.innerHTML = "Company | Location | Status" 


        for (let result of data){
            let resultEl = document.createElement("li")  
            const selectEl = document.createElement("select")
            selectEl.style.textAlign = "center" 
            const options = ['Applied', 'Will Apply', 'Rejected', 'OA', 'Intrvw1', 'Intrvw2', 'Intrvw3', 'Intrvw4'] 

            for(let j=0; j < options.length; j++){
                const option = document.createElement("option") 
                option.text = options[j] 
                selectEl.add(option)
            } 
            if(result.status == "WA"){
                selectEl.value = "Will Apply"
            }else if(result.status == "A"){
                selectEl.value = "Applied"
            }else if(result.status == "R"){
                selectEl.value = "Rejected"
            }else if(result.status == "I1"){
                selectEl.value = "Intrvw1"
            }else if(result.status == "I2"){
                selectEl.value = "Intrvw2"
            }else if(result.status == "I3"){
                selectEl.value = "Intrvw3"
            }else if(result.status == "I4"){
                selectEl.value = "Intrvw4"
            }else{selectEl.value = result.status }
            
            

            resultEl.textContent = " " + result.company + "  |  " + result.city + " | "
            resultEl.appendChild(selectEl) 

            // add event listener which will shoot and then call del api which deletes from current section and calls save api which saves to new location
            selectEl.addEventListener('click', function(){
                let updateStatus = selectEl.value 
                let id = result.id 


                fetch('http://127.0.0.1:8000/saveme/update/', {
                    method: "PUT", 
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        "id": id,
                        "status":updateStatus
                    })
                })
                .then(response => response.json()) 
            }) 

            searchResultsEl.appendChild(resultEl) 
        }
    }) 
    .catch(error => console.error(error))
}) 



function clearForm(){ // must work on clear button 
    console.log("Cleared")

    companyEl.textContent = "" 
    countryEl.textContent = "" 
    cityEl.textContent = "" 
    commentEl.textContent = "" 
    urlEl.textContent = ""  
} 
