const express = require("express");
const next = require("next");
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { fstat } = require("fs");

const deleteZips = require("./deleteZips");
const scrap = require("./scrape-instagram");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
	.prepare()
	.then(() => {
		const server = express();
		deleteZips.deleteExtra();

		const publicDir = path.join(__dirname, "../public");

		// server.use(express.urlencoded({ extended: true }));
		// server.use(express.static(publicDir));
		server.use(express.json());

		server.post("/", (req, res) => {
			console.log(req.body);
			var username = req.body.username;
			if (!fs.existsSync("./zipFiles/" + username + ".zip")) {
				console.log("Getting Posts");
				scrap
					.setup(username)
					.then(() => {
						console.log("Done");
						// res.redirect("/" + username + ".zip");
            return res.json({
              success: true,
              username,
            });
						//scrap.end(scrap.browser)
					})
					.catch((err) => {
						console.log(err);
						res.redirect("/");
						//scrap.end(scrap.browser)
					});
			} else {
				console.log("File already exists");
				//res.redirect('/')
				// res.redirect("/" + username + ".zip");
        return res.json({
          success: true,
          username,
        });
			}
		});

		server.get("/:username" + ".zip", (req, res) => {
      if (fs.existsSync("./zipFiles/" + req.params.username + ".zip")) {
				res.download(
					"./zipFiles/" + req.params.username + ".zip",
					req.params.username + ".zip",
					(err) => {
						if (err) {
							console.error(err);
						}
						deleteZips.deleteExtra();
					}
				);
				console.log("File ready to download");
			} else {
				console.log("File Does not exist");
				res.redirect("/");
			}
			//res.redirect('/')
    });

    server.get("*", (req, res) => {
			return handle(req, res);
		});
    
    server.listen(PORT, () => {
			console.log("Server is up on port", PORT);
		});
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});

//harcoded

// scrap.setup('badminton_iiitdmjabalpur').then(()=>{
//     console.log('Done')
//     //scrap.end(scrap.browser)
// }).catch((err)=>{
//   console.log("ERROR IN HARDCODED-", err);
//     //scrap.end(scrap.browser)
// })
