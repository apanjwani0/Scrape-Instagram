import Image from 'next/image';

export const Navbar = () => {
	return (
		<>
			<nav className="navbar navbar-expand-sm bg-white navbar-expand-lg fixed-top">
				<a className="navbar-brand" href="#">
					<Image
						src="/images/logo.jpeg"
						alt="Logo"
            width="50"
            height="50"
					></Image>
				</a>
				<ul className="navbar-nav">
					<li className="nav-item">
						<a className="nav-link" href="#">
							Home
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">
							About Developer
						</a>
					</li>
				</ul>
			</nav>
		</>
	);
};

