import { Navbar } from "../components/Navbar.js";
import Head from "next/head";
import download from "downloadjs";

const BASIC_URL = process.env.BASIC_URL;

function HomePage() {
	const submitUsername = async (event) => {
		event.preventDefault(); // don't redirect the page
		// where we'll add our form logic
		const username = event.target.username.value;
		console.log("username-", username);
		console.log(BASIC_URL);
		const res = await fetch(BASIC_URL, {
			body: JSON.stringify({
				username,
			}),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});
		const result = await res.json();
		console.log("result-", result);
		if (result.success) {
			const res = await fetch(`${BASIC_URL}/${result.username}.zip`);
			const blob = await res.blob();
			download(blob, `${username}.zip`);
		}
	};

	return (
		<div>
			<Head>
				<title> Instagram - Scrapper </title>{" "}
				<link rel="icon" href="./images/logo.png" type="image/x-icon" />
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
					{" "}
				</script>{" "}
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js">
					{" "}
				</script>{" "}
			</Head>
			{/* <Headers>
            				<title>Instagram-Scrapper</title>
            				<Link rel="stylesheet" href="index.css"></Link>
            			</Headers> */}{" "}
			<Navbar> </Navbar>{" "}
			<div className="container-fluid" style={{ margin: "80px" }}>
				<h1> Download Instagram Posts </h1>{" "}
			</div>
			<div className="container">
				<div className="card card-outline-secondary">
					<div className="card-header">
						<h3 className="mb-0"> Scrape Public Profile </h3>{" "}
					</div>{" "}
					<div className="card-body">
						<form
							method="POST"
							action=""
							id="scrapeForm"
							onSubmit={submitUsername}
						>
							<label> Enter Username: </label>{" "}
							<input
								type="text"
								placeholder="Public Profle only"
								required
								name="username"
								id="username"
								className="form-control"
							/>
							<button
								type="submit"
								className="btn btn-primary"
								id="scapeButton"
							>
								Submit{" "}
							</button>{" "}
						</form>{" "}
					</div>{" "}
				</div>{" "}
			</div>
			<div className="container">
				<div className="card card-outline-secondary">
					<div className="card-header">
						<h3 className="mb-0"> Download.zip </h3>{" "}
					</div>{" "}
					<div className="card-body">
						<form id="downloadForm">
							<fieldset>
								<div className="form-group">
									{" "}
									{/*  <div className="warning-box">
                                <h4>The profile Should be Public</h4>
                            </div>
                            <div className="preview">
                                <h5>10 Posts availabe</h5>
                            </div>  */}{" "}
									<div className="form-group">
										<label> Enter Username: </label>{" "}
										<input
											type="text"
											placeholder="Public Profle only"
											required
											name="username"
											id="username"
											className="form-control"
										/>
									</div>{" "}
								</div>{" "}
								<button className="btn btn-primary" id="downloadButton">
									Download{" "}
								</button>{" "}
							</fieldset>{" "}
						</form>{" "}
					</div>{" "}
				</div>{" "}
			</div>{" "}
			{/* <script data-main="scripts/main" src="scripts/require.js"></script>  */}{" "}
			<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js">
				{" "}
			</script>{" "}
			<script type="module" src="./index.js">
				{" "}
			</script>{" "}
		</div>
	);
}

export default HomePage;
