import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = { 
    apiKey: "AIzaSyBmZC9gaj68vd-tWHqgf9H0pYZBvVHhnPE", 
    authDomain: "remoteworkingacess.firebaseapp.com", 
    projectId: "remoteworkingacess" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
    if (req.method === 'GET' || req.method === 'POST') {
        // Pesapal sends OrderTrackingId and MerchantReference
        const { OrderTrackingId, OrderMerchantReference } = req.query;

        if (OrderTrackingId) {
            try {
                // Here we assume OrderMerchantReference is the user's email
                // This is passed when you initiate the payment
                const userEmail = OrderMerchantReference; 
                
                const userRef = doc(db, "users", userEmail);
                await updateDoc(userRef, { isPremium: true });

                return res.status(200).json({ status: "OK", message: "User Upgraded" });
            } catch (e) {
                return res.status(500).json({ error: e.message });
            }
        }
    }
    res.status(400).send('Invalid Request');
}
