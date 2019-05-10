import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import { ListColor } from '../utils/color';

const StyledNavbar = styled(Navbar)`
	border-top: 4px solid ${ListColor.border};
	background-color: ${ListColor.background};
`;

const StyledLink = styled.a`
	color: '#fff',
	background: 'transparent',
	border: 'none'
`;

const Footer = () => (
	<StyledNavbar>
		<Container>
			<Navbar.Text>
				<StyledLink
					href="https://github.com/lu4ezar/todolist"
					title="Open Github page"
				>
					<FontAwesomeIcon
						icon={['fab', 'github-square']}
						size="2x"
					/>
				</StyledLink>
			</Navbar.Text>
		</Container>
	</StyledNavbar>
);

export default Footer;
