'use strict';

let records = [
    { id: '1', phone: '+380503543457', fullName: 'Jora Koval', email: 'Jora@gmail.com', address: 'Kyiv'}, 
    { id: '2', phone: '+380933824358', fullName: 'Winston Churchill', email: 'winston@gmail.com', address: 'London'},
    { id: '3', phone: '+380943847526', fullName: 'Antonio Banderas', email: 'antonio@gmail.com', address: 'Madrid'},
];

let selectedRecordPrevData = {};

function drawRecords(records) {
    document.querySelector('[data-records]').innerHTML = ``;
    let template = ``;
    records.forEach((record) => {
        template += `<tr data-record-selector data-id="${record.id}">
            <td scope="row"><input name="phone" data-phone value="${record.phone}" readonly></td>
            <td><input name="fullName" data-fullname value="${record.fullName}" readonly></td>
            <td><input name="email" data-email value="${record.email}" readonly></td>
            <td><input name="address" data-address value="${record.address}" readonly></td>
            <td>
                <div class="btns-edit-delete">
                    <span class="btn-defolt btn-edit" data-btn="edit">Edit</span> | 
                    <span class="btn-defolt btn-delete" data-btn="delete">Delete</span>
                </div>
                <div class="btns-save-cancel hidden">
                    <span class="btn-defolt btn-save" data-btn="save">Save</span>
                </div>
            </td>
        </tr>`;
    });
    document.querySelector('[data-records]').innerHTML = template;
}
    drawRecords(records);

function addRecord() {
    const formAdd = document.querySelector('[data-form-add]'),
          phone = document.getElementById('inputPhone').value,
          fullName = document.getElementById('inputName').value,
          email = document.getElementById('inputEmail').value,
          address = document.getElementById('inputAddress').value,
          id = new Date().getTime();
          records.push({id: id, phone: phone, fullName: fullName, email: email, address: address});

        drawRecords(records);
        clearFormAddFields();

    console.log(records);
}

function editRecord(clickedElement) {
    const currentRecordRow = clickedElement.closest('[data-record-selector]');
    const inputs = currentRecordRow.querySelectorAll('input');

    currentRecordRow.querySelector('.btns-edit-delete').classList.add('hidden');
    currentRecordRow.querySelector('.btns-save-cancel').classList.remove('hidden');

    inputs.forEach(input => {
        input.removeAttribute('readonly');
    });

    console.log(records);
}

function deleteRecord(clickedElement) {
    const currentRecordRow = clickedElement.closest('[data-record-selector]');
    const id = currentRecordRow.getAttribute("data-id");
    records = records.filter(record => {
        return parseInt(record.id) !== parseInt(id);
    });

    currentRecordRow.remove();

    console.log(records);
}

function saveRecord(clickedElement) {
    const currentRecordRow = clickedElement.closest('[data-record-selector]');
    const id = currentRecordRow.getAttribute("data-id");
    const phone = currentRecordRow.querySelector('[data-phone]').value;
    const fullName = currentRecordRow.querySelector('[data-fullName]').value;
    const email = currentRecordRow.querySelector('[data-email]').value;
    const address = currentRecordRow.querySelector('[data-address]').value;

    for(let obj of records) {
        if(parseInt(obj.id) === parseInt(id)) {
            obj.fullName = fullName;
            obj.email = email;
            obj.phone = phone;
            obj.address = address;
        }
    }

    const inputs = currentRecordRow.querySelectorAll('input');

    setFieldsReadonly(inputs);
    resetButtons(currentRecordRow);

    console.log(records);
}

function resetButtons(btnsContainer) {
    btnsContainer.querySelector('.btns-edit-delete').classList.remove('hidden');
    btnsContainer.querySelector('.btns-save-cancel').classList.add('hidden');
}

function setFieldsReadonly(inputsArray) {
    inputsArray.forEach(input => {
        input.setAttribute('readonly', 'readonly');
    });
}

function clearFormAddFields() {
    const formAdd = document.querySelector('[data-form-add]');
    formAdd.querySelectorAll('input').forEach(input => input.value = '');
}

document.addEventListener('click', function (e) {
    e.preventDefault();

    const clickedElement = e.target;

    if (clickedElement.getAttribute("data-btn") === 'add') {
        addRecord();
    }
    else if (clickedElement.getAttribute("data-btn") === 'delete') {
        deleteRecord(clickedElement);
    }
    else if (clickedElement.getAttribute("data-btn") === 'edit') {
        editRecord(clickedElement);
    }
    
    else if (clickedElement.getAttribute("data-btn") === 'save') {
        saveRecord(clickedElement);
    }
    console.log(e.target);
});




