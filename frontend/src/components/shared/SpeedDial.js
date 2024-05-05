import * as React from "react";
import { styled } from "@mui/material/styles";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { Box } from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";

const actions = [
    { icon: <AddCircleIcon />, name: "Add Report" },
    { icon: <DownloadForOfflineIcon />, name: "Get Report" },
];

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    // position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
}));

export default function HomeSpeedDial() {
    return (
        <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
            <StyledSpeedDial
                ariaLabel="SpeedDial basic example"
                //   sx={{ position: 'absolute', bottom: 16, right: 16 }}
                sx={{ position: "absolute", bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                //   direction={'up'}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}
            </StyledSpeedDial>
        </Box>
    );
}
