import React from "react";
import { connect } from "react-redux";

import "./WebTool.scss";
import logo from "../../images/i2i.png";

class WebTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    console.log("------DidMount------");
    const { webProp } = this.props;
    console.log("didupdate webProp ==>", webProp);

    this.setState(webProp);
  }

  handleChange = async (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    if (nam === "image") {
      nam = "imageBlob";
      val = URL.createObjectURL(event.target.files[0]);
    }
    this.setState({ [nam]: val });

    // if (nam == "height" && nam == "clearness" && this.props.webProp.imageBlob) {
    //   console.log("inside");
    //   this.state[nam] = val;
    //   await this.props.setWebProp(this.state);
    // }
  };

  componentDidUpdate = async () => {
    if (this.state.restore) {
      const { webProp } = this.props;
      webProp.restore = false;
      this.setState(webProp);
    } else if (this.state.imageBlob && this.state.host) {
      await this.props.requestSetWebProp();
    }
  };

  handleReset(event) {
    this.props.resetWebProp().then(() => {
      this.setState({
        restore: true,
      });
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.setWebProp(this.state);
  };

  render() {
    const {
      host,
      image,
      clearness,
      height,
      width,
      top,
      bottom,
      imageBlob,
    } = this.state;
    console.log("image ==>", image);
    return (
      <div>
        <form onSubmit={this.handleSubmit} id="tool-form">
          <div className="url">
            <label htmlFor="url">URL</label> <br />
            <input
              type="text"
              id="url"
              placeholder=" Enter The Host "
              value={host}
              name="host"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="imgpath">
            <label htmlFor="image">Image Path</label> <br />
            <input
              type="file"
              id="image"
              placeholder=" Enter The Image Path"
              name="image"
              onChange={this.handleChange}
              value={image}
            />
          </div>
          <div>
            <label htmlFor="clearness">Clearness :</label>
            <input
              type="number"
              min="0"
              max="1"
              step="0.1"
              name="clearness"
              onChange={this.handleChange}
              value={clearness}
              id="clearness"
            // disabled={(imageBlob = "") ? "disabled" : ""}
            />
            <span>%</span>
          </div>
          <div>
            <label htmlFor="height">Min Height :</label>
            <input
              type="number"
              name="height"
              onChange={this.handleChange}
              value={height}
              id="height"
            // disabled={(imageBlob = "") ? "disabled" : ""}
            />
            <span>px</span>
          </div>
          {/* <div>
            <label htmlFor="width">Width :</label>
            <input
              type="number"
              min="0"
              max="100"
              value={width}
              name="width"
              onChange={this.handleChange}
              id="width"
            />
            <span>%</span>
          </div> */}
          {/* <div>
            <label htmlFor="top">Top :</label>
            <input
              type="number"
              min="0"
              max="100"
              value={top}
              name="top"
              onChange={this.handleChange}
              id="top"
            />
            <span>%</span>
          </div> */}
          {/* <div>
            <label htmlFor="bottom">Bottom :</label>
            <input
              type="number"
              min="0"
              max="100"
              value={bottom}
              id="bottom"
              name="bottom"
              onChange={this.handleChange}
            />
            <span>%</span>
          </div> */}
          <div className="formaction">
            <button type="button" onClick={this.handleReset}>
              Reset
            </button>
            <button type="submit">Apply</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("App state ====>", state);

  return {
    webProp: state.web,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setWebProp: (data) =>
    dispatch({
      type: "SET_WEB_PROP",
      data: data,
    }),
  resetWebProp: () =>
    dispatch({
      type: "RESET_WEB_PROP",
    }),
  requestSetWebProp: () =>
    dispatch({
      type: "SET_PROP",
      data: {
        isAssignProp: true,
        isActionPending: true,
      },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(WebTool);
