import React, { useState,useEffect } from "react";
import { Box, Button, Modal, TextareaAutosize, TextField, Typography, } from "@material-ui/core";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,FormGroup } from '@mui/material'
import { makeStyles } from "@material-ui/core";
import {CircularProgress} from '@mui/material';
import axios from "axios";
import { toast } from 'react-toastify';
import exportToCSV from "../utility/fileDownload";

const DOMAIN = process.env.REACT_APP_DOMAIN;

const {GET_DOCTORS, CREATE_DOCTOR, EDIT_DOCTOR, DELETE_DOCTOR} = require('../../apis/doctor');

const Doctors = () => {
    const classes = Usestyles();

    const [loading , setLoading] = useState(false);
    
    const [doctors, setDoctors] = useState([]);
    const [doctor,setDoctor] = useState(null);

    const [name, setName] = useState("");
    const [address , setAddress] = useState("");
    const [amount,setAmount] = useState("");
    const [email,setEmail] = useState("");
    const [picturePath,setPicturePath] = useState(null);
    const [specialist,setSpecialist] = useState("");
    const [studied,setStudied] = useState("");
    const [number,setNumber] = useState("");
    const [experience,setExperience] = useState("");
    const [patientcount,setPatientcount] = useState("");
    const [off,setOff] = useState("");

    const [editName, setEditName] = useState("");
    const [editEmail,setEditEmail] = useState("");
    const [editPicturePath,setEditPicturePath] = useState("");
    const [editAddress ,setEditAddress] = useState("");
    const [editSpecialist,setEditSpecialist] = useState("");
    const [editAmount,setEditAmount] = useState("");
    const [editStudied,setEditStudied] = useState("");
    const [editExperience,setEditExperience] = useState("");
    const [editNumber,setEditNumber] = useState("");
    const [editPatientcount , setEditPatientcount] = useState("");
    const [editOff,setEditOff] = useState("");

    const [openEdit, setOpenEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const fileName = `Doctors_${Date.now()}`;

    // ALl Data request
    useEffect(() => {
        axios.get(GET_DOCTORS)
            .then(async(res) => {
                setDoctors(res.data);
            })
            .catch((err) => {
                console.log(err);
                toast.warning("Something Error occured")
            });
    }, []);

     //Edit box submit
    const handleEditSubmit = () => {
        const data = {
            name: editName,
            address: editAddress,
            amount: editAmount,
            email: editEmail,
            Specialist: editSpecialist,
            number: editNumber,
            stats: [
                {
                    studied: editStudied,
                    number: editNumber,
                    experience: editExperience,
                    patientcount: editPatientcount,
                    off: editOff,
                }
            ]
        };

        const ID = doctor._id;
        axios
        .put(EDIT_DOCTOR+ID , data)
        .then((res) => {
            toast.success("Successfully edited");
            window.location.href = "/doctors";
        })
        .catch((err) => {
            console.log(err);
            toast.error("Something error occured");
        });
    };

        // Create submit
    const handleCreateSubmit = () => {
            const data = {
                name: name,
                email: email,
                picturePath: picturePath,
                address: address,
                amount: amount,
                Specialist: specialist,
                stats: 
                    {
                        studied: studied,
                        number: number,
                        experience: experience,
                        patientcount: patientcount,
                        off: off,
                    }
                
            };

            axios
                .post(CREATE_DOCTOR ,data ,{
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then((res) => {
                    toast.success("Created Successfully");
                    window.location.href = "/doctors";
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Something error occured");
                });
            setOpenCreate(false);
    };

    // Delete submit function
    const deleteSubmit = () => {
        const ID = doctor._id;

        axios.delete(DELETE_DOCTOR+ID)
        .then((res) => {
            toast.success("Deleted Successfully")
            window.location.href = "/doctors";
        })
        .catch((err) => {
            console.log(err);
            toast.error("Something error occured");
        });
        setOpenDelete(false);
    };

    // Edit Pop Up
    const editbox = (
        <Box className={classes.style} style={{fontFamily: "Varela Round",}}>
        <Typography
            variant="h4"
        >
            Update Doctor Details
        </Typography>
        <FormGroup method="POST">
            <TextField
                label="Name"
                defaultValue={doctor?.name}
                className={classes.inputsStyle}
                onChange={(e) => setEditName(e.target.value)}
            />
            <TextField
                label='Amount'
                placeholder="Amount"
                defaultValue={doctor?.amount}
                className={classes.inputsStyle}
                onChange={(e) => setEditAmount(e.target.value)}
            />
            <TextField
                label="Email"
                defaultValue={doctor?.email}
                className={classes.inputsStyle}
                onChange={(e) => setEditEmail(e.target.value)}
            />
            <TextField
                label="Specialist"
                defaultValue={doctor?.Specialist}
                className={classes.inputsStyle}
                onChange={(e) => setEditSpecialist(e.target.value)}
            />
            <TextField
                label="Studied"
                defaultValue={doctor?.stats[0]?.studied}
                className={classes.inputsStyle}
                onChange={(e) => setEditStudied(e.target.value)}
            />
            <TextField
                label="Number"
                defaultValue={doctor?.stats[0]?.number}
                className={classes.inputsStyle}
                onChange={(e) => setEditNumber(e.target.value)}
            />
            <TextField
                label="Address"
                defaultValue={doctor?.address}
                className={classes.inputsStyle}
                onChange={(e) => setEditAddress(e.target.value)}
            />
            <TextField
                label="Experience"
                defaultValue={doctor?.stats[0]?.experience}
                className={classes.inputsStyle}
                onChange={(e) => setEditExperience(e.target.value)}
            />
            <TextField
                label="Patient Count"
                defaultValue={doctor?.stats[0]?.patientcount}
                className={classes.inputsStyle}
                onChange={(e) => setEditPatientcount(e.target.value)}
            />
            <TextField
                label="Off"
                defaultValue={doctor?.stats[0]?.off}
                className={classes.inputsStyle}
                onChange={(e) => setEditOff(e.target.value)}
            />
            <TextField
                label={editPicturePath ? "Change Picture Link" : "Add Picture Link"}
                defaultValue={doctor?.picturePath}
                className={classes.inputsStyle}
                onChange={(e) => setEditPicturePath(e.target.value)}
            />
            <img src={editPicturePath} width={editPicturePath ? '100px' : '0px'} height={editPicturePath ? '100px' : '0px'} alt="doctor profile" style={{objectFit: 'cover',marginTop: '10px'}}></img>
        </FormGroup>
        <Button
            onClick={handleEditSubmit}
            style={{
            background: "#81fccf",
            fontSize: "18px",
            marginTop: "25px",
            padding: "10px",
            }}
        >
            Update doctor details
        </Button>
        </Box>
    );

    // Create PopUp
    const createBox = (
        <Box  className={classes.style}>
        <Typography variant="h4" style={{fontFamily: "Varela Round",}}>Create Doctor</Typography>
        <FormGroup method="POST">
            <TextField
                label="Name"
                value={name}
                variant="standard"
                className={classes.inputsStyle}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                label="Amount"
                value={amount}
                variant="standard"
                className={classes.inputsStyle}
                onChange={(e) => setAmount(e.target.value)}
            />
            <TextField
                label="Email"
                value={email}
                className={classes.inputsStyle}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Specialist"
                value={specialist}
                className={classes.inputsStyle}
                onChange={(e) => setSpecialist(e.target.value)}
            />
            <TextField
                label="Studied"
                value={studied}
                className={classes.inputsStyle}
                onChange={(e) => setStudied(e.target.value)}
            />
            <TextField
                label="Number"
                value={number}
                className={classes.inputsStyle}
                onChange={(e) => setNumber(e.target.value)}
            />
            <TextField
                label="experience"
                value={experience}
                className={classes.inputsStyle}
                onChange={(e) => setExperience(e.target.value)}
            />
            <TextField
                label="Patientcount"
                value={patientcount}
                className={classes.inputsStyle}
                onChange={(e) => setPatientcount(e.target.value)}
            />
            <TextField
                label="PicturePath"
                value={picturePath}
                className={classes.inputsStyle}
                onChange={(e) => setPicturePath(e.target.value)}
            />
            <TextField
                label="Address"
                value={address}
                className={classes.inputsStyle}
                onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
                label="Off"
                value={off}
                className={classes.inputsStyle}
                onChange={(e) => setOff(e.target.value)}
            />
        </FormGroup>
        <Button
            onClick={handleCreateSubmit}
            style={{
                background: "#81fccf",
                marginTop: "25px",
                fontSize: "17px",
                padding: "10px",
                fontFamily: "Varela Round",
            }}
        >
            Create Doctor
        </Button>
        </Box>
    );

    const deleteBox=(
        <Box className={classes.deletecontainer}>
        <Box className={classes.deletebox}>
            <Typography>Are you sure, you want to delete?</Typography>
            <Box>
            <Button onClick={deleteSubmit} className={classes.btn} style={{"marginRight":'10px'}}>Yes</Button>
            <Button onClick={()=> setOpenDelete(false) } className={classes.btn}>No</Button> 
            </Box>
        </Box>
        </Box>
    );

    return ( 
        <div>
            <Box style={{display: 'flex' , justifyContent: 'space-between' , padding: '15px',}}>
                <Typography variant="h6" style={{fontFamily: "Varela Round",}}>Doctors Details</Typography>
                <Box>
                    <Button
                        onClick={() => setOpenCreate(true)}
                        size="medium"
                        variant="contained"
                        color="primary"
                    >
                        create
                    </Button>
                    <Button
                        onClick={(e) => exportToCSV(doctors, fileName)}
                        style={{marginLeft: '10px'}}
                        size="medium"
                        variant="outlined"
                        color="primary"
                    >
                        Download Data
                    </Button>
                </Box>
            </Box>
            {
                loading ? <CircularProgress style={loader} size={45} /> : 
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={tableHead}>No. </TableCell>
                                <TableCell style={tableHead}>Name</TableCell>
                                <TableCell style={tableHead}>Email</TableCell>
                                <TableCell style={tableHead}>Amount</TableCell>
                                <TableCell style={tableHead} align='right'>Edit</TableCell>
                                <TableCell style={tableHead} align='right'>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {doctors.map((item, index) => {
                                return (
                                    <TableRow key={item._id}>
                                        <TableCell style={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }} >{item.name}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.email}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>₹{item.amount} </TableCell>
                                        <TableCell style={{ textAlign: 'center' }} align='right'>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                style={{ marginRight: "16px", background: "#eb8546" }}
                                                onClick={() => {
                                                    setDoctor(item);
                                                    setOpenEdit(true);
                                                    setEditName(item?.name);
                                                    setEditAddress(item?.address);
                                                    setEditAmount(item?.amount);
                                                    setEditEmail(item?.email);
                                                    setEditSpecialist(item?.Specialist);
                                                    setEditStudied(item?.stats[0]?.studied);
                                                    setEditNumber(item?.stats[0]?.number);
                                                    setEditExperience(item?.stats[0]?.experience);
                                                    setEditPatientcount(item?.stats[0]?.patientcount);
                                                    setEditPicturePath(item?.picturePath);
                                                    setEditOff(item?.stats[0]?.off);
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </TableCell>
                                        <TableCell style={{ textAlign: 'center' }} align='right'>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                style={{ marginRight: "16px", background: "#ed4253" }}
                                                onClick={() => {
                                                    setDoctor(item);
                                                    setOpenDelete(true);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
                {createBox}
            </Modal>
            <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
                {editbox}
            </Modal>
            <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                {deleteBox}
            </Modal>
        </div>
     );
}

const tableHead = {
    backgroundColor: '#c2edda',
    color: '#000',
    textAlign: 'center',
    fontSize: '17px'
}

const loader = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color : '#121212',
}

const Usestyles = makeStyles({
    container: {
      width: "100%",
      height: "100vh",
    },
    inputsStyle: {
      margin: "20px 0px 0px 0px",
      
    },
    style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: '#fff',
        border: "none",
        borderRadius: "3px",
        textAlign: 'center',
        color: "black",
        width: 400,
        p: 4,
        paddingLeft: "3rem",
        paddingRight: "3rem",
        paddingTop: '1rem',
        paddingBottom: '1rem',
        height: 400,
        overflowY:'auto',
        "@media only screen and (max-width: 726px)":{
            width: '90%',
            p: 3,
        }
    },
    deletecontainer:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      //backgroundColor:'yellow'
    },
    deletebox:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'column',
      backgroundColor:'white',
      position: "absolute",
      top: '30%',
      borderRadius:'10px',
      padding:'30px'
    },
    btn:{
      backgroundColor:'#8dffcc',
      marginTop:'10px'
    },
});
 
export default Doctors;