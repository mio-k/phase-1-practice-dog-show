// As the page loads, grab all the dogs from db.json and pass it to the fillInARow function.

document.addEventListener('DOMContentLoaded', (fetchPups) => {
    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(data => {
        for (eachDog of data){
            fillInARow(eachDog);
        };
    });
});

// Receives one dog at a time and render in the table.  Also put an evernt listener on the edit button, and when clicked pass the dog info to the editDog function.
function fillInARow(eachDog){
    const table = document.getElementById('table-body');
    const editBtn = document.createElement('button');
    editBtn.innerText = "Edit";
    editBtn.addEventListener('click', () => editDog(eachDog));
    let tr = document.createElement('tr');
    tr.id = eachDog.id;
    let td1 = document.createElement('td');
    td1.innerText = eachDog.name;
    let td2 = document.createElement('td');
    td2.innerText = eachDog.breed;
    let td3 = document.createElement('td');
    td3.innerText = eachDog.sex;
    let td4 = document.createElement('td');
    td4.appendChild(editBtn);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    table.appendChild(tr);
};

// map the form fields to the db fields.  Also here adding the dataset.id so we can use it in the next function to make a fetch request.(also added the data-id in the html)
function editDog(eachDog){
    const dogField = document.getElementById('dog-form');
    dogField.name.value = eachDog.name;
    dogField.breed.value = eachDog.breed;
    dogField.sex.value = eachDog.sex;
    dogField.dataset.id = eachDog.id;
};

// Listens for form submissions, and prevent reloading the page when the submit button is clicked. Then make a fetch request and update the db with the value in the input form. also send the same info to the editDog function to update the table.  Finally reload the page to show the updated table.
const form = document.getElementById('dog-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/dogs/${event.target.dataset.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            name:`${event.target.name.value}`,
            breed: `${event.target.breed.value}`,
            sex: `${event.target.sex.value}`,
        }),
        headers: {
            'Content-type':"application/json",
        },
    })
    .then(response => response.json())
    .then(data => editDog(data))
    .then(window.location.reload())
});