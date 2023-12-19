let counter = 0
function createExpenseForm({id, expense, des}) {
    // Create form element
    var form = document.createElement('form');
    form.id = 'expense-tracker';

    if(id !== undefined) {
        form.setAttribute('uniqueId', `${id}`)
    }

    // Create expense input
    var expenseInput = document.createElement('input');
    expenseInput.type = 'number';
    expenseInput.id = 'expense';
    expenseInput.placeholder = 'Enter Expense';
    if(expense !== undefined) {
        expenseInput.value = expense
    }

    // Create expense label
    var expenseLabel = document.createElement('label');
    expenseLabel.textContent = 'Expense';
    
    // Create description input
    var descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.id = 'des';
    descriptionInput.placeholder = 'Description';
    if(des !== undefined) {
        descriptionInput.value = des
    }

    // Create description label
    var descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description';
    
    // Create submit button
    var submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.id = 'save';
    submitButton.value = 'Save';
    
    // Append elements to the form
    form.appendChild(expenseInput);
    form.appendChild(expenseLabel);
    form.appendChild(descriptionInput);
    form.appendChild(descriptionLabel);
    form.appendChild(submitButton);

    form.onsubmit = function(e){
        let expense = document.getElementById('expense')
        let des = document.getElementById('des')
        e.preventDefault();
        if(expenseInput.value === '' || descriptionInput.value === '') {
          alert('Please enter all fields')
        } else {
        let expenseObj, li, data
        if(id !== undefined && localStorage.getItem(id) !== undefined) {
            expenseObj = JSON.parse(localStorage.getItem(id))
            expenseObj.expense = `${expenseInput.value}`
            expenseObj.des =  `${descriptionInput.value}`
            localStorage.removeItem(expenseObj.id)
            localStorage.setItem(id,JSON.stringify(expenseObj))
            li = document.getElementById(`${id}`)
            $(`#modal-${expenseObj.id}`).modal('hide')
            li.textContent = `${expenseObj.expense} : ${expenseObj.des}`
            li.appendChild(createModal(createExpenseForm(expenseObj)))
            $(`#modal-${expenseObj.id}`).modal('show');
            data = expenseObj
        }
        else {
            expenseObj = {
            id : counter,
            expense: `${expenseInput.value}`,
            des: `${descriptionInput.value}`
            }
            localStorage.setItem(expenseObj.id,JSON.stringify(expenseObj))
            li = document.createElement('li')
            li.className = 'text-info m-5'
            data = JSON.parse(localStorage.getItem(counter++))
            li.appendChild(document.createTextNode(`${data.expense} : ${data.des}`))
            li.id = `${data.id}`
            li.appendChild(createModal(createExpenseForm(data)))
        }
            let btnDelete = document.createElement('button')
            btnDelete.className = 'btn btn-danger btn-sm m-1 float-right delete'
            btnDelete.appendChild(document.createTextNode('Delete Expense'))
            li.appendChild(btnDelete)
            let btnEdit = document.createElement('button')
            btnEdit.className = 'btn btn-success btn-sm m-1 float-right edit'
            btnEdit.appendChild(document.createTextNode('Edit Expense'))
            li.appendChild(btnEdit)
            details.appendChild(li)
            expense.value = ''
            des.value = ''
        }
    }

    return form
}

document.getElementById('form-container').appendChild(createExpenseForm({}))

let details = document.getElementById('details')
details.addEventListener('click', removeItem)
details.addEventListener('click', editItem)

function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are You Sure?')){
        let li = e.target.parentElement;
        details.removeChild(li);
        localStorage.removeItem(li.value)        
        
        }
    }
}

function editItem(e){
    if(e.target.classList.contains('edit')){
        let li = e.target.parentElement;
        console.log(e.target.parentElement.id)
        let data = JSON.parse(localStorage.getItem(li.id))
        $(`#modal-${data.id}`).modal('show');
    }
}

function createModal(form) {
    // Create modal element
    var modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'modal-' + form.getAttribute('uniqueId');
    // Create modal dialog
    var modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog';

    // Create modal content
    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // Create modal header
    var modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';

    // Create modal title
    var modalTitle = document.createElement('h4');
    modalTitle.className = 'modal-title';
    modalTitle.textContent = 'Expense Tracker Form';

    // Create close button
    var closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'close';
    closeButton.setAttribute('data-dismiss', 'modal');
    closeButton.innerHTML = '&times;';
    closeButton.onclick = (e) => {
        e.preventDefault()
        $(`#${modal.id}`).modal('hide')
    }
    // Append title and close button to the header
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    // Create modal body
    var modalBody = document.createElement('div');
    modalBody.className = 'modal-body';

    // Append the form to the modal body
    modalBody.appendChild(form);

    // Create modal footer
    var modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';

    // Create close button for the footer
    var closeFooterButton = document.createElement('button');
    closeFooterButton.type = 'button';
    closeFooterButton.className = 'btn btn-secondary';
    closeFooterButton.setAttribute('data-dismiss', 'modal');
    closeFooterButton.textContent = 'Close';
    closeFooterButton.onclick = (e) => {
        e.preventDefault()
        $(`#${modal.id}`).modal('hide')
    }
    // Append close button to the footer
    modalFooter.appendChild(closeFooterButton);

    // Append header, body, and footer to the modal content
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    // Append modal content to the modal dialog
    modalDialog.appendChild(modalContent);

    // Append modal dialog to the modal
    modal.appendChild(modalDialog);

    return modal
}