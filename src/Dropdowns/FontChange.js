import { Button, Paper, Tooltip, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const FontChange = ({ fontSize, setFontSize }) => {

    const changeFont = (size) => {
        setFontSize(size)
    }

    return (
        <>
            {/* <Typography style={{ position: 'absolute', top: '22px', right: '212px' }}>Fontsize</Typography> */}
            <Paper style={{ display: 'flex', alignItems: 'center', height: '30px', marginTop: '2px' }}>
                <Tooltip title={`Decrease font size`}><Button style={{ color: '#fdb51b' }} disabled={(fontSize <= 10)} onClick={(e) => changeFont(fontSize - 2)}><RemoveIcon /></Button></Tooltip>
                <Typography>{fontSize}</Typography>
                <Tooltip title={`Increase font size`}><Button style={{ color: '#fdb51b' }} disabled={(fontSize >= 20)} onClick={(e) => changeFont(fontSize + 2)}><AddIcon /></Button></Tooltip>
            </Paper>
        </>
    )
}
export default FontChange