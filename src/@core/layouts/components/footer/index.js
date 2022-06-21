// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-left d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        <a href='#' target='_blank' rel='noopener noreferrer'>
        <span style={{fontSize:'25px'}}> DRG </span>  <span style={{fontSize:'15px'}}> Invest </span>
        </a>
        <span className='d-none d-sm-inline-block'>, All rights Reserved</span>
      </span>
      {/* <span className='float-md-right d-none d-md-block'>
        Hand-crafted & Made with
        <Heart size={14} />
      </span> */}
    </p>
  )
}

export default Footer
