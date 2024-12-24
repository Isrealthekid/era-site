const { initializeApp, cert } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');
require('dotenv').config({ path: '.env.local' }); // This will load your .env.local file

const firebaseConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getDatabase();

// Function to fetch and display data
async function viewSubmissions() {
  try {
    const contactRef = db.ref('contactSubmissions');
    const modalRef = db.ref('modalSubmissions');

    const contactSnapshot = await contactRef.once('value');
    const modalSnapshot = await modalRef.once('value');

    console.log('Contact Form Submissions:');
    console.log(JSON.stringify(contactSnapshot.val(), null, 2));

    console.log('\nModal Form Submissions:');
    console.log(JSON.stringify(modalSnapshot.val(), null, 2));
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    process.exit();
  }
}

viewSubmissions();

