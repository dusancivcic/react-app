import { Link } from 'react-router-dom'
import './Operations.css'

const Operations = ({isVisibleHandler,invoiceKey,isButtonDisabled,handleInvoiceDelete, handleSellerDelete,handleCustomerDelete, whichPage, isVisibleEditHandler}) =>{
    return(
        <div className='operations'>
        <div className='add'>
            <button onClick={isVisibleHandler}></button>
        </div>

        {
            whichPage==='invoice' &&
            <>
            <div className='edit'>
            <Link to={`${invoiceKey}`}>
                <button  disabled={isButtonDisabled}></button>
            </Link>
            </div>
            <div className='delete'>
            <button onClick={handleInvoiceDelete} disabled={isButtonDisabled}></button>
            </div>
            </>
        }
        {
            whichPage==='seller' &&
            <>
            <div className='edit'>
                <button onClick={isVisibleEditHandler} disabled={isButtonDisabled}></button>
            </div>
            <div className='delete'>
            <button onClick={handleSellerDelete} disabled={isButtonDisabled}></button>
            </div>
            </>
        }
        {
            whichPage==='customer' &&
            <>
            <div className='edit'>
                <button onClick={isVisibleEditHandler} disabled={isButtonDisabled}></button>
            </div>
            <div className='delete'>
            <button onClick={handleCustomerDelete} disabled={isButtonDisabled}></button>
            </div>
            </>
        }


        </div>
    )
}

export default Operations