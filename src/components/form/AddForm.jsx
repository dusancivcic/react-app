import './Form.css'

const AddForm = ({ onSubmitProp, whichPage, handleAddFormOnChange,closeAddForm,addFormData, sellerArray, customerArray}) => {
    return ( 
        <form className='add-invoice-form'  onSubmit={onSubmitProp}>
            <button type='button' className='close-button' onClick={closeAddForm} false>X</button>

            {
                whichPage === 'invoice' && 
                <>
                    <label htmlFor="seller">Seller</label>
                <select name='seller' onChange={handleAddFormOnChange} value={addFormData.seller}>
                    <option selected disabled value="">Select an option...</option>
                    {
                        sellerArray.map((seller, id) => ( 
                            (seller.isActive === 'active') ? <option id={id}>{seller.companyName}</option> : null
                        ))
                    }
                </select>
                <label htmlFor="customer">Customer</label>
                <select name="customer" onChange={handleAddFormOnChange}  value={addFormData.customer}>
                <option selected disabled value="">Select an option...</option>
                    {
                        customerArray.map((customer, id) => ( 
                            <option id={id}>{customer.name} {customer.surname}</option> 
                        ))
                    }
                </select>
                <label htmlFor="date">Date</label>
                <input id="date" name="date" type="date" onChange={handleAddFormOnChange}  value={addFormData.date} />
                <label htmlFor="amount">Amount</label>
                <input id="amount" name="amount" type="number" onChange={handleAddFormOnChange}  value={addFormData.amount} />
                <input type="submit" />
                </>
            }

            {
                whichPage === 'seller' && 
                <>
                    <label htmlFor="companyName">Company</label>
                    <input id="companyName" name="companyName" type="text" onChange={handleAddFormOnChange} value={addFormData.companyName}/>
                    <label htmlFor="address">Address</label>
                    <input id="address" name="address" type="text" onChange={handleAddFormOnChange}  value={addFormData.address}/>
                    <label htmlFor="isActive">Active</label>
                    <select name="isActive" id="" onChange={handleAddFormOnChange} value={addFormData.isActive} >
                        <option selected disabled value="">Select an option...</option>
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
                    <input id="name" name="name" type="text" onChange={handleAddFormOnChange} value={addFormData.name}/>
                    <label htmlFor="surname">Surname</label>
                    <input id="surname" name="surname" type="text" onChange={handleAddFormOnChange} value={addFormData.surname}/>
                    <label htmlFor="address">Address</label>
                    <input id="address" name="address" type="text" onChange={handleAddFormOnChange} value={addFormData.address}/>
                    <label htmlFor="age">Age</label>
                    <input id="age" name="age" type="number" onChange={handleAddFormOnChange} value={addFormData.age}/>
                    <input type="submit" />
                </>
            }
                        
        </form>
     )
}
 
export default AddForm