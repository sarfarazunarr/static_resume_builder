document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('data')) {
        displayData();
    }
})


// Eduation & Experience Data
let education: [{ degree: string, institute: string, year: string }] = [{ degree: "", institute: "", year: "" }];

let exprience: [{ role: string, company: string, daterange: string }] = [{ role: "", company: "", daterange: "" }];

let fileData: { fileName: string  | undefined, fileType: string | undefined, fileContent: string | undefined } = { fileName: "", fileType: "", fileContent: "" };
let proEditingMode = false;

// Function for moving to next section
function nextSection(show: string, hide: string) {
    const section = document.getElementById(show);
    const section2 = document.getElementById(hide);
    if (section && section2) {
        section.classList.remove('hidden')
        section2.classList.add('hidden');
    }
}

// Adding Education data to array
const addEducation = () => {
    const degreedata = document.getElementById('degree') as HTMLInputElement;
    const institutedata = document.getElementById('institute') as HTMLInputElement;
    const yeardata = document.getElementById('year') as HTMLInputElement;


    const data = {
        degree: degreedata.value,
        institute: institutedata.value,
        year: yeardata.value
    };

    // Push the data to the education array
    education.push(data);

    // Get the preview container
    let preview = document.getElementById('edu_preview') as HTMLUListElement;

    const listItem = document.createElement('li');
    listItem.innerHTML = `${data.degree} | ${data.institute} | ${data.year} <button class="delete">Delete</button>`;

    preview.appendChild(listItem);

    // Add event listener for the delete button
    const deleteButton = listItem.querySelector('.delete') as HTMLButtonElement;
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
    const role = document.getElementById('exp_role') as HTMLInputElement;
    const company = document.getElementById('company') as HTMLInputElement;
    const months = document.getElementById('daterange') as HTMLInputElement;

    const data = {
        role: role.value,
        company: company.value,
        daterange: months.value
    };

    exprience.push(data);

    // Get the preview container
    let preview = document.getElementById('exp_preview') as HTMLUListElement;


    const listItem = document.createElement('li');
    listItem.innerHTML = `${data.role} | ${data.company} | ${data.daterange} <button class="delete">Delete</button>`;

    preview.appendChild(listItem);


    const deleteButton = listItem.querySelector('.delete') as HTMLButtonElement;
    deleteButton.addEventListener('click', () => {
        preview.removeChild(listItem);

        const index = exprience.findIndex(item => item.role === data.role && item.company === data.company && item.daterange === data.daterange);

        if (index !== -1) {
            exprience.splice(index, 1);
        }
    });
};



function getImage(){
    const filedata = document.getElementById('image') as HTMLInputElement;
    const file = filedata?.files;
    console.log('Event Triggered')
    if(file){
        const fileReader = new FileReader();
        console.log("file reader passed")
        fileReader.onload = event =>{
            const data = event?.target?.result;
                localStorage.setItem('image', JSON.stringify(data))
                console.log("image set", data)
        }
    }
}
let chooseImage:HTMLInputElement = document.getElementById('image') as HTMLInputElement;
chooseImage.addEventListener('change', getImage);



// Collecting all data and saving!
const collectData = (e: Event) => {
    const btn: HTMLButtonElement = e.target as HTMLButtonElement;
    console.log(fileData)

    btn.innerText = "Saving Data...";
    let username: HTMLInputElement = document.getElementById('name') as HTMLInputElement;
    let userRole: HTMLInputElement = document.getElementById('role') as HTMLInputElement;
    let coverletter: HTMLInputElement = document.getElementById('coverletter') as HTMLInputElement;
    let phone: HTMLInputElement = document.getElementById('phone') as HTMLInputElement;
    let email: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
    let url: HTMLInputElement = document.getElementById('url') as HTMLInputElement;
    let skills: HTMLInputElement = document.getElementById('skills') as HTMLInputElement;

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

}

const createbtn = document.getElementById('create') as HTMLButtonElement
createbtn.addEventListener(('click'), collectData);

// Display Data in resume

function displayData() {

    let intro = document.getElementById('intro') as HTMLElement;
    intro.classList.add('hidden');
    let resume = document.getElementById('resume') as HTMLElement;
    resume.classList.remove('hidden');


    let dataString = localStorage.getItem('data');
    let data = JSON.parse(dataString as string);

    // Getting elements
    const imagecontainer = document.getElementById('userimage') as HTMLImageElement;
    const name = document.getElementById('username') as HTMLElement;
    const role = document.getElementById('userrole') as HTMLElement;
    const coverletter = document.getElementById('usercoverletter') as HTMLElement;
    const phone = document.getElementById('usercontact') as HTMLElement;
    const email = document.getElementById('useremail') as HTMLElement;
    const url = document.getElementById('userwebsite') as HTMLElement;
    const skills = document.getElementById('userskills') as HTMLUListElement;
    const education = document.getElementById('usereducation') as HTMLElement;
    const experience = document.getElementById('userexpereince') as HTMLElement;


    // Display data
    name.innerHTML = data.name;
    role.innerHTML = data.role;
    coverletter.innerHTML = data.coverletter;
    phone.innerHTML = data.phone;
    email.innerHTML = data.email;
    url.innerHTML = data.url;
    imagecontainer.src = localStorage.getItem('image') || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    let skilldata: string[] = data.skills.split(',');


    skilldata.forEach(element => {
        let skillElement = document.createElement('li')
        skillElement.innerHTML = element;
        skills.appendChild(skillElement)
    });
    // Remove first empty element
    data.education.shift()
    data.exprience.shift()


    data.education.forEach((element:{degree:string, institute:string, year:string}) => {
        let edu_card = document.createElement('div')
        edu_card.classList.add('card');
        edu_card.innerHTML = `
                    <li >HTML</li>
        <h4 style="margin-bottom: -10px; contenteditable="true"">${element.degree}</h4>
        <p contenteditable="true">${element.institute} - ${element.year}</p>`;
        education.appendChild(edu_card)
    });

    data.exprience.forEach((element: {role:string, company:string, daterange:string}) => {
        let exp_card  = document.createElement('div');
        exp_card.classList.add('card');
        exp_card.innerHTML = `<h4 style="margin-bottom: -10px;" contenteditable="true">${element.role}</h4>
        <p contenteditable="true">${element.company} - ${element.daterange}</p>`
        experience.appendChild(exp_card)
    })

}


function proEditing(e:Event){
    const btn: HTMLButtonElement = e.target as HTMLButtonElement;

    if(proEditingMode){
        document.designMode = "off";
        btn.innerText = "Pro Editing (Disabled)"
        proEditingMode = false;
    } else {
        document.designMode = "on";
        btn.innerText = "Pro Editing (Enabled)";
        proEditingMode = true;
    }
}

function shareLink(){
    const getdata = localStorage.getItem('data') || ""
    const data = JSON.parse(getdata);
    navigator.share({title: `Resume of ${data.name}`, text: `Here you can view my resume!`, url: `${location.href}/@${data.name.toLowerCase().replace(" ", "-")}`})
    navigator.clipboard.writeText(`${location.href}@${data.name.toLowerCase().replace(" ", "-")}`);
    alert('Url Copied Successfully!')
    
}

function printPage(){
    let resume = document.getElementById('resume') as HTMLElement;
    resume.style.width = "100vw";
    window.print()

}


