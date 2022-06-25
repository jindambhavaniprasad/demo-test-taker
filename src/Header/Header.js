import React from 'react'
import { Paper, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import VideoDialog from './HeaderComponents/VideoDialog'
import FontChange from './HeaderComponents/FontChange'
import ThemeToggle from './HeaderComponents/ThemeToggle'
import { languages } from '../util/judge0'
// import { languages } from '../question'

const Header = ({ fontSize, setFontSize, theme, setTheme, fullScreen, handleFullScreen, language, setLanguage, videoOn, isVideoOn }) => {

    const handleLanguageChange = (e) => {
        setLanguage(languages.find(x => x.language === e.target.value))
    }

    return (
        <Paper style={{ display: 'flex', gap: '15px', padding: '20px', margin: '10px', alignItems: 'center', justifyContent: 'flex-end', boxShadow: '0px 0px 7px 0px rgb(0 0 0 / 20%)' }}>
            <div style={{ height: '40px', color: 'black !Important', width: '150px' }}>
                <Paper style={{ border: '1px solid rgb(253 181 27 / 19%)', boxShadow: '0px 0px 5px 0px rgb(0 0 0 / 20%)' }}>
                    <FormControl fullWidth>
                        <InputLabel style={{ backgroundColor: '#fafafa' }} id="select-label">Language</InputLabel>
                        <Select
                            labelId="select-label"
                            id="select"
                            value={language.language}
                            label="Language"
                            onChange={handleLanguageChange}
                            style={{ height: '40px' }}
                        >
                            {
                                languages.map(l => <MenuItem key={l.id} value={l.language}>{l.language}</MenuItem>)
                            }

                        </Select>
                    </FormControl>
                </Paper>
            </div>
            <div style={{ height: '40px', color: 'black !Important' }}>
                <Paper>
                    <Button style={{ color: '#fdb51b', fontWeight: 900 }} onClick={handleFullScreen} >{!fullScreen ? `Exit Full Screen` : `Full Screen`}</Button>
                </Paper>
            </div>
            <div style={{ height: '40px', color: 'black !Important' }}>
                <VideoDialog
                    videoOn={videoOn}
                    isVideoOn={isVideoOn}
                />
            </div>
            <div style={{ height: '30px', color: 'black !Important' }}>
                <FontChange fontSize={fontSize} setFontSize={setFontSize} />
            </div>
            <div style={{ height: '40px', color: 'black !Important' }}>
                <ThemeToggle setTheme={setTheme} theme={theme} />
            </div>
            <div style={{ height: '40px', color: 'black !Important' }}>
                <Button style={{ fontWeight: 900, color: '#fdb51b', border: '1px solid #fdb51b' }} onClick={(e) => window.location.reload()}>Submit</Button>
            </div>
        </Paper>
    )
}
export default Header