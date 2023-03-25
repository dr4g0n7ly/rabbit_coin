import './styles.css'
const RequestLogin = () => {
    return (
        <div className="Request-login">
            <p className='req-login-h1'>Awaiting metamask wallet connection</p>
            <div className='lds-pos'>
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    )
}

export default RequestLogin