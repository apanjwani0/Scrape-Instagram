import { Navbar } from "../components/Navbar.js";
import Head from 'next/head';

function HomePage() {
	return (
		<div>
			<Head>
				<title>Instagram-Scrapper</title>
				<link rel="icon" href="./images/logo.png" type="image/x-icon"/>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
			</Head>

			{/* <Headers>
				<title>Instagram-Scrapper</title>
				<Link rel="stylesheet" href="index.css"></Link>
			</Headers> */}
			<Navbar></Navbar>
			<div class="container-fluid" style={{margin: "80px"}}>
				<h1>Download Instagram Posts</h1>
			</div>

			<div class="container">
				<div class="card card-outline-secondary">
					<div class="card-header">
						<h3 class="mb-0">Scrape Public Profile</h3>
					</div>
					<div class="card-body">
						<form method="POST" action="" id="scrapeForm">
							<fieldset>
								<div class="form-group">
									<label>Enter Username : </label>
									<input
										type="text"
										placeholder="Public Profle only"
										required
										name="username"
										id="username"
										class="form-control"
									/>
								</div>
								<button type="submit" class="btn btn-primary" id="scapeButton">
									Submit
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>

			<div class="container">
				<div class="card card-outline-secondary">
					<div class="card-header">
						<h3 class="mb-0">Download .zip</h3>
					</div>
					<div class="card-body">
						<form id="downloadForm">
							<fieldset>
								<div class="form-group">
									{/*  <div class="warning-box">
                    <h4>The profile Should be Public</h4>
                </div>
                <div class="preview">
                    <h5>10 Posts availabe</h5>
                </div>  */}
									<div class="form-group">
										<label>Enter Username : </label>
										<input
											type="text"
											placeholder="Public Profle only"
											required
											name="username"
											id="username"
											class="form-control"
										/>
									</div>
								</div>
								<button class="btn btn-primary" id="downloadButton">
									Download
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
			{/* <script data-main="scripts/main" src="scripts/require.js"></script>  */}
			<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>
			<script type="module" src="./index.js"></script>
		</div>
	);
}

export default HomePage;
