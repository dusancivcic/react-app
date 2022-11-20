import './Invoices.css'
import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import AddForm from '../../components/form/AddForm'
import EditForm from '../../components/form/EditForm'
import Operations from '../../components/operations/Operations'
import Table from '../../components/table/Table'

const Invoice = ({sellerArray,customerArray, invoiceArray, setInvoiceArrayHandler, mainID}) =>{


   //ERROR MESSAGE 

   const [errorMessage, setErrorMessage] = useState('')
   const [errorState, setErrorState] = useState(false)

    // IS A ROW SELECTED

    useEffect(() => {
        if(mainID !== null){
                invoiceArray.map((invoiceSingle, id) =>{
                    if(mainID === id){
                            return(
                                setRow(invoiceSingle.id),
                                isVisibleEditHandler(invoiceSingle)
                            )
                        }
                },)
        }
    }, [mainID])

    // IS BUTTON DISABLED

    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    // EDIT AND ADD FORM DATA

    const [editFormData, setEditFormData] = useState({
         seller: '',
        customer: '',
        date: '',
        amount: ''
    })

    
    const [addFormData, setAddFormData] = useState({
        seller: '',
        customer: '',
        date: '',
        amount: ''
    })

    const navigate = useNavigate()

    //THIS IS ERROR HANDLER

    const errorHandler = (message) =>{
        setErrorMessage(message)
        setErrorState(true)

        const timeFunc = () => {
            setErrorState(false)
        }

        setTimeout(timeFunc, 3000)
    }

    // INVOICE KEY

    const [invoiceKey,setInvoiceKey] = useState()

    // SELECTED ROW ID AND ACTIVE CLASS

    const [selectedRow, setSelectedRow] = useState()
    const [activeClass, setActiveClass] = useState()

    // VISIBILITY VARIABLES

    const [isVisible, setisVisible] = useState(false)
    const [isVisibleEdit, setisVisibleEdit] = useState(false)


    // ADD INVOICE FUNCTIONS

    const handleAddFormOnChange = (e) =>{
        e.preventDefault()
        const fieldName = e.target.getAttribute('name')
        const fieldValue = e.target.value
        const newFormData = { ...addFormData}
        newFormData[fieldName] = fieldValue

        setAddFormData(newFormData)
    }

    const handleAddFormSubmit = (e) =>{
        e.preventDefault()
        const newInvoice = {
            id: nanoid(),
            seller: addFormData.seller,
            customer: addFormData.customer,
            date: addFormData.date,
            amount: addFormData.amount,
        }

        const newInvoices = [...invoiceArray, newInvoice]
        
        const today = new Date()
        const selectedDate = new Date(newInvoice.date)

        if(parseInt(newInvoice.amount) <= 0){
            errorHandler('Amount can\'t be less than zero')
        }
        else if(newInvoice.seller !== '' && newInvoice.customer !== '' && newInvoice.date !== '' && newInvoice.amount !== '' && selectedDate.getTime() <= today.getTime() ){
            setInvoiceArrayHandler(newInvoices)
             setisVisible(false)
             setSelectedRow('')
            setAddFormData({seller: '',
            customer: '',
            date: '',
            amount: '',
        })
        }else if(selectedDate.getTime() > today.getTime() ){
            errorHandler('Date can\'t be above the current date')
        }
        else{
            errorHandler('Inputs can\'t be empty')
        }
    }

    // DELETE INVOICE FUNCTION

    const handleInvoiceDelete = (e) => {
        e.preventDefault()
        setInvoiceArrayHandler(invoiceArray.filter(invoice => invoice.id !== selectedRow))
        setIsButtonDisabled(true)
    }

    // SET INVOICE SELECTED FUNCTION

   const setRow = (id,key) =>{
    setSelectedRow(id)
    setActiveClass('active')
    setIsButtonDisabled(false)
    setInvoiceKey(key + 1)
   }

   // VISIBILITY HANDLER

   const isVisibleHandler = () => {
    setisVisible(!isVisible)
    
   }

   // EDIT INVOICE FUNCTIONS

   const isVisibleEditHandler = (invoiceSingle) => {
    setisVisibleEdit(!isVisibleEdit)
            editFormData.seller = invoiceSingle.seller
            editFormData.customer = invoiceSingle.customer
            editFormData.date = invoiceSingle.date
            editFormData.amount = invoiceSingle.amount         
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

        let date = new Date(editFormData.date).toISOString().substr(0, 10)
    
        const editedInvoice = {
            id: selectedRow,
            seller: editFormData.seller,
            customer: editFormData.customer,
            date: date,
            amount: editFormData.amount,
        }
        
        const newInvoice = [...invoiceArray]

        const today = new Date()
        const selectedDate = new Date(editedInvoice.date)

        const index = invoiceArray.findIndex((invoice)=> invoice.id === editedInvoice.id)
        
        newInvoice[index] = editedInvoice  
               
        
        if(editedInvoice.seller !== '' && editedInvoice.customer !== '' && editedInvoice.date !== '' && editedInvoice.amount !== '' && selectedDate.getTime() <= today.getTime() ){
            setInvoiceArrayHandler(newInvoice)
            setisVisibleEdit(false)
            setIsButtonDisabled(true)
            setSelectedRow('')
            navigate("/")
        }else if(selectedDate.getTime() > today.getTime() ){
            errorHandler('Date can\'t be above the current date')
        }
        else{
            errorHandler('Inputs can\'t be empty')
        }
    }

    // CLOSE ADD FORM

   const closeAddForm = (e) => {
    e.preventDefault()
    setisVisible(false)
    setIsButtonDisabled(true)
    setSelectedRow('')
    setAddFormData({seller: '',
    customer: '',
    date: '',
    amount: '',
    })
    }


   // CLOSE EDIT FORM

   const closeEditForm = (e) => {
    e.preventDefault()
    setisVisibleEdit(false)
    setIsButtonDisabled(true)
    setSelectedRow('')
    navigate("/")
    }

       // CLOSE OVERLAY

       const closeOverlay = (e) =>{

        e.preventDefault()
        setisVisibleEdit(false)
        setisVisible(false)
        setIsButtonDisabled(true)
        setSelectedRow('')
        setAddFormData({seller: '',
        customer: '',
        date: '',
        amount: '',
        })
    }

    return(

       <div className='container'>

        <h1>Invoices</h1>
        
        <div className={errorState ? 'error-container active' : 'error-container'}>
            <p>{errorMessage}</p>
        </div>

        <div className={isVisible ? 'active-modal addFormContainer' : 'addFormContainer'}>

            <AddForm onSubmitProp={handleAddFormSubmit}  handleAddFormOnChange={handleAddFormOnChange} addFormData={addFormData} whichPage='invoice' closeAddForm={closeAddForm} sellerArray={sellerArray} customerArray={customerArray}/>

            <div className='overlay' onClick={closeOverlay}></div>

        </div>
      
        <div className={isVisibleEdit ? 'active-modal editFormContainer' : 'editFormContainer'}>

            <EditForm onSubmitProp={handleEditFormSubmit} closeEditForm={closeEditForm} 
             editFormData={editFormData} handleEditFormOnChange={handleEditFormOnChange} whichPage='invoice' sellerArray={sellerArray} customerArray={customerArray}/>

            <div className='overlay' onClick={closeOverlay}></div>

        </div>

        <Operations isVisibleHandler={isVisibleHandler} isButtonDisabled={isButtonDisabled} handleInvoiceDelete={handleInvoiceDelete} invoiceKey={invoiceKey} whichPage="invoice"/>

        <Table array={invoiceArray} selectedRow={selectedRow} setSelectedRow={setSelectedRow} whichPage="invoice" setRow={setRow}/>
            
       </div>

    )
}

export default Invoice