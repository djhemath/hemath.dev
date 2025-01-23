import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js';
import { getAuth, GithubAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'
import { getFirestore, collection, addDoc, query, getDocs } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyCg_ITJGJDXLlS2rIdeOq1g-Zptd2nKIwI",
    authDomain: "djhemath-site.firebaseapp.com",
    projectId: "djhemath-site",
    storageBucket: "djhemath-site.firebasestorage.app",
    messagingSenderId: "167148679184",
    appId: "1:167148679184:web:3c774b706abd2a069b9a95",
    measurementId: "G-4FXNDZF568"
};

const app = initializeApp(firebaseConfig);

let userData = null;

function main() {
    const githubButton = document.getElementById('github-btn');
    const signForm = document.getElementById('sign-form');

    getSignatures();


    githubButton.addEventListener('click', async () => {
        githubButton.setAttribute('data-loading', 'true');

        const auth = getAuth();

        const provider = new GithubAuthProvider();

        provider.setCustomParameters({
            'allow_signup': 'false'
        });

        try {
            const result = await signInWithPopup(auth, provider);

            const user = result.user;

            if(user) {
                const { uid, displayName, email, photoURL, providerData } = user;

                userData = {
                    id: uid,
                    name: displayName,
                    email: email,
                    timestamp: Date.now(),
                }

                let providerId = null;
                if(providerData && providerData.length > 0) {
                    providerId = providerData[0].providerId;

                    userData['provider'] = providerId;
                }

                const signForm = document.getElementById('sign-form');
                signForm.style.display = 'flex';

                const signButtonContainer = document.getElementById('sign-buttons-container');
                signButtonContainer.style.display = 'none';
            }

            console.log(user);
        } catch(err) {
            console.log('Something went wrong!!', err);
            // TODO: Handle error with a toast
        } finally {
            githubButton.setAttribute('data-loading', 'false');
        }
        
    });

    signForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const message = document.getElementById('message');

        let payload = {
            ...userData,
        };

        if(message && message.value) {
            payload['message'] = message.value;
        }

        signGuestbook(payload);
    });
}

async function signGuestbook(payload) {
    const db = getFirestore(app);
    const guestSignatureCollection = collection(db, "guestSignatures");

    const signButton = document.getElementById('sign-btn');
    signButton.setAttribute('data-loading', 'true');

    try {
        await addDoc(guestSignatureCollection, payload);

        const guestMessagesContainer = document.querySelector('.guestbook-messages')
        

        const guestMessage = createMessageElement(payload.name, payload.message);
        guestMessagesContainer.prepend(guestMessage);
        guestMessage.classList.add('highlight');

        const signForm = document.getElementById('sign-form');
        signForm.style.display = 'none';

        // TODO: Save some sort of token to track whether the user signed previously or not
        // TODO: Also make this check in the firebase functions

    } catch(err) {
        console.log(err);
        // TODO: Handle error with a toast
    } finally {
        signButton.setAttribute('data-loading', 'false');
    }
}

async function getSignatures() {
    const db = getFirestore(app);
    const guestSignatureCollection = collection(db, "guestSignatures");

    const messagesElement = document.querySelector('.guestbook-messages');

    messagesElement.setAttribute('data-loading', 'true');

    try {
        // TODO: Sort by time ascending
        const snapshot = await getDocs(query(guestSignatureCollection));
    
        snapshot.forEach(doc => {
            const signature = doc.data();
            const guestMessage = createMessageElement(signature.name, signature.message);
    
            console.log(signature);
    
            messagesElement.appendChild(guestMessage);
        });
    } catch(err) {
        // TODO: Handle error with a toast
    } finally {
        document.getElementById('signature-heading').style.marginBottom = '36px'
        messagesElement.setAttribute('data-loading', 'false');
    }
}

function createMessageElement(name = '', message = '') {
    const guestMessage = document.createElement('div');
    guestMessage.classList.add('guest-message');

    const nameElement = document.createElement('a');

    if(name) {
        nameElement.innerHTML = `${name}:`;
    } else {
        nameElement.innerHTML = `Anonymous:`;
    }

    const messageElement = document.createElement('p');
    
    if(message) {
        messageElement.innerText = message;
    } else {
        messageElement.innerText = 'Signing your Guestbook!';
    }

    guestMessage.appendChild(nameElement);
    guestMessage.appendChild(messageElement);

    return guestMessage;
}

document.addEventListener('DOMContentLoaded', main);