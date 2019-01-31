class Feedback extends React.Component {

    handleCloseFeedback = event => {
        event.preventDefault();
        this.setState({ showFeedback: false });
    }


    render() {

        const { handleCloseFeedback, props: {message} } = this;

        return (
            <section className="error">
                <p className="error__text">{message}</p>
            </section>
        );
    }
}