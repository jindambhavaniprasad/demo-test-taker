import { useState } from 'react'
import Editor from '@monaco-editor/react'

const CodeEditorWindow = ({ onChange, language, code, theme, fontSize }) => {

    const [value, setValue] = useState(code || '')

    const handleEditorChange = (value) => {
        setValue(value)
        onChange("code", value)
    }

    return (
        <div className='overlay rounded-md overflow-hidden w-full h-full shadow-4xl'>
            <Editor
                height="70vh"
                width="100%"
                options={
                    fontSize = {fontSize}
                }
            language={language || 'javascript'}
            value={value}
            theme={theme}
            defaultValue={`// Insert your code here`}
            onChange={handleEditorChange}
            />
        </div>
    )

}
export default CodeEditorWindow