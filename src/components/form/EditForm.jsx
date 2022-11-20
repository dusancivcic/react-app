


const EditForm = ({whichPage,onSubmitProp,closeEditForm,handleEditFormOnChange,editFormData,customerArray,sellerArray}) =>{


    return(
        <form className='edit-invoice-form'  onSubmit={onSubmitProp}>
             <button type='button' className='close-button' onClick={closeEditForm} false>X</button>
            
            {
                whichPage === 'invoice' &&
                <>
                <label htmlFor="seller">Seller</label>
                <select name='seller' onChange={handleEditFormOnChange} value={editFormData.seller}>
                    <option selected disabled>Select an option...</option>
                    {
                        sellerArray.map((seller, id) => ( 
                            (seller.isActive === 'active') ? <option id={id}>{seller.companyName}</option> : null
                        ))
                    }
                </select>
                <label htmlFor="customer">Customer</label>
                <select name="customer" onChange={handleEditFormOnChange} value={editFormData.customer}>
                <option selected disabled>Select an option...</option>
                    {
                        customerArray.map((customer, id) => ( 
                            <option id={id}>{customer.name} {customer.surname}</option> 
                        ))
                    }
                </select>
                <label htmlFor="date">Date</label>
                <input id="date" name="date" type="date" onChange={handleEditFormOnChange} value={editFormData.date} />
                <label htmlFor="amount">Amount</label>
                <input id="amount" name="amount" type="number" onChange={handleEditFormOnChange} value={editFormData.amount} />
                <input type="submit" />
                </>
            }

            {
                whichPage === 'seller' &&
                <>
                <label htmlFor="companyName">Company</label>
                <input id="companyName" name="companyName" type="text" onChange={handleEditFormOnChange} value={editFormData.companyName} />
                <label htmlFor="address">Address</label>
                <input id="address" name="address" type="text" onChange={handleEditFormOnChange} value={editFormData.address} />
                <label htmlFor="isActive">Active</label>
                <select name="isActive" id="" onChange={handleEditFormOnChange} value={editFormData.isActive}>
                    <option selected disabled>Select an option...</option>
                    <option>active</option>
                    <option>not active</option>
                </select>
                <input type="submit" />
                </>
            }   

            {
                whichPage === 'customer' &&
                <>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" onChange={handleEditFormOnChange} value={editFormData.name} />
                <label htmlFor="surname">Surname</label>
                <input id="surname" name="surname" type="text" onChange={handleEditFormOnChange} value={editFormData.surname} />
                <label htmlFor="address">Address</label>
                <input id="address" name="address" type="text" onChange={handleEditFormOnChange} value={editFormData.address} />
                <label htmlFor="age">Age</label>
                <input id="age" name="age" type="number" onChange={handleEditFormOnChange} value={editFormData.age} />
                <input type="submit" />
                </>
            }
                
         
        </form>
    )
}

export default EditForm