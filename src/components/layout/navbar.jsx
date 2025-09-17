// import React from "react";
// import { ArrowDropDown } from "@mui/icons-material";
// import { Avatar, Box, IconButton, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom"; // import the hook
// import profileImage from "../../assets/images/profileImage.jpg";

// function Navbar() {
//   const navigate = useNavigate(); // initialize navigate

//   const handleProfileClick = () => {
//     navigate("/admin/profile"); // Set your profile route
//   };

//   return (
//     <Box
//       sx={{
//         minWidth: "100vw",
//         paddingY: "8px",
//         paddingX: "18px",
//         boxSizing: "border-box",
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         background: "#CED4F2",
//         boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
//         position: "sticky",
//         top: 0,
//         zIndex: 10,
//       }}
//     >
//       <Typography color="#001580" fontWeight={700} fontSize={"28px"}>
//         LineMan Logo
//       </Typography>

//       {/* Make the profile section clickable */}
//       <Box
//         onClick={handleProfileClick}
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "center",
//           gap: "5px",
//           cursor: "pointer", // shows pointer cursor on hover
//         }}
//       >
//         <Avatar src={profileImage} alt="profile">
//           GS
//         </Avatar>
//         <IconButton size="small" sx={{ p: 0 }}>
//           <ArrowDropDown />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// }

// export default Navbar;
import React from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import profileImage from "../../assets/images/profileImage.jpg";

function Navbar() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/admin/profile");
  };

  return (
    <Box
      sx={{
        minWidth: "100vw",
        paddingY: "8px",
        paddingX: "18px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#CED4F2",
        boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Typography color="#001580" fontWeight={700} fontSize={"28px"}>
        LineMan Logo
      </Typography>

      {/* Avatar (not clickable) + Dropdown Arrow (clickable) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Avatar src={profileImage} alt="profile">
          GS
        </Avatar>
        <IconButton size="small" sx={{ p: 0 }} onClick={handleProfileClick}>
          <ArrowDropDown />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Navbar;
