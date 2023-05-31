// function saveLead() {
//     console.log("Button clicked from onclick attribute!")
// }
//
// let inputBtn = document.getElementById("input_btn");
// inputBtn.addEventListener("click", function () {
//     console.log("Button clicked from addEventListener!");
// })

let myLeads = []
const inputEl = document.getElementById("input_el");
const inputBtn = document.getElementById("input_btn");
const ulEl = document.getElementById("ul_el");
const deleteBtn = document.getElementById("delete_btn");
const tabBtn = document.getElementById("tab_btn");

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads);
}

// let tab = [{url: "https://www.rockstargames.com/"}];

tabBtn.addEventListener("click", function () {

    // chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    //     // since only one tab should be active and in the current window at once
    //     // the return variable should only have one entry
    //     var activeTab = tabs[0];
    //     var activeTabId = activeTab.id; // or do whatever you need
    // });

    chrome.tabs.query({
        active: true, currentWindow: true
    }, function (tabs) {
        // console.log(tabs);
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })


// console.log(tab[0].url);
})

function render(leads) {
    let listItem = ""
    for (let i = 0; i < leads.length; i++) {
        // listItem += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>";
        listItem += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>`;
    }
    ulEl.innerHTML = listItem;
}

deleteBtn.addEventListener("dblclick", function () {
    // console.log("double click")
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})


inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    // console.log(myLeads);
    render(myLeads);
    // console.log(localStorage.getItem("myLeads"))
})
