import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Drawer from '@mui/material/Drawer';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { StyledBadge } from './ComponentsOwnStyle';

export default function Navbar({ setLoggedIn, userType, setUserType, loggedIn, lendedBooks }) {

    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(false);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(false);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(false);
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#ddb892', color: 'black' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AutoStoriesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Library
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            {
                                loggedIn &&
                                <>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        color="inherit"
                                    >
                                        <MenuIcon />
                                    </IconButton>

                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElNav}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        open={Boolean(anchorElNav)}
                                        onClose={handleCloseNavMenu}
                                        sx={{ display: { xs: 'block', md: 'none' } }}
                                    >

                                        <MenuItem onClick={() => {
                                            handleCloseNavMenu();
                                            navigate('/search');
                                        }}>
                                            <Typography sx={{ textAlign: 'center', color: 'black' }}>Search</Typography>
                                        </MenuItem>

                                        {
                                            loggedIn &&
                                            <MenuItem onClick={() => {
                                                handleCloseNavMenu();
                                                navigate('/my-books');
                                            }}>
                                                <Typography sx={{ textAlign: 'center', color: 'black' }}>My Books</Typography>
                                            </MenuItem>
                                        }

                                    </Menu>

                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        color="inherit"
                                    >
                                        <MenuIcon />
                                    </IconButton>

                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElNav}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        open={Boolean(anchorElNav)}
                                        onClose={handleCloseNavMenu}
                                        sx={{ display: { xs: 'block', md: 'none' } }}
                                    >

                                        <MenuItem onClick={() => {
                                            handleCloseNavMenu();
                                            navigate('/search');
                                        }}>
                                            <Typography sx={{ textAlign: 'center', color: 'black' }}>Search</Typography>
                                        </MenuItem>

                                        {
                                            loggedIn &&
                                            <MenuItem onClick={() => {
                                                handleCloseNavMenu();
                                                navigate('/my-books');
                                            }}>
                                                <Typography sx={{ textAlign: 'center', color: 'black' }}>My Books</Typography>
                                            </MenuItem>
                                        }

                                    </Menu>
                                </>
                            }

                        </Box>

                        <AutoStoriesIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Library
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {
                                loggedIn &&
                                <>
                                    <Button
                                        onClick={() => {
                                            handleCloseNavMenu();
                                            navigate('/my-books');
                                        }}
                                        sx={{ my: 2, color: 'black', display: 'block' }}
                                    >
                                        My Books
                                    </Button>

                                    <Button
                                        onClick={() => navigate('/search')}
                                        sx={{ my: 2, color: 'black', display: 'block' }}
                                    >
                                        Search
                                    </Button>
                                </>
                            }


                        </Box>

                        {
                            loggedIn &&
                            <Box sx={{ flexGrow: 0 }}>
                                {
                                    lendedBooks.length > 0 &&
                                    <Tooltip title="Requested book(s)...">
                                        <IconButton sx={{ p: 0, color: 'black', marginRight: '20px' }} onClick={() => { navigate('/lending', { state: { books: lendedBooks } }); }}>
                                            <StyledBadge badgeContent={lendedBooks.length} color="secondary">
                                                <ShoppingCartIcon />
                                            </StyledBadge>
                                        </IconButton>
                                    </Tooltip>
                                }

                                <Tooltip title="More options...">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'black' }}>
                                        <AccountCircleIcon />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >

                                    <MenuItem onClick={() => {
                                        handleCloseUserMenu();
                                        setLoggedIn(false);
                                        setUserType('member');
                                        navigate('/');
                                    }}>
                                        <Typography sx={{ textAlign: 'center' }}>Log out</Typography>
                                    </MenuItem>

                                    {(['admin', 'librarian'].includes(userType)) && <MenuItem onClick={() => {
                                        handleCloseUserMenu();
                                        navigate('/admin');
                                    }}>
                                        <Typography sx={{ textAlign: 'center' }}>Admin</Typography>
                                    </MenuItem>}
                                </Menu>
                            </Box>
                        }

                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}