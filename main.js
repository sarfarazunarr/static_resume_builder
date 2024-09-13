"use strict";
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('data')) {
        displayData();
    }
});
// Eduation & Experience Data
let education = [{ degree: "", institute: "", year: "" }];
let exprience = [{ role: "", company: "", daterange: "" }];
let fileData = { fileName: "", fileType: "", fileContent: "" };
let proEditingMode = false;
// Function for moving to next section
function nextSection(show, hide) {
    const section = document.getElementById(show);
    const section2 = document.getElementById(hide);
    if (section && section2) {
        section.classList.remove('hidden');
        section2.classList.add('hidden');
    }
}
// Adding Education data to array
const addEducation = () => {
    const degreedata = document.getElementById('degree');
    const institutedata = document.getElementById('institute');
    const yeardata = document.getElementById('year');
    const data = {
        degree: degreedata.value,
        institute: institutedata.value,
        year: yeardata.value
    };
    // Push the data to the education array
    education.push(data);
    // Get the preview container
    let preview = document.getElementById('edu_preview');
    const listItem = document.createElement('li');
    listItem.innerHTML = `${data.degree} | ${data.institute} | ${data.year} <button class="delete">Delete</button>`;
    preview.appendChild(listItem);
    // Add event listener for the delete button
    const deleteButton = listItem.querySelector('.delete');
    deleteButton.addEventListener('click', (item) => {
        preview.removeChild(listItem);
        const index = education.findIndex(item => item.degree === data.degree && item.institute === data.institute && item.year === data.year);
        if (index !== -1) {
            education.splice(index, 1);
        }
    });
};
// Function for adding expereince
const addExperience = () => {
    const role = document.getElementById('exp_role');
    const company = document.getElementById('company');
    const months = document.getElementById('daterange');
    const data = {
        role: role.value,
        company: company.value,
        daterange: months.value
    };
    exprience.push(data);
    // Get the preview container
    let preview = document.getElementById('exp_preview');
    const listItem = document.createElement('li');
    listItem.innerHTML = `${data.role} | ${data.company} | ${data.daterange} <button class="delete">Delete</button>`;
    preview.appendChild(listItem);
    const deleteButton = listItem.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
        preview.removeChild(listItem);
        const index = exprience.findIndex(item => item.role === data.role && item.company === data.company && item.daterange === data.daterange);
        if (index !== -1) {
            exprience.splice(index, 1);
        }
    });
};
function getImage() {
    const filedata = document.getElementById('image');
    const file = filedata?.files;
    console.log('Event Triggered');
    if (file) {
        const fileReader = new FileReader();
        console.log("file reader passed");
        fileReader.onload = event => {
            const data = event?.target?.result;
            localStorage.setItem('image', JSON.stringify(data));
            console.log("image set", data);
        };
    }
}
let chooseImage = document.getElementById('image');
chooseImage.addEventListener('change', getImage);
// Collecting all data and saving!
const collectData = (e) => {
    const btn = e.target;
    console.log(fileData);
    btn.innerText = "Saving Data...";
    let username = document.getElementById('name');
    let userRole = document.getElementById('role');
    let coverletter = document.getElementById('coverletter');
    let phone = document.getElementById('phone');
    let email = document.getElementById('email');
    let url = document.getElementById('url');
    let skills = document.getElementById('skills');
    // Stringify all data
    let data = {
        name: username.value,
        role: userRole.value,
        coverletter: coverletter.value,
        phone: phone.value,
        email: email.value,
        url: url.value,
        skills: skills.value,
        education: education,
        exprience: exprience
    };
    let dataString = JSON.stringify(data);
    console.log(data);
    localStorage.setItem('data', dataString);
    btn.innerText = "Date Saved";
    displayData();
};
const createbtn = document.getElementById('create');
createbtn.addEventListener(('click'), collectData);
// Display Data in resume
function displayData() {
    let intro = document.getElementById('intro');
    intro.classList.add('hidden');
    let resume = document.getElementById('resume');
    resume.classList.remove('hidden');
    let dataString = localStorage.getItem('data');
    let data = JSON.parse(dataString);
    // Getting elements
    const imagecontainer = document.getElementById('userimage');
    const name = document.getElementById('username');
    const role = document.getElementById('userrole');
    const coverletter = document.getElementById('usercoverletter');
    const phone = document.getElementById('usercontact');
    const email = document.getElementById('useremail');
    const url = document.getElementById('userwebsite');
    const skills = document.getElementById('userskills');
    const education = document.getElementById('usereducation');
    const experience = document.getElementById('userexpereince');
    // Display data
    name.innerHTML = data.name;
    role.innerHTML = data.role;
    coverletter.innerHTML = data.coverletter;
    phone.innerHTML = data.phone;
    email.innerHTML = data.email;
    url.innerHTML = data.url;
    imagecontainer.src = localStorage.getItem('image') || "https://avatars.githubusercontent.com/u/130893009?v=4";
    let skilldata = data.skills.split(',');
    skilldata.forEach(element => {
        let skillElement = document.createElement('li');
        skillElement.innerHTML = element;
        skills.appendChild(skillElement);
    });
    // Remove first empty element
    data.education.shift();
    data.exprience.shift();
    data.education.forEach((element) => {
        let edu_card = document.createElement('div');
        edu_card.classList.add('card');
        edu_card.innerHTML = `
                    <li >HTML</li>
        <h4 style="margin-bottom: -10px; contenteditable="true"">${element.degree}</h4>
        <p contenteditable="true">${element.institute} - ${element.year}</p>`;
        education.appendChild(edu_card);
    });
    data.exprience.forEach((element) => {
        let exp_card = document.createElement('div');
        exp_card.classList.add('card');
        exp_card.innerHTML = `<h4 style="margin-bottom: -10px;" contenteditable="true">${element.role}</h4>
        <p contenteditable="true">${element.company} - ${element.daterange}</p>`;
        experience.appendChild(exp_card);
    });
}
function proEditing(e) {
    const btn = e.target;
    if (proEditingMode) {
        document.designMode = "off";
        btn.innerText = "Pro Editing (Disabled)";
        proEditingMode = false;
    }
    else {
        document.designMode = "on";
        btn.innerText = "Pro Editing (Enabled)";
        proEditingMode = true;
    }
}
function shareLink() {
    const getdata = localStorage.getItem('data') || "";
    const data = JSON.parse(getdata);
    navigator.share({ title: `Resume of ${data.name}`, text: `Here you can view my resume!`, url: `${location.href}/@${data.name.toLowerCase().replace(" ", "-")}` });
    navigator.clipboard.writeText(`${location.href}@${data.name.toLowerCase().replace(" ", "-")}`);
    alert('Url Copied Successfully!');
}
function printPage() {
    let resume = document.getElementById('resume');
    resume.style.width = "100vw";
    window.print();
}
