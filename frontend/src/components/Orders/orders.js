import { Box, Button, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import {CircularProgress} from '@mui/material';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import exportToCSV from '../utility/fileDownload';

const {GET_ORDERS} = require('../../apis/order');

const Orders = () => {
    const [orders,setOrders] = useState([]);
    const [loading,setLoading] = useState(false);
    
    const fileName = `Orders_${Date.now()}`;

    useEffect(() => {
        setLoading(true);
        axios.get(GET_ORDERS)
            .then((d) => {
                setOrders(d.data);
                setLoading(false);
            })
            .catch(err=> {
                console.log(err);
                setLoading(false);
            })
    },[])

    const columns= [
        {
          field: 'userName',
          headerName: 'User name',
          width: 250,
          cellClassName: 'column',
            headerClassName: 'column-header',
        },
        {
          field: 'doctorName',
          headerName: 'Doctor name',
          width: 250,
          cellClassName: 'column',
          headerClassName: 'column-header',
        },
        {
          field: 'amount',
          headerName: 'Amount',
          width: 200,
          cellClassName: 'column',
          headerClassName: 'column-header',
        },
        {
          field: 'date',
          headerName: 'Date',
          width: 200,
          cellClassName: 'column',
          headerClassName: 'column-header',
        },
      ];

    return ( 
        <div style={{overflow: 'hidden'}}>
            <Box className="orders-container"  overflow='hidden'>
                <Box style={{display: 'flex' , justifyContent: 'space-between' , padding: '10px'}}>
                    <Typography variant="h6">Order's Details</Typography>
                    <Box>
                        <Button
                            onClick={(e) => exportToCSV(orders, fileName)}
                            // style={{marginLeft: '10px'}}
                            style={{backgroundColor: '#161748',marginLeft: '10px'}}
                            size="medium"
                            variant="contained"
                            color="primary"
                        >
                            Download Data
                        </Button>
                    </Box>
                </Box>
                {
                    loading ? <CircularProgress style={loader} size={45} /> : 
                    <Box
                        sx={{
                            height: "80vh",
                            width: '100%',
                            overflow: 'hidden',
                            '& .column': {
                                fontSize: '16px',
                                justifyCOntent: 'center',
                                textAlign: 'center',
                                alignItems: 'center',
                            },
                            '& .column-header': {
                                color: 'purple',
                                fontSize: '20px',
                            },
                        }}
                    >
                        <DataGrid
                            rows={orders}
                            className='table-box'
                            getRowId= {(row) => row._id}
                            columns={columns}
                            disableSelectionOnClick
                            experimentalFeatures={{ newEditingApi: true }}
                        />
                    </Box>
                }
            </Box>
        </div>
     );
}

const loader = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color : '#121212',
  }
 


export default Orders;