// Data handlers
let education: [{ degree: string, institute: string, year: string }] = [];

let exprience: [{ role: string, company: string, daterange: string, responsibilities: string }] = [];

let imagePath: string;


function nextSection(show: string, hide: string) {
    const section = document.getElementById(show);
    const section2 = document.getElementById(hide);
    if (section && section2) {
        section.classList.remove('hidden')
        section2.classList.add('hidden');
    }
}


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
    let preview = document.getElementById('edu_preview') as HTMLTableElement;
    const row = document.createElement('tr');
    const degreeCell = document.createElement('td');
    const instituteCell = document.createElement('td');
    const yearCell = document.createElement('td');
    const deleteCell = document.createElement('td');
    
    degreeCell.textContent = data.degree;
    instituteCell.textContent = data.institute;
    yearCell.textContent = data.year;
    deleteCell.innerHTML = `<button class="delete">X</button>`;
    
    row.appendChild(degreeCell);
    row.appendChild(instituteCell);
    row.appendChild(yearCell);
    row.appendChild(deleteCell);
    preview.appendChild(row);

    degreedata.value = "";
    institutedata.value = "",
    yeardata.value = "";

    // Add event listener for the delete button
    const deleteButton = deleteCell.querySelector('.delete') as HTMLButtonElement;
    deleteButton.addEventListener('click', (item) => {

        preview.removeChild(row);

        const index = education.findIndex(item => item.degree === data.degree && item.institute === data.institute && item.year === data.year);

        if (index !== -1) {
            education.splice(index, 1);
        }
    });
};

const addExperience = () => {
    const role = document.getElementById('role') as HTMLInputElement;
    const company = document.getElementById('company') as HTMLInputElement;
    const months = document.getElementById('months') as HTMLInputElement;
    const responsibilities = document.getElementById('responsibilities') as HTMLInputElement;

    const data = {
        role: role.value,
        company: company.value,
        daterange: months.value,
        responsibilities: responsibilities.value
    };

    exprience.push(data);

    // Get the preview container
    let preview = document.getElementById('exp_preview') as HTMLTableElement;

    const row = document.createElement('tr');
    const roleCell = document.createElement('td');
    const companyCell = document.createElement('td');
    const daterangeCell = document.createElement('td');
    const deleteCell = document.createElement('td');
    
    roleCell.textContent = data.role;
    companyCell.textContent = data.company;
    daterangeCell.textContent = data.daterange;
    deleteCell.innerHTML = `<button class="delete">X</button>`;
    
    row.appendChild(roleCell);
    row.appendChild(companyCell);
    row.appendChild(daterangeCell);
    row.appendChild(deleteCell);
    preview.appendChild(row);
    role.value = ""    
    company.value = ""
    months.value = ""
    responsibilities.value = ""

    const deleteButton = deleteCell.querySelector('.delete') as HTMLButtonElement;
    deleteButton.addEventListener('click', () => {
        preview.removeChild(row);

        const index = exprience.findIndex(item => item.role === data.role && item.company === data.company && item.daterange === data.daterange);

        if (index !== -1) {
            exprience.splice(index, 1);
        }
    });
};

function setImage(): void {
    const imageInput = document.getElementById('image') as HTMLInputElement;
    const imgPreview = document.getElementById('img_preview') as HTMLImageElement;

    if (imageInput.files && imageInput.files[0]) {
        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result as string;
            imgPreview.src = base64String;
            imagePath = base64String;
        };
        reader.readAsDataURL(file);
    }
}

function loadImageFromLocalStorage(): void {
    const imgPreview = document.getElementById('img_preview') as HTMLImageElement;
    const base64String = localStorage.getItem('imageBase64');

    if (base64String) {
        imgPreview.src = base64String;
    }
}

const generateResume = () => {
    const name = document.getElementById('name') as HTMLInputElement
    const role = document.getElementById('userrole') as HTMLInputElement

    const email = document.getElementById('email') as HTMLInputElement
    const phone = document.getElementById('phone') as HTMLInputElement
    const portfolio_url = document.getElementById('portfoliourl') as HTMLInputElement
    const linkedin = document.getElementById('linkedin') as HTMLInputElement
    const address = document.getElementById('address') as HTMLTextAreaElement
    const professional_summary = document.getElementById('summary') as HTMLTextAreaElement
    const skills = document.getElementById('skills') as HTMLTextAreaElement
    const certificates = document.getElementById('certificates') as HTMLTextAreaElement
    const finalSkills = skills.value?.split(',');
    const finalCertificates = certificates.value?.split(',');
    const finalData = {
        name: name.value,
        email: email.value,
        userRole: role.value,
        phone: phone.value,
        portfolio_url: portfolio_url.value,
        linkedin: linkedin.value,
        address: address.value,
        professional_summary: professional_summary.value,
        skills: finalSkills,
        certificates: finalCertificates,
        education: education,
        exprience: exprience,
        image: imagePath
    };
    localStorage.setItem('finalData', JSON.stringify(finalData));
    nextSection('area_9', 'area_8');
}


