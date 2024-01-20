import React from 'react';
import AndroidIcon from '@mui/icons-material/ArrowCircleRight';
import './index.css'

const Header = () => {
  return (
    <header className="k-flex k-jcsb k-aic k-pl16 k-pr16">
      <div className="logo k-flex k-jcsb k-aic">
        <AndroidIcon /> <span>OTM</span>
      </div>
    </header>
  )
}

export default Header