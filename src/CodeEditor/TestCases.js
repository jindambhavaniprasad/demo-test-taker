import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Divider, Typography } from '@mui/material';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between'
}));

export default function TestCases({ testCases }) {
    return (
        <Box sx={{ width: '100%' }}>
            <Stack spacing={1} style={{ paddingBottom: '20px' }}>
                {
                    testCases?.map(testCase => {
                        return (
                            <Item key={testCase.testCaseId} style={{ backgroundColor: testCase.passed === true ? '#7dd77d' : testCase.passed === false ? 'rgb(255 159 139)' : '#fff' }}>
                                {/* <ArrowRightIcon /> */}
                                <Typography style={{ paddingLeft: '30px', fontWeight: 900 }}>{`TestCase ${testCase.testCaseId}`}</Typography>
                                {
                                    testCase.passed === undefined ?
                                        <></> :
                                        <CheckCircleSharpIcon style={{ paddingRight: '30px', color: testCase.passed === true ? 'green' : testCase.passed === false ? '#b02323' : 'rgba(0, 0, 0, 0.6)' }} />

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