import { Container, Navbar, styled, Text } from '@nextui-org/react';
import { FC, ReactNode, MouseEvent } from 'react';
import { useHref, useLinkClickHandler, useLocation } from 'react-router-dom';

export const Box = styled('div', {
  boxSizing: 'border-box',
  maxW: '100%',
  position: 'relative',
});

const NavbarLink = ({ children, to }: { children?: ReactNode; to: string }): JSX.Element => {
  const href = useHref(to);
  const handleClick = useLinkClickHandler(to);

  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Navbar.Link
      href={href}
      isActive={isActive}
      onClick={(event) => {
        handleClick(event as unknown as MouseEvent<HTMLAnchorElement>);
      }}
    >
      {children}
    </Navbar.Link>
  );
};

export const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <Box>
      <Navbar isCompact isBordered>
        <Navbar.Brand>
          <Text b color="inherit">
            Rotom
          </Text>
        </Navbar.Brand>
        <Navbar.Content variant="underline">
          <NavbarLink to="/">Status</NavbarLink>
          <NavbarLink to="/jobs">Jobs</NavbarLink>
        </Navbar.Content>
      </Navbar>
      <Container fluid responsive={false}>
        {children}
      </Container>
    </Box>
  );
};
