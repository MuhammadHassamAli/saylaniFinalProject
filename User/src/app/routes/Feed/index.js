import React from "react";
import Slider from "react-slick";
import Slides from "./Components/Slides";
import { firestore } from "../../../firebase/firebase";
import Main from "./Components/Main";

const options = {
  dots: true,
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firestore.collection("slides");
    this.unsubscribe = null;
    this.state = {
      sliders: []
    };
  }
  


  onCollectionUpdate = querySnapshot => {
    const sliders = [];
    querySnapshot.forEach(doc => {
      const { title, description, image, link } = doc.data();
      sliders.push({
        key: doc.id,
        title,
        description,
        image,
        link
      });
    });
    this.setState({
      sliders
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="app-wrapper">
        <section>
          <Slider className="slick-slider-sec" {...options}>
            {this.state.sliders.map((service, key) => (
              <Slides service={service} />
            ))}
          </Slider>
        </section>
        <Main />
      </div>
    );
  }
}

export default Feed;
