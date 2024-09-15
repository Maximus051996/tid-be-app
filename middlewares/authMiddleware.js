const { secret_key, sms_accessToken } = require('../config');
const jwt = require('jsonwebtoken');
const axios = require('axios');

function authenticateToken() {
    return function (req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        jwt.verify(token, secret_key, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token expired , login again' });
            }
            req.user = user;

            // // Check if user has any of the required roles
            // if (!requiredRoles.includes(user.roleId)) {
            //     return res.status(403).json({ message: 'Forbidden. Access denied for role.' });
            // }

            next();
        });
    };
}

async function sendMessage(recipientPhone, userName, userPassword) {
    // Your Fast2SMS API key
    const apiKey = sms_accessToken;

    // SMS API endpoint
    const url = 'https://www.fast2sms.com/dev/bulkV2';
    const siteUrl = 'https://tid-app-fe.vercel.app/register-login';

    // Payload for the SMS
    const payload = new URLSearchParams({
        message: `Congratulations! 🎉

You have successfully registered on our site. Your credentials are:

Username: ${userName}
Password: ${userPassword}
Welcome to the TID Family! 🌟 We are thrilled to have you on board. Explore our platform and make the most out of the exciting features we offer.

Get Started: Visit us at ${siteUrl} to dive in!

If you have any questions or need assistance, feel free to reach out to our support team.

Once again, welcome, and we hope you enjoy your journey with us!

Best Regards,
The TID Team`, // Message
        language: 'english',
        route: 'q',
        numbers: recipientPhone // Receiver phone number
    });

    // Headers for authentication
    const headers = {
        'authorization': apiKey,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache'
    };

    // Send the SMS
    axios.post(url, payload.toString(), { headers: headers })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });
}

module.exports = { sendMessage, authenticateToken };