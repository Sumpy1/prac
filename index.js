var express = require("express");
const app = express();
var mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB. Replace the connection string with your actual MongoDB URI.
mongoose.connect('mongodb+srv://gpokharel02:gpokharel02@chatappp.qkoibo4.mongodb.net/your-database-name', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;

db.on('error', (error) => {
    console.error("Error in connecting to database:", error);
});
db.once('open', () => {
    console.log("Connected to database");
});

app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message; // Corrected the variable name

    var data = {
        "name": name,
        "email": email,
        "message": message
    }

    var collectionName = "data"; // Replace with your actual collection name

    // Use the 'db' object created by Mongoose to access collections.
    db.collection(collectionName).insertOne(data, (err, collection) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).send("Error inserting data");
        }
        console.log("Message sent successfully");
        return res.redirect('index.html');
    });
});

app.get("/", (req, res) => {
    res.set({ "Allow-access-Allow-Origin": '*' });
    return res.redirect('index.html');
});

const port = 3000;
app.listen(port, () => {
    console.log("Listening on port " + port);
});
