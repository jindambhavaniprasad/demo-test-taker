import { Select, MenuItem } from '@mui/material'
import monacoThemes from 'monaco-themes/themes/themelist.json'

const ThemesDropdown = ({ handleThemeChange, theme }) => {
    return (
        <div class="question p-40 ng-star-inserted" style="flex: 1 1 50%; box-sizing: border-box; max-width: 50%;">
            <div theme="snow" class="mb-32 disable-text-selection">
                <div class="ql-container ql-snow ngx-quill-view-html">
                    <div class="ql-editor">
                        <p>Given an array of integers, keep a total score based on the following:</p>
                        <ol>
                            <li>Add 1 point for every even number in the array</li>
                            <li>Add 3 points for every odd number in the array, except for the number "5"</li>
                            <li>Add 5 points every time the number "5" appears in the array</li>
                            </ol><p><br /></p><p>Note that 0 is considered even.</p>
                            <p><br /></p><p><strong>Examples</strong>:</p><p>
                                <br /></p><p>Input: <code><strong>[1,2,3,4,5]</strong>
                                </code></p><p>Output: <code><strong>13</strong></code>
                                </p><p><br /></p><p>Input: <code><strong>[17,19,21]</strong>
                                </code></p><p>Output: <code><strong>9</strong></code>
                                </p><p><br /></p><p>Input: <code><strong>[5,5,5]</strong>
                                </code></p><p>Output: <code><strong>15</strong>
                                </code></p></div></div></div>
        </div>
    )
}

export default ThemesDropdown