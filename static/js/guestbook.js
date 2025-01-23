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
        console.log('open github login');
        // TODO: Loading animation

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

                // TODO: Add timestamp
                userData = {
                    id: uid,
                    name: displayName,
                    email: email,
                }

                let providerId = null;
                if(providerData && providerData.length > 0) {
                    providerId = providerData[0].providerId;

                    userData['provider'] = providerId;
                }

                const signForm = document.getElementById('sign-form');
                signForm.style.display = 'block';

                const signButtonContainer = document.getElementById('sign-buttons-container');
                signButtonContainer.style.display = 'none';
            }

            console.log(user);
        } catch(err) {
            console.log('Something went wrong!!', err);
            // TODO: Handle error with a toast
        } finally {
            // TODO: Stop loading animation
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

    try {
        // TODO: Loading animation
        const signatureRef = await addDoc(guestSignatureCollection, payload);

        // TODO: Automatically add to the message list
    } catch(err) {
        console.log(err);
        // TODO: Handle error with a toast
    } finally {
        // TODO: Stop loading animation
    }
}

async function getSignatures() {
    const db = getFirestore(app);
    const guestSignatureCollection = collection(db, "guestSignatures");

    try {
        // TODO: Loading animation
        // TODO: Sort by time ascending
        const snapshot = await getDocs(query(guestSignatureCollection));
    
        const messagesElement = document.querySelector('.guestbook-messages');
    
        snapshot.forEach(doc => {
            const signature = doc.data();
    
            console.log(signature);
            
            const guestMessage = document.createElement('div');
            guestMessage.classList.add('guest-message');
    
            const nameElement = document.createElement('a');
            nameElement.innerHTML = `${signature.name}:`;
    
            const message = document.createElement('p');
            
            if(signature.message) {
                message.innerText = signature.message;
            } else {
                message.innerText = 'Signing your Guestbook!';
            }
    
            guestMessage.appendChild(nameElement);
            guestMessage.appendChild(message);
    
            messagesElement.appendChild(guestMessage);
        });
    } catch(err) {
        // TODO: Handle error with a toast
    } finally {
        // TODO: Stop loading animation
    }
}

document.addEventListener('DOMContentLoaded', main);