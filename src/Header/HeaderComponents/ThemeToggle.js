import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ContrastIcon from '@mui/icons-material/Contrast';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ThemeToggle = ({ setTheme, theme }) => {

    const handleAlignment = (event, theme) => {
        setTheme(theme);
    };

    return (
        <ToggleButtonGroup
            value={theme}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            style={{ height: '40px' }}
        >
            <ToggleButton value="light" aria-label="light theme">
                <LightModeIcon />
            </ToggleButton>
            <ToggleButton value="vs-dark" aria-label="dark theme">
                <DarkModeIcon />
            </ToggleButton>
            <ToggleButton value="hc-black" aria-label="high contrast theme">
                <ContrastIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

export default ThemeToggle