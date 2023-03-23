import * as IPFS from 'ipfs-core';
import { create } from 'ipfs-http-client';
import { useState } from "react"

const tokenKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFEQjA0NkVhMGY5YTA1ZmUxOTYwN2JjOTI3ODFjNDBhNkRmNURhOGIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3OTYwMzM0ODE3MSwibmFtZSI6IkJpYmxpbyJ9.HLD1ltmDUn-QvaSDo0juE4BBD6Iayt9lKE2Z6vqbNgs"

const Upload = () => {

    const [ file, setFile ] = useState(null)
    const [ fileName, setFileName ] = useState(null)

    const fileToBase64 = (file, cb) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          cb(null, reader.result)
        }
        reader.onerror = function (error) {
          cb(error, null)
        }
    }

    const onUploadFileChange = ({ target }) => {
        if (target.files < 1 || !target.validity.valid) {
            return
        }
        fileToBase64(target.files[0], (err, result) => {
            if (result) {
                setFile(result)
                console.log("file: ", file)
                setFileName(target.files[0])
            }
        })
    }

    const ipfsClient = async () => {
        const ipfs = await create(
            {
                host:'https://gateway.pinata.cloud/ipfs/',
                port:5001,
                protocol:"https"
            }
        )
        return ipfs
    }

    async function saveText() {
        let ipfs = await ipfsClient()
        let result = await ipfs.add("hello")
        console.log("saveText result: ", result)
    }

    var fs  = require('fs');
    var temp = fs.readFileSync('./templates/test.html', 'utf8');
    console.log(temp);


    return (
        <div className="App">
            <br/>
            <br/>
            <br/>

            <div className="upload-area">
                { fileName && <p className="filename">{fileName.name}</p> }
                <input type="file" name="filetobase64" onChange={onUploadFileChange} accept="application/pdf" />
            </div>
            <br/>
            <button onClick={saveText}>Upload File to IPFS</button>
            <br/>
            {file ? <textarea id="base64File" rows="30" cols="150" value={file} readOnly></textarea> : null }
        </div>
    )
}

export default Upload