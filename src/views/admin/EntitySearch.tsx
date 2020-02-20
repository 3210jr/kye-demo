import React, {Component} from "react";
import {
    AppBar, Typography, InputBase, IconButton, Toolbar, CssBaseline
} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles'
import { fade} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {ChevronLeft} from '@material-ui/icons'
import SearchResults from "./SearchReults";
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
})


class EntitySearch extends Component{
    state  = {
        searches: [],
    }
    searchEntity = (query: string) => {}

    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            onClick={() => {
                                this.props.history.goBack()
                            }}
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <ChevronLeft/>
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Admin - Search
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    {/*TODO: Search Results components*/}
                    {this.state.searches.length > 0 && (
                        this.state.searches.map((res) => {})
                    )}
                    {this.state.searches.length < 0 && (
                        <p>Search for new Entities</p>
                    )}
                </main>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(EntitySearch)
