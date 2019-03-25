import React from 'react';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        marginTop: 20,
    },
    text: {
        padding: '20px 0px 100px 0px',
        color: 'gray',
    }
});

class Description extends React.Component {
    state = {
        value: 0,
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <section >
                    {/* <h1>Live</h1> */}
                    <video width="100%" height="350" controls >
                        <source src="https://www.youtube.com/watch?v=Qb6Bdbjn0Aw" type="video/mp4" />
                        <source src="https://www.youtube.com/watch?v=Qb6Bdbjn0Aw" type="video/ogg" />
                        Your browser does not support the video tag.
</video>
                    <div className={classes.text}>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </section>
            </div>
        );
    }
}



export default withStyles(styles)(Description);