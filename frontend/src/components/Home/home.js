import React from 'react'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => {
    return ( 
        <div>
            <Box marginTop='20px'>
                <Link to="/doctors" style={{"textDecoration":'none'}}>
                    <Button size='medium' style={{color: '#161748',border: '1px solid #161748'}}>Doctors</Button>
                </Link>
                <Link to="/orders" style={{"textDecoration": "none"}}>
                    <Button size='medium' style={{marginLeft: '15px',color: '#161748',border: '1px solid #161748'}}>Orders</Button>
                </Link>
            </Box>
        </div>
     );
}


 
export default Home;