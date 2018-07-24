import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        display: 'flex',
        height: '100%',
        width: '100%'
    }
})

class HomePage extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="title">
                    Домашняя страница
                </Typography>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme:true})(HomePage);