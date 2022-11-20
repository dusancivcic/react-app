import './Sellers.css'
import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import AddForm from '../../components/form/AddForm'
import EditForm from '../../components/form/EditForm'
import Operations from '../../components/operations/Operations'
import Table from '../../components/table/Table'

const Sellers = ({sellerArray, setSellerArrayHandler, invoiceArray}) =>{
     
    const [addFormData, setAddFormData] = useState({
        companyName: '',
        address: '',
        isActive: ''
    })

    const [selectedRow, setSelectedRow] = useState('')

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


    // VARIABLES FOR EDITING SELLERS

    const [editFormData, setEditFormData] = useState({
        companyName: '',
        address: '',
        isActive: ''
    })


    // IS A ROW SELECTED

    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    // ADD SELLER FUNCTIONS

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
        
        const newSeller = {
            id: nanoid(),
            companyName: addFormData.companyName,
            address: addFormData.address,
            isActive: addFormData.isActive,
  
        }
        console.log(newSeller)
        const newSellers = [...sellerArray, newSeller]

        if(newSeller.companyName !== '' && newSeller.address !== '' && newSeller.isActive !== ''){
            setSellerArrayHandler(newSellers)
            setisVisible(false)
            setAddFormData({companyName: '',
            address: '',
            isActive: ''})
            setSelectedRow('')
        }else{
            errorHandler('Inputs can\'t be empty')
        }
    }

    const isVisibleHandler = () => {
        setisVisible(!isVisible)
       }

    // EDIT SELLER FUNCTIONS


    const isVisibleEditHandler = () => {
        setisVisibleEdit(!isVisibleEdit)

        sellerArray.map((seller) => {
            if(selectedRow === seller.id){
                editFormData.companyName = seller.companyName
                editFormData.address = seller.address
                editFormData.isActive = seller.isActive
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
        
        const editedSeller = {
            id: selectedRow,
            companyName: editFormData.companyName,
            address: editFormData.address,
            isActive: editFormData.isActive,
        }
        
        const newSeller = [...sellerArray]

        const index = sellerArray.findIndex((seller)=> seller.id === editedSeller.id)
        
        newSeller[index] = editedSeller  

        if(editedSeller.companyName !== '' && editedSeller.address !== ''){
            setSellerArrayHandler(newSeller)
            setisVisibleEdit(false)
            setIsButtonDisabled(true)
            setSelectedRow('')

        }else{
            errorHandler('Inputs can\'t be empty')
        }
    }

     // DELETE SELLER FUNCTIONS

    const handleSellerDelete = (e) => {
        e.preventDefault()

        const holder = []
        invoiceArray.map(invoice => {
            holder.push(invoice.seller)
        })
        const holder2 = sellerArray
        const index = holder2.findIndex((seller)=> seller.id === selectedRow)
        const seller = holder2[index]

        if((!holder.includes(seller.companyName)) && seller.id === selectedRow){
            holder2.splice(index, 1)               
            setSellerArrayHandler(holder2)
        }  else{
            errorHandler('Can\'t delete a seller that\'s used in Invoice')
        }

        setSelectedRow('')
        setIsButtonDisabled(true)
    }


       // SET SELLER FUNCTIONS

    const setRow = (id) =>{
        setSelectedRow(id)
        setIsButtonDisabled(false)
    }

    // CLOSE ADD FORM

    const closeAddForm = (e) => {
            e.preventDefault()
            setisVisible(false)
            setIsButtonDisabled(true)
            setSelectedRow('')
            setAddFormData({companyName: '',
            address: '',
            isActive: ''})
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
        setAddFormData({companyName: '',
        address: '',
        isActive: ''})
    }

    return(

       <div className='container'>

        <h1>Sellers</h1>

        <div className={errorState ? 'error-container active' : 'error-container'}>
            <p>{errorMessage}</p>
        </div>
        
        <div className={isVisible ? 'active-modal addFormContainer' : 'addFormContainer'}>
       
            <AddForm onSubmitProp={handleAddFormSubmit}  handleAddFormOnChange={handleAddFormOnChange} addFormData={addFormData} whichPage='seller' closeAddForm={closeAddForm}/>
          
            <div className='overlay' onClick={closeOverlay}></div>
            
        </div>

        <div className={isVisibleEdit ? 'active-modal editFormContainer' : 'editFormContainer'}>

            <EditForm onSubmitProp={handleEditFormSubmit} closeEditForm={closeEditForm} 
             editFormData={editFormData} handleEditFormOnChange={handleEditFormOnChange} whichPage='seller' />

            <div className='overlay' onClick={closeOverlay}></div>

        </div>

        <Operations isVisibleHandler={isVisibleHandler} isButtonDisabled={isButtonDisabled} handleSellerDelete={handleSellerDelete} whichPage="seller" isVisibleEditHandler={isVisibleEditHandler}/>

        <Table array={sellerArray} selectedRow={selectedRow} setSelectedRow={setSelectedRow} whichPage="seller" setRow={setRow}/>

       </div>
    )
}

export default Sellers