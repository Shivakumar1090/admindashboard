import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom'

const Navbar = () => {
    const classes = Usestyles();
    return ( 
        <div>
            <Box className = {classes.container}>
                <Box>
                  <Typography style={{fontFamily: 'Varela Round' ,}} variant="h5" >
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                      Medikas Admin Panel
                    </Link>
                  </Typography>
                </Box>
                <Box style={{display: 'flex'}}>
                  <Typography style={links}>
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                          Home
                      </Link>
                  </Typography>
                  <Typography  style={links}>
                    <Link to="/doctors" style={{ textDecoration: "none", color: "inherit" }}>
                        Doctors
                    </Link>
                  </Typography>
                  <Typography style={links}>
                    <Link to="/orders" style={{ textDecoration: "none", color: "inherit" }}>
                        Orders
                    </Link>
                  </Typography>
                </Box>
            </Box>
        </div>
     );
}

const Usestyles = makeStyles({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#68d388",
      color: "#121212",
      padding: "15px",
    },
});

const links = {
  fontSize: '17px',
  fontFamily: 'Varela Round',
  paddingRight: '20px',
}
export default Navbar;