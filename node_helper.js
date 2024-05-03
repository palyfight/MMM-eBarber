// node_helper.js in module 'bar'
const NodeHelper = require("node_helper");
const request = require("request"); // You might need to install the 'request' package or use another HTTP client like 'axios'

module.exports = NodeHelper.create({
    start: function() {
        console.log("bar helper started...");
    },

    // Function to make a POST request to the API
    sendImageToAPI: function(imagePath) {
        const apiUrl = "http://192.168.86.56:8000/api/analyze"; // Change to your actual API URL
        request.post({
            headers: {'content-type' : 'application/json'},
            url: apiUrl,
            body: JSON.stringify({imagePath: imagePath})
        }, (error, response, body) => {
            console.log(error)
            console.log(response)
            console.log(body)
            if (!error && response.statusCode == 200) {
                this.sendSocketNotification("API_RESULT_RECEIVED", body);
            } else {
                console.log("Error in API request: ", error);
            }
        });
    },

    // Handle socket notifications
    socketNotificationReceived: function(notification, payload) {
        if (notification === "SEND_IMAGE_TO_API") {
            console.log("TWO")
            console.log(payload)
            this.sendImageToAPI(payload);
        }
    }
});
