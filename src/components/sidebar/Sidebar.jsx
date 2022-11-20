import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import InoviceIcon from '../../Images/invoice.png'
import SellerIcon from '../../Images/seller.png'
import CustomerIcon from '../../Images/customer.png'
import './Sidebar.css'

const Sidebar = () =>{

  
  const activeStyle = 'active'

    return(
        <nav className='sidebar'>
        <NavLink to="/invoices"   className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>

          <div>
            <img src={InoviceIcon}></img>
            <p>Invoices</p>
          </div>
        </NavLink>
        <NavLink to="/sellers"   className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
        <div>
            <img src={SellerIcon}></img>
            <p>Sellers</p>
          </div>
        </NavLink>
        <NavLink to="/customers"   className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
        <div>
            <img src={CustomerIcon}></img>
            <p>Customers</p>
          </div>
        </NavLink>
      </nav>
    )
}

export default Sidebar