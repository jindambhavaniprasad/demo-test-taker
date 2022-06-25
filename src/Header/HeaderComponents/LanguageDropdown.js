import { MenuItem, Select, FormControl } from '@mui/material'
import { languageOptions } from '../constants/languages'
import { makeStyles } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const LanguageDropdown = ({ onSelectChange, language }) => {

    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <Select
                labelId="demo-customized-select-label"
                placeholder='Filter by category'
                onChange={onSelectChange}
                variant='outlined'
                style={{ width: '220px' }}
                value={language}
                displayEmpty={false}
            >
                {
                    languageOptions.map(l => <MenuItem key={l.id} value={l.id}>{l.value}</MenuItem>)
                }

            </Select>
        </FormControl>
    )
}

export default LanguageDropdown