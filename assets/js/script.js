// TELA DE INÍCIO
const welcome = document.querySelector('#welcome')
const content = document.querySelector('#container-content')
const startButton = document.querySelector('#start-btn')

startButton.addEventListener('click', () => {
    welcome.classList.add('hide')
    content.classList.remove('hide')
})

// selecionando elementos de criar e editar contatos
const contactButton = document.querySelector('#add-btn')
const closeCreateButton = document.querySelector('#close-create')
const closeEditButton = document.querySelector('#close-edit')
const create = document.querySelector('#create-contact')
const createFade = document.querySelector('#create-fade')
const edit = document.querySelector('#edit-contact')
const editFade = document.querySelector('#edit-fade')
const saveCreateButton = document.querySelector('#save-create')
const saveEditButton = document.querySelector('#save-edit')
const completeList = document.querySelector('.contact-list')
const inputName = document.querySelector('#input-name')
const inputPhone = document.querySelector('#input-phone')
const editName = document.querySelector('#edit-name')
const editPhone = document.querySelector('#edit-phone')

// colocando máscara para deixar o input phone no formato correto
$('#input-phone, #edit-phone').mask('(00) 00000-0000')

// criando uma array para armazenar os contatos e uma para o index do que for selecionado
let listContacts = []
let editIndex = null

// função para transição do modal
const toggleModal = (modal, fade) => {
    modal.classList.toggle('hide')
    fade.classList.toggle('hide')
}

const addContact = () => {
    listContacts.push({
        name: inputName.value,
        phoneNumber: inputPhone.value
    })
    inputName.value = ''
    inputPhone.value = ''
    toggleModal(create, createFade)
    showContacts()
}

const editContact = (index) => {
    editIndex = index
    editName.value = listContacts[index].name
    editPhone.value = listContacts[index].phoneNumber
    toggleModal(edit, editFade)
}

const saveEdit = () => {
    if (editIndex !== null) {
        listContacts[editIndex] = {
            name: editName.value,
            phoneNumber: editPhone.value
        }
        toggleModal(edit, editFade)
        showContacts()
    }
}

const showContacts = () => {
    let numberContacts = document.querySelector('#number-contacts')
    let contactItems = ''

    listContacts.forEach((contact, index) => {
        contactItems += `
        <li class="contact">
            <p class="contact-name">${contact.name}</p>
            <p class="phone-number">${contact.phoneNumber}</p>
            <div class="icons">
                <i class="fa-solid fa-pen-to-square" onclick="editContact(${index})"></i>
                <img class="delete-contact" src="assets/img/trash.png" alt="trash" onclick="deleteContact(${index})">
            </div>
        </li>`
    })

    const contactList = document.querySelector('.contact-list')

    const header = contactList.querySelector('.contact-header')
    contactList.innerHTML = ''
    if (header) {
        contactList.appendChild(header)
    }

    // adiciona os novos contatos
    contactList.insertAdjacentHTML('beforeend', contactItems)

    // atualiza o número de contatos
    numberContacts.innerHTML = `(${listContacts.length})`
}

const deleteContact = (index) => {
    listContacts.splice(index, 1)
    showContacts()
}

// todos os eventos de click presentes no código
contactButton.addEventListener('click', () => toggleModal(create, createFade))
closeCreateButton.addEventListener('click', () => toggleModal(create, createFade))
closeEditButton.addEventListener('click', () => toggleModal(edit, editFade))
saveCreateButton.addEventListener('click', addContact)
saveEditButton.addEventListener('click', saveEdit)