import './Customers.css'
import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import AddForm from '../../components/form/AddForm'
import EditForm from '../../components/form/EditForm'
import Operations from '../../components/operations/Operations'
import Table from '../../components/table/Table'

const Customers = ({customerArray, setCustomerArrayHandler, invoiceArray}) => {
    
    // ADD FORM DATA

    const [addFormData, setAddFormData] = useState({
        name: '',
        surname: '',
        address: '',
        age: '',
    })

    //SELECTED ROW

    const [selectedRow, setSelectedRow] = useState('')
    const [activeClass, setActiveClass] = useState()

    //VISIBILITY VARIABLES

    const [isVisible, setisVisible] = useState(false)
    const [isVisibleEdit, setisVisibleEdit] = useState(false)

    //ERROR MESSAGE 
  
    const [errorMessage, setErrorMessage] = useState('')
    const [errorState, setErrorState] = useState(false)

     //THIS IS A ERROR HANDLER

     const errorHandler = (message) =>{
        setErrorMessage(message)
        setErrorState(true)

        const timeFunc = () => {
            setErrorState(false)
        }

        setTimeout(timeFunc, 3000)
    }

    // VARIABLES FOR EDITING CUSTOMERS

    const [editFormData, setEditFormData] = useState({
        name: '',
        surname: '',
        address: '',
        age: '',
    })


    // IS A ROW SELECTED

    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    // ADD CUSTOMER FUNCTIONS

    const handleAddFormOnChange = (e) =>{
        e.preventDefault()
        const fieldName = e.target.getAttribute("name")
        const fieldValue = e.target.value
        const newFormData = { ...addFormData }
       
        newFormData[fieldName] = fieldValue
    
        setAddFormData(newFormData)

    }

    const handleAddFormSubmit = (e) =>{
        e.preventDefault()
        
        const newCustomer = {
            id: nanoid(),
            name: addFormData.name,
            surname: addFormData.surname,
            address: addFormData.address,
            age: addFormData.age,
  
        }

        const newCustomers = [...customerArray, newCustomer]

        if(newCustomer.name !== '' && newCustomer.surname !== '' && newCustomer.address !== '' && newCustomer.age !== ''){
            setCustomerArrayHandler(newCustomers)
            setisVisible(false)
            setAddFormData({name: '',
            surname: '',
            address: '',
            age: ''})
            setSelectedRow('')
        }else{
            errorHandler('Inputs can\'t be empty')
        }
    }

    const isVisibleHandler = () => {
        setisVisible(!isVisible)
       }

    // EDIT CUSTOMER FUNCTIONS


   const isVisibleEditHandler = () => {
    setisVisibleEdit(!isVisibleEdit)

    customerArray.map((customer) => {
        if(selectedRow === customer.id){
            editFormData.name = customer.name
            editFormData.surname = customer.surname
            editFormData.address = customer.address
            editFormData.age = customer.age
        }
    })
   }

   const handleEditFormOnChange = (e) =>{
        e.preventDefault()

        const fieldName = e.target.getAttribute('name')
        const fieldValue = e.target.value

        const newFormData = { ...editFormData}
        newFormData[fieldName] = fieldValue

        setEditFormData(newFormData)
  
    }

    const handleEditFormSubmit = (e) =>{
        e.preventDefault()
        
        const editedCustomer = {
            id: selectedRow,
            name: editFormData.name,
            surname: editFormData.surname,
            address: editFormData.address,
            age: editFormData.age,
        }
        
        const newCustomer = [...customerArray]

        const index = customerArray.findIndex((customer) => customer.id === editedCustomer.id)
        
        newCustomer[index] = editedCustomer
    
        if(editedCustomer.name !== '' && editedCustomer.surname !== '' && editedCustomer.address !== '' && editedCustomer.age !== ''){
            setCustomerArrayHandler(newCustomer)
            setisVisibleEdit(false)
            setIsButtonDisabled(true)
            setSelectedRow('')

        }else{
            errorHandler('Inputs can\'t be empty')
        }
    }

     // DELETE CUSTOMER FUNCTIONS


    const handleCustomerDelete= (e) => {
        e.preventDefault()
        
        const holder = []
        invoiceArray.map(invoice => {
            holder.push(invoice.customer.replace(/\s/g, "").toLowerCase())
        })
        const holder2 = customerArray
        const index = holder2.findIndex((customer)=> customer.id === selectedRow)
        const customer = holder2[index]

        const customerName = customer.name + customer.surname
    
        if((!holder.includes(customerName.replace(/\s/g, "").toLowerCase())) && customer.id === selectedRow){
            holder2.splice(index, 1)               
            setCustomerArrayHandler(holder2)
        }  else{
            errorHandler('Can\'t delete a customer that\'s used in Invoice')
        }

        setSelectedRow('')
        setIsButtonDisabled(true)
    }


       // SET CUSTOMER FUNCTIONS

   const setRow = (id)=>{
    setSelectedRow(id)
    setActiveClass('active')
    setIsButtonDisabled(false)
   }

     // CLOSE ADD FORM

     const closeAddForm = (e) => {
        e.preventDefault()
        setisVisible(false)
        setIsButtonDisabled(true)
        setSelectedRow('')
        setAddFormData({name: '',
            surname: '',
            address: '',
            age: ''})
   }

   // CLOSE EDIT FORM

   const closeEditForm = (e) => {
        e.preventDefault()
        setisVisibleEdit(false)
        setIsButtonDisabled(true)
        setSelectedRow('')
    }
   
    // CLOSE OVERLAY

    const closeOverlay = (e) =>{

        e.preventDefault()
        setisVisibleEdit(false)
        setisVisible(false)
        setIsButtonDisabled(true)
        setSelectedRow('')
        setAddFormData({name: '',
        surname: '',
        address: '',
        age: ''})
    }

    return(

       <div className='container'>

            <h1>Customer</h1>

            <div className={errorState ? 'error-container active' : 'error-container'}>
                <p>{errorMessage}</p>
            </div>
            
            <div className={isVisible ? 'active-modal addFormContainer' : 'addFormContainer'}>

            <AddForm onSubmitProp={handleAddFormSubmit}  handleAddFormOnChange={handleAddFormOnChange} addFormData={addFormData} whichPage='customer' closeAddForm={closeAddForm}/>     

            <div className='overlay' onClick={closeOverlay}></div>

        </div>

        <div className={isVisibleEdit ? 'active-modal editFormContainer' : 'editFormContainer'}>

            <EditForm onSubmitProp={handleEditFormSubmit} closeEditForm={closeEditForm} 
             editFormData={editFormData} handleEditFormOnChange={handleEditFormOnChange} whichPage='customer' />

            <div className='overlay' onClick={closeOverlay}></div>

        </div>

        <Operations isVisibleHandler={isVisibleHandler} isButtonDisabled={isButtonDisabled} handleCustomerDelete={handleCustomerDelete} whichPage="customer" isVisibleEditHandler={isVisibleEditHandler}/>

        <Table array={customerArray} selectedRow={selectedRow} setSelectedRow={setSelectedRow} whichPage="customer" setRow={setRow}/>

       </div>
    )
}

export default Customers