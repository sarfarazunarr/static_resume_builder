
interface data {
    name: string,
    email: string,
    userRole: string,
    phone: string,
    portfolio_url: string,
    linkedin: string,
    address: string,
    professional_summary: string,
    skills: string[],
    certificates: string[],
    education: [{ degree: string, institute: string, year: string }],
    exprience: [{ role: string, company: string, daterange: string, responsibilities: string }],
    image: string
};
let editing = false;
let proediting = false;

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('finalData')) {
        const data: data = JSON.parse(localStorage.getItem('finalData') || "");
        fetchData(data);
    } else {
        setSampleData();
    }
})


function fetchData(data: data) {
    const name = document.getElementById('name') as HTMLHeadingElement;
    const role = document.getElementById('role') as HTMLHeadingElement;
    const image = document.getElementById('pic') as HTMLImageElement;
    const phone = document.getElementById('phone') as HTMLElement;
    const email = document.getElementById('email') as HTMLElement;
    const address = document.getElementById('address') as HTMLElement;
    const portfolio_url = document.getElementById('portfolio_url') as HTMLElement;
    const linkedin = document.getElementById('linkedin') as HTMLElement;
    const education = document.getElementById('education') as HTMLDivElement;
    const experience = document.getElementById('experience') as HTMLDivElement;
    const skills = document.getElementById('skills') as HTMLUListElement;
    const certificates = document.getElementById('certificates') as HTMLUListElement;
    const summary = document.getElementById('summary') as HTMLParagraphElement;

    name.innerHTML = data.name; role.innerHTML = data.userRole;
    image.src = data.image; phone.innerHTML = data.phone; email.innerHTML = data.email; address.innerHTML = data.address; portfolio_url.innerHTML = data.portfolio_url; linkedin.innerHTML = data.linkedin; summary.innerHTML = data.professional_summary;

    data.education.forEach((educationInfo) => {
        const mini_card = document.createElement('div');
        mini_card.classList.add('mini_card');
        const degreeHeading = document.createElement('h2');
        degreeHeading.textContent = educationInfo.degree;
        const instituteHeading = document.createElement('p');
        instituteHeading.textContent = educationInfo.institute;
        const daterange = document.createElement('p');
        daterange.classList.add('date');
        daterange.textContent = educationInfo.year;
        mini_card.appendChild(degreeHeading);
        mini_card.appendChild(instituteHeading);
        mini_card.appendChild(daterange);
        education.appendChild(mini_card);
    });

    data.exprience.forEach(expInfo => {
        const mini_card = document.createElement('div');
        mini_card.classList.add('mini_card');
        const roleHeading = document.createElement('h2');
        roleHeading.textContent = expInfo.role;
        const companyHeading = document.createElement('p');
        companyHeading.textContent = expInfo.company;
        const daterange = document.createElement('p');
        daterange.classList.add('date');
        daterange.textContent = expInfo.daterange + " Months";
        const responsibilities = document.createElement('p');
        responsibilities.classList.add('content');
        responsibilities.textContent = expInfo.responsibilities;
        mini_card.appendChild(roleHeading);
        mini_card.appendChild(companyHeading);
        mini_card.appendChild(daterange);
        mini_card.appendChild(responsibilities);
        experience.appendChild(mini_card);
    })

    data.skills.forEach((skill) => {
        const liElement = document.createElement('li');
        liElement.textContent = skill;
        skills.appendChild(liElement);
    })
    data.certificates.forEach((certificate) => {
        const liElement = document.createElement('li');
        liElement.textContent = certificate;
        certificates.appendChild(liElement);
    })
}

function generatePDF(): void {
    const resumeElement = document.getElementById('resume') as HTMLElement;
    const opt = {
        margin: [0, 0, 0, 0],
        padding: [0, 0, 0, 0],
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 2.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', orientation: 'portrait' }
    };

    // Generate the PDF from the specified element
    html2pdf().set(opt).from(resumeElement).save();
}

function enableEditing() {
    const name = document.getElementById('name') as HTMLHeadingElement;
    const role = document.getElementById('role') as HTMLHeadingElement;
    const phone = document.getElementById('phone') as HTMLElement;
    const email = document.getElementById('email') as HTMLElement;
    const address = document.getElementById('address') as HTMLElement;
    const portfolio_url = document.getElementById('portfolio_url') as HTMLElement;
    const linkedin = document.getElementById('linkedin') as HTMLElement;
    const education = document.getElementById('education') as HTMLDivElement;
    const experience = document.getElementById('experience') as HTMLDivElement;
    const skills = document.getElementById('skills') as HTMLUListElement;
    const certificates = document.getElementById('certificates') as HTMLUListElement;
    const summary = document.getElementById('summary') as HTMLParagraphElement;
    const editingbtn = document.getElementById('editingbtn') as HTMLButtonElement;
    if (!localStorage.getItem('userstatusediting')) {
        alert('Just click on the text elements and start editing your resume');
        localStorage.setItem('userstatusediting', 'true');
    }
    if (editing) {
        editingbtn.textContent = "Enable Editing"
        editing = false;
        name.contentEditable = "false"; role.contentEditable = "false";
        phone.contentEditable = "false";
        email.contentEditable = "false";
        address.contentEditable = "false";
        portfolio_url.contentEditable = "false";
        linkedin.contentEditable = "false";
        education.contentEditable = "false";
        experience.contentEditable = "false";
        skills.contentEditable = "false";
        certificates.contentEditable = "false";
        summary.contentEditable = "false";
    } else {
        editingbtn.textContent = "Disable Editing"
        editing = true;
        name.contentEditable = "true"; role.contentEditable = "true";
        phone.contentEditable = "true";
        email.contentEditable = "true";
        address.contentEditable = "true";
        portfolio_url.contentEditable = "true";
        linkedin.contentEditable = "true";
        education.contentEditable = "true";
        experience.contentEditable = "true";
        skills.contentEditable = "true";
        certificates.contentEditable = "true";
        summary.contentEditable = "true";
    }

}
function setSampleData() {
    const name = document.getElementById('name') as HTMLHeadingElement;
    const role = document.getElementById('role') as HTMLHeadingElement;
    const phone = document.getElementById('phone') as HTMLElement;
    const email = document.getElementById('email') as HTMLElement;
    const address = document.getElementById('address') as HTMLElement;
    const portfolio_url = document.getElementById('portfolio_url') as HTMLElement;
    const linkedin = document.getElementById('linkedin') as HTMLElement;
    const education = document.getElementById('education') as HTMLDivElement;
    const experience = document.getElementById('experience') as HTMLDivElement;
    const skills = document.getElementById('skills') as HTMLUListElement;
    const certificates = document.getElementById('certificates') as HTMLUListElement;
    const summary = document.getElementById('summary') as HTMLParagraphElement;
    const image = document.getElementById('pic') as HTMLImageElement;

    name.textContent = "Your Name"; role.textContent = "Your Role";
    phone.textContent = "Phone Number";
    email.textContent = "Your Email";
    address.textContent = "Your Address";
    portfolio_url.textContent = "Your website url";
    linkedin.textContent = "linkedinurl";
    summary.textContent = "Write about your self";
    image.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"

    const mini_card = document.createElement('div');
    mini_card.classList.add('mini_card');
    const degreeHeading = document.createElement('h2');
    degreeHeading.textContent = "Your Degree";
    const instituteHeading = document.createElement('p');
    instituteHeading.textContent = "Institute Name";
    const daterange = document.createElement('p');
    daterange.classList.add('date');
    daterange.textContent = "Year";
    mini_card.appendChild(degreeHeading);
    mini_card.appendChild(instituteHeading);
    mini_card.appendChild(daterange);
    education.appendChild(mini_card);

    const mini_card2 = document.createElement('div');
    mini_card2.classList.add('mini_card');
    const roleHeading = document.createElement('h2');
    roleHeading.textContent = "Your Role";
    const companyHeading = document.createElement('p');
    companyHeading.textContent = "Company Name";
    const timespan = document.createElement('p');
    timespan.classList.add('date');
    timespan.textContent = 1 + " Months";
    const responsibilities = document.createElement('p');
    responsibilities.classList.add('content');
    responsibilities.textContent = "Enlist your dedication";
    mini_card2.appendChild(roleHeading);
    mini_card2.appendChild(companyHeading);
    mini_card2.appendChild(timespan);
    mini_card2.appendChild(responsibilities);
    experience.appendChild(mini_card2);

    const liElement = document.createElement('li');
    liElement.textContent = "Skill 1";
    skills.appendChild(liElement);

    const liElement2 = document.createElement('li');
    liElement2.textContent = "Your Certificate";
    certificates.appendChild(liElement2);

}

function enableproEditing() {
    let btn = document.getElementById('editingprobtn') as HTMLButtonElement;
    if(!localStorage.getItem('userstatuseditingpro')) {
        alert('Click on any text heading or value and start editing you can make them bold or italic');  
        localStorage.setItem('userstatuseditingpro', 'true'); 
    }
    if (proediting) {
        document.designMode = "off";
        btn.innerText = "Pro Editing (Disabled)";
        proediting = false;
    } else {
        document.designMode = "on";
        btn.innerText = "Pro Editing (Enabled)";
        proediting = true;
    }
}

function html2pdf() {
    throw new Error("Function not implemented.");
}

function clearData() {
    localStorage.removeItem('finalData');
    setSampleData();
}