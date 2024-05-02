Module.register("MMM-eBarber", {
    defaults: {},

    start: function() {
        this.result = null;
    },

    // getStyles: function() {
    //     return ["bar.css"]; // Optional: include if you have custom styles
    // },

    notificationReceived: function(notification, payload, sender) {
        if (notification === "NEW_IMAGE_AVAILABLE") {
            this.sendSocketNotification("SEND_IMAGE_TO_API", payload);
        }
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "API_RESULT_RECEIVED") {
            console.log(payload);
            this.result = JSON.parse(payload);
            this.updateDom();
        }
    },

    getDom: function() {
        var wrapper = document.createElement("div");

        console.log("test => " + this.result)
        
        if (this.result) {
            var resultText = document.createElement("p");
            resultText.textContent = "API Result: " + this.result.data; // Assuming 'data' is part of the response
            wrapper.appendChild(resultText);
        } else {
            wrapper.textContent = "Waiting for API result...";
        }

        return wrapper;
    }
});
