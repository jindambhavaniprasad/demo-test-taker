import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import { languageOptions } from "../constants/languages";
import _ from 'lodash'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { Button, Paper, Tooltip } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Progress from "../util/progress";
import TestCases from "./TestCases";
import ThemeToggle from "../Dropdowns/ThemeToggle";
import FontChange from "../Dropdowns/FontChange";
import screenfull from 'screenfull';
import VideoDialog from "../Dropdowns/VideoDialog";
import { Container } from "@mui/system";


const javascriptDefault = `// some comment`;

const Landing = ({ question, initialCode, testCase }) => {

    const [code, setCode] = useState(initialCode || javascriptDefault);
    const [processing, setProcessing] = useState(null);
    const [theme, setTheme] = useState("light");
    // const [language, setLanguage] = useState(languageOptions[0]);
    const [testCases, setTestCases] = useState(testCase)
    const [fontSize, setFontSize] = useState(14)
    const [videoOn, isVideoOn] = useState(false)
    const [fullScreen, isFullScreen] = useState(true)
    // const [customInput, setCustomInput] = useState('')


    // const onSelectChange = (sl) => {
    //     console.log("selected Option...", sl.target.value);
    //     setLanguage(languageOptions.find(x => x.id === sl.target.value));
    // };


    const onChange = (action, data) => {
        switch (action) {
            case "code": {
                setCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };
    const handleCompile = async () => {
        setProcessing(true);
        let updatedTestCases = testCases
        for await (let tc of testCase) {
            let writtenCode = `${code}  \n\n ${tc.inputCode}`
            try {
                const request = {
                    clientId: process.env.REACT_APP_JDOODLE_API_CLIENT_ID,
                    clientSecret: process.env.REACT_APP_JDOODLE_API_CLIENT_KEY,
                    script: writtenCode,
                    language: 'nodejs',
                    versionIndex: '4'
                }
                const result = await axios.post(process.env.REACT_APP_JDOODLE_API_URL, request)
                // eslint-disable-next-line
                // const result = { data: { output: eval(request.script) } }
                let output = ''
                try {
                    output = JSON.parse(result.data?.output) || undefined
                } catch (ex) {
                    output = _.isString(result.data?.output) ? result.data?.output?.trim() : result.data?.output
                }
                if (_.isArray(output) && _.isArray(tc.output)) {
                    output = _.sortBy(output)
                    tc.output = _.sortBy(tc.output)
                }
                if (_.isEqual(output, tc.output)) {
                    updatedTestCases = updatedTestCases.map(t => (tc.testCaseId === t.testCaseId) ? { ...t, passed: true } : t)
                    setProcessing(false);
                    showSuccessToast(`Testcase ${tc.testCaseId} passed`)
                } else {
                    updatedTestCases = updatedTestCases.map(t => (tc.testCaseId === t.testCaseId) ? { ...t, passed: false } : t)
                    setProcessing(false);
                    showErrorToast(`Testcase ${tc.testCaseId} failed`)
                }
            } catch (ex) {
                updatedTestCases = updatedTestCases.map(t => (tc.testCaseId === t.testCaseId) ? { ...t, passed: undefined } : t)
                setProcessing(false);
                showErrorToast()
            }
        }
        setTestCases(updatedTestCases)
    };

    const showSuccessToast = (msg) => {
        toast.success(msg || `Compiled Successfully!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const showErrorToast = (msg) => {
        toast.error(msg || `Something went wrong! Please try again.`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleFullScreen = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle()
            isFullScreen(screenfull.isFullscreen)
        }
    }

    return (
        <>
            <Container style={{ margin: 0, padding: 0, maxWidth: '100%' }} onMouseLeave={(e)=>/*alert(`Please don't leave the screen`)*/console.log('left')}>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Paper style={{ display: 'flex', gap: '15px', padding: '20px', margin: '10px', alignItems: 'center', justifyContent: 'flex-end', boxShadow: '0px 0px 7px 0px rgb(0 0 0 / 20%)' }}>
                    <div style={{ height: '40px', color: 'black !Important' }}>
                        {/* <LanguagesDropdown onSelectChange={onSelectChange} language={language?.value} /> */}
                    </div>
                    <div style={{ height: '40px', color: 'black !Important' }}>
                        <Paper>
                            <Button style={{ color: '#fdb51b', fontWeight: 900 }} onClick={handleFullScreen} >{!fullScreen ? `Exit Full Screen` : `Full Screen`}</Button>
                        </Paper>
                    </div>
                    <div style={{ height: '40px', color: 'black !Important' }}>
                        <VideoDialog />
                    </div>
                    <div style={{ height: '30px', color: 'black !Important' }}>
                        <FontChange fontSize={fontSize} setFontSize={setFontSize} />
                    </div>
                    <div style={{ height: '40px', color: 'black !Important' }}>
                        <ThemeToggle setTheme={setTheme} theme={theme} />
                    </div>
                </Paper>
                <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                        <Paper style={{ width: '50%', padding: '0 30px', margin: '10px', border: '1px solid #cacaca' }}>
                            <div dangerouslySetInnerHTML={{ __html: question }}></div>
                            {/* <Typography style={{ fontSize: '1.2rem' }}>{question}</Typography> */}
                        </Paper>
                        <Paper style={{ width: '50%', padding: '0 30px', margin: '10px', border: '1px solid #cacaca' }}>
                            <CodeEditorWindow
                                code={code}
                                onChange={onChange}
                                language={languageOptions[0]?.value}
                                theme={theme}
                                fontSize={fontSize}
                            />
                            <div style={{ paddingBottom: '20px' }}>
                                <div style={{ width: '100%', display: 'flex', backgroundColor: `${theme === 'vs-dark' ? '#1e1e1e' : theme === 'hc-black' ? '#000' : '#fff'}`, justifyContent: 'flex-end' }}>
                                    {/* <TextField
                                    value={customInput}
                                    onChange={(e) => setCustomInput(e.target.value)}
                                    style={{ color: '#fafafa', backgroundColor: 'rgb(255 255 255)', width: '70%', border:'none' }}
                                    placeholder='Your Input Here'
                                    disabled={!code}
                                    variant='outlined'
                                /> */}
                                    <Button
                                        onClick={handleCompile}
                                        disabled={!code}
                                        variant='contained'
                                        style={{ width: '30%', backgroundColor: '#259a3a', color: '#fafafa', border: 'none', height: '50px' }}
                                    >
                                        {processing ? <Progress /> : <><PlayArrowIcon /> Run</>}
                                    </Button>
                                </div>
                            </div>
                            <TestCases testCases={testCases} />
                        </Paper>
                    </div>
                </div>
            </Container>
        </>
    );
};
export default Landing;