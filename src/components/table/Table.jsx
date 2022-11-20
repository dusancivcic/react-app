import React, { useState } from 'react'
import './Table.css'
import Pagination from "react-custom-pagination"

const Table = ({array,selectedRow,whichPage,setRow}) =>{

   
      // sets current page

      const [currentPage, setCurrentPage] = useState(1)
      const [postsPerPage] = useState(3)
    
      // get current Posts
    
   

      if(whichPage==='invoice'){
        

        array.map((singleArray,id)=>{
            array[id] = {
                id : singleArray.id,
                customId : id,
                seller : singleArray.seller,
                customer : singleArray.customer,
                date: singleArray.date,
                amount: singleArray.amount
            }
        })
        }
     
    
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;

    
      const currentPosts = array.slice(indexOfFirstPost, indexOfLastPost)
    
        
  
      // when user clicks on number this function will execute
    
      const paginate = (number) => {
        setCurrentPage(number);
      };



    return(

               <>
                <div className="table">
                {
                    whichPage === 'invoice' &&
                    <>
                     <div className='heading' >
                        <p>Seller</p>
                        <p>Customer</p>
                        <p>Date</p>
                        <p>Amount</p>
                    </div>

                    {
                    currentPosts.map((singleRow, id) =>{
                        return(
                        <div className={(selectedRow === singleRow.id) ? 'active' : ''} id={id} key={id} onClick={() => setRow(singleRow.id,singleRow.customId)}>
                                <p>{singleRow.seller}</p>
                                <p>{singleRow.customer}</p>
                                <p>{singleRow.date}</p>
                                <p>{singleRow.amount} $</p>
                        </div>
                        )
                    })
                    }
                    </>
                }
                {
                    whichPage === 'seller' &&
                    <>
                    <div className='heading' >
                        <p>Company</p>
                        <p>Address</p>
                        <p>Active</p>
                    </div>

                    {
                     currentPosts.map((singleRow, id) =>{
                        return(
                        <div className={(selectedRow === singleRow.id) ? 'active' : ''}  id={id} key={id} onClick={() => setRow(singleRow.id,id)}>
                                <p>{singleRow.companyName}</p>
                                <p>{singleRow.address}</p>
                                <p>{singleRow.isActive}</p>
                        </div>
                        )
                    })
                    }
                    </>
                }
                {
                    whichPage === 'customer' &&
                    <>
                    <div className='heading' >
                        <p>Name</p>
                        <p>Surname</p>
                        <p>Address</p>
                        <p>Age</p>
                    </div>

                    {
                     currentPosts.map((singleRow, id) =>{
                        return(
                        <div className={(selectedRow === singleRow.id) ? 'active' : ''}  id={id} key={id} onClick={() => setRow(singleRow.id,id)}>
                                <p>{singleRow.name}</p>
                                <p>{singleRow.surname}</p>
                                <p>{singleRow.address}</p>
                                <p>{singleRow.age}</p>
                        </div>
                        )
                    })
                    }
                    </>
                }
                  
            </div>
            <div className="pagination">
            <Pagination
                totalPosts={array.length}
                postsPerPage={postsPerPage}
                paginate={paginate}
                view={3}
                showLast={true}
                showFirst={true}
                selectColor='rgba(155, 155, 155,0.2)'
                indexbgColor='#272c4a'
                bgColor="#272c4a"
                color="#999"
            />
            </div>
               </>
    )
}

export default Table;