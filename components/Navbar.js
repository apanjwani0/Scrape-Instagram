import Image from 'next/image';

export const Navbar = () => {
	return (
		<>
			<nav class="navbar navbar-expand-sm bg-white navbar-expand-lg fixed-top">
				<a class="navbar-brand" href="#">
					<Image
						src="/images/logo.jpeg"
						alt="Logo"
            width="50"
            height="50"
					></Image>
				</a>
				<ul class="navbar-nav">
					<li class="nav-item">
						<a class="nav-link" href="#">
							Home
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">
							About Developer
						</a>
					</li>
				</ul>
			</nav>
		</>
	);
};

