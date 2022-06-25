import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Button, Container, Divider, Typography } from '@mui/material';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between'
}));

export default function TestCases({ testCases, setTestCases }) {

    const handleShow = (id) => {
        const tc = testCases.map(mtc => {
            if (mtc.testCaseId === id) {
                return { ...mtc, display: !(mtc.display) }
            } else {
                return mtc
            }
        })
        setTestCases(tc)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stack spacing={1} style={{ paddingBottom: '20px' }}>
                {
                    testCases?.map(testCase => {
                        return (
                            <Item key={testCase.testCaseId} style={{ display: 'flex', flexDirection: 'column', backgroundColor: testCase.passed === true ? '#7dd77d' : testCase.passed === false ? 'rgb(255 159 139)' : '#fff', transition: 'all 2s' }}>
                                <div style={{ transition: 'all 2s', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {testCase.hidden ? '' : <Button onClick={(e) => handleShow(testCase.testCaseId)}>{testCase.display ? <ArrowDropDownSharpIcon /> : <ArrowRightIcon />}</Button>}
                                        <Typography style={{ paddingLeft: '30px', fontWeight: 900 }}>{`${testCase.hidden ? 'Hidden' : ''} TestCase ${testCase.hidden ? '' : testCase.testCaseId}`}</Typography>
                                    </div>
                                    {
                                        testCase.passed === undefined ?
                                            <></> : testCase.passed === true ?
                                            <CheckCircleSharpIcon style={{ paddingRight: '30px', color: 'green' }} /> : testCase.passed === false ? <CancelIcon style={{ paddingRight: '30px', color: '#b02323'  }} /> : <></>

                                    }
                                </div>
                                {
                                    testCase.display ? <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '10px 10px 10px 70px', transition: 'all 2s', backgroundColor: '#868b903d', borderRadius: '10px' }}>
                                        <Typography fontWeight={900} fontSize={12}>Input : {testCase.displayInput}</Typography>
                                        <Typography fontWeight={900} fontSize={12}>Expected Output : {testCase.displayOutput}</Typography>
                                        <Typography fontWeight={900} fontSize={12}>Actual Output: {testCase.actualOutput?.toString()}</Typography>
                                    </Container>
                                        : <></>
                                }

                            </Item>
                        )
                    })
                }
            </Stack>
            <Divider style={{ paddingBottom: '10px' }} />
        </Box>
    );
}