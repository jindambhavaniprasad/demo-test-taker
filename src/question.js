export const question1 = {
    question: `<div style="display: flex; flex-direction: column; align-items: flex-start; padding-left: 30px;"><p style="font-weight: bold; font-size: 18px;">Write a JavaScript program which retuns an array to find which 1st January is being a Sunday between two years.</p><ol style="text-align: left;"><li>Initial year will be a lesser one and end year will be a bigger one</li><li>You are required to use ES6 or Vannila Javascript only</li></ol><p style="font-weight: bold; font-size: 18px;">Examples :</p><p style="margin-bottom: 0px;">Input:  <strong>2011, 2022</strong></p><p>Output:  <strong>[2012, 2017]</strong></p><p style="margin-bottom: 0px;">Input:  <strong>2000, 2050</strong></p><p>Output:  <strong> [2006, 2012, 2017, 2023, 2034, 2040, 2045]</strong></p></div>`,
    initialCode: "function isSunday(startYear, endYear){\n\t\n}",
    testCases: [
        {
            testCaseId: 1,
            input1: 2014,
            input2: 2050,
            output: [2017, 2023, 2045, 2040, 2034],
            inputCode: `console.log(isSunday(2014,2050))`
        },
        {
            testCaseId: 2,
            input1: 2011,
            input2: 2022,
            output: [2012, 2017],
            inputCode: `console.log(isSunday(2011,2022))`
        }
    ]
}

export const question2 = {
    question: `<div style="display: flex; flex-direction: column; align-items: flex-start; padding-left: 30px;"><p style="font-weight: bold; font-size: 18px;">Write a JavaScript program reverse a given string.</p><ol style="text-align: left;"><li>Input may or maynot be a string always</li><li>You are required to use ES6 or Vannila Javascript only</li></ol><p style="font-weight: bold; font-size: 18px;">Examples :</p><p style="margin-bottom: 0px;">Input:  <strong>Hello world!</strong></p><p>Output:  <strong>!dlrow olleH</strong></p><p style="margin-bottom: 0px;">Input:  <strong>Namasthe India</strong></p><p>Output:  <strong> aidnI ehtsamaN</strong></p></div>`,
    initialCode: "function reverseString(string){\n\t\n}",
    testCases: [
        {
            testCaseId: 1,
            input1: 'Armadillo',
            output: 'ollidamrA',
            inputCode: `console.log(reverseString('Armadillo'))`
        },
        {
            testCaseId: 2,
            input1: 'Photosynthesis',
            output: 'sisehtnysotohP',
            inputCode: `console.log(reverseString('Photosynthesis'))`
        }
    ]
}

export const question3 = {
    question: `<div style="display: flex; flex-direction: column; align-items: flex-start; padding-left: 30px;"><p style="font-weight: bold; font-size: 18px;">Write a JavaScript function to find the lowest value in an array.</p><ol style="text-align: left;"><li>Input may or maynot be an array always</li><li>You are required to use ES6 or Vannila Javascript only</li></ol><p style="font-weight: bold; font-size: 18px;">Examples :</p><p style="margin-bottom: 0px;">Input:  <strong>[1,2,3,4,5]</strong></p><p>Output:  <strong>1</strong></p><p style="margin-bottom: 0px;">Input:  <strong>[-1,-2,-3,-4,-5]</strong></p><p>Output:  <strong> -5</strong></p></div>`,
    initialCode: "function lowestNumber(intArr){\n\t\n}",
    testCases: [
        {
            testCaseId: 1,
            input1: [1, -12, 3, 6, 88, 100],
            output: -12,
            inputCode: `console.log(lowestNumber([1,-12,3,6,88,100]))`
        },
        {
            testCaseId: 2,
            input1: [12, 34, 56, 1],
            output: 1,
            inputCode: `console.log(lowestNumber([12,34,56,1]))`
        },
        {
            testCaseId: 3,
            input1: [12, 34, 56, 1],
            output: 1,
            inputCode: `console.log(lowestNumber([12,34,56,1]))`
        }
    ]
}