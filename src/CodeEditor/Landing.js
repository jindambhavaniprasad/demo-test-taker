import React, { useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import _ from 'lodash'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { Button, Paper } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Progress from "../util/progress";
import TestCases from "./TestCases";
import screenfull from 'screenfull';
import { Container } from "@mui/system";
import Header from "../Header/Header";
import { postOptions, languages, getOptions } from "../util/judge0";


const javascriptDefault = `// some comment`;

const Landing = ({ question, initialCode, testCase }) => {

    const [code, setCode] = useState(initialCode || javascriptDefault);
    const [processing, setProcessing] = useState(null);
    const [theme, setTheme] = useState("light");
    const [language, setLanguage] = useState(languages[2]);
    const [testCases, setTestCases] = useState(testCase)
    const [fontSize, setFontSize] = useState(14)
    const [videoOn, isVideoOn] = useState(false)
    const [fullScreen, isFullScreen] = useState(true)
    // const [customInput, setCustomInput] = useState('')


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
                const request = postOptions({ language_id: language.id, source_code: btoa(writtenCode) })
                const response = await axios.request(request)
                const result = { data: { output: await checkStatus(response?.data?.token) } }
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
                    updatedTestCases = updatedTestCases.map(t => (tc.testCaseId === t.testCaseId) ? { ...t, passed: true, actualOutput: output } : t)
                    showSuccessToast(`${tc.hidden ? 'Hidden' : ''} Testcase ${tc.hidden ? '' : tc.testCaseId} passed`)
                } else {
                    updatedTestCases = updatedTestCases.map(t => (tc.testCaseId === t.testCaseId) ? { ...t, passed: false, actualOutput: output } : t)
                    showErrorToast(`Testcase ${tc.testCaseId} failed`)
                }
            } catch (ex) {
                updatedTestCases = updatedTestCases.map(t => (tc.testCaseId === t.testCaseId) ? { ...t, passed: undefined } : t)
                showErrorToast()
            }
        }
        setTestCases(updatedTestCases)
        setProcessing(false)
    };


    const checkStatus = async (token) => {
        const request = getOptions(token)
        const result = await axios.request(request)
        const output = atob(result.data.stdout)
        return output
    }

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
            <Container style={{ margin: 0, padding: 0, maxWidth: '100%' }} onMouseLeave={(e) =>/*alert(`Please don't leave the screen`)*/console.log('left')}>
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
                <Header
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    theme={theme}
                    setTheme={setTheme}
                    fullScreen={fullScreen}
                    handleFullScreen={handleFullScreen}
                    language={language}
                    setLanguage={setLanguage}
                    videoOn={videoOn}
                    isVideoOn={isVideoOn}
                />
                <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                        <Paper style={{ width: '50%', padding: '0 30px', margin: '10px', border: '1px solid #cacaca' }}>
                            <div dangerouslySetInnerHTML={{ __html: question }}></div>
                        </Paper>
                        <Paper style={{ width: '50%', padding: '0 30px', margin: '10px', border: '1px solid #cacaca' }}>
                            <CodeEditorWindow
                                code={code}
                                onChange={onChange}
                                language={language.monacoL}
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
                            <TestCases testCases={testCases} setTestCases={setTestCases} />
                        </Paper>
                    </div>
                </div>
            </Container>
        </>
    );
};
export default Landing;