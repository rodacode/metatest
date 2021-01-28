import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

// This function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';


const Home = () => {

    const [isButtonActive, setIsButtonActive] = useState(false);
    const [user, setUser] = useState()

    let currentAccount = null;

    function handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== currentAccount) {
            currentAccount = accounts[0];
            // Do any other work!
            console.log('Current Account', currentAccount)
        }
    }

    const connect = (provider) => {
        provider
            .request({ method: 'eth_requestAccounts' })
            .then(handleAccountsChanged)
            .catch((err) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });


    }
    const fetchMeta = async () => {
        const provider = await detectEthereumProvider();
        if (provider) {
            // From now on, this should always be true:
            // provider === window.ethereum
            console.log(provider); // initialize your app
            connect(provider);
            setIsButtonActive(false)
        } else {
            console.log('Please install MetaMask!');
        }
    }

    const handleConnect = () => {
        setIsButtonActive(true)
        fetchMeta()
    }

    return (
        <div className="home__container">
            <h1>Gio Crypto Consulting</h1>
            <img src="https://pbs.twimg.com/profile_images/1196495334626582531/B-7umJNL_400x400.jpg" alt="meta logo" />
            <div className="home__button__container">
                <Button onClick={handleConnect} disabled={isButtonActive} variant="contained" color="primary">
                    Connect to Metamask
            </Button>
            </div>
            {user && <p>user : {user}</p>}
        </div>
    )
}

export default Home;