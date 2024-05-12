import React from 'react';
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap"
import axios from 'axios';

import figmaFileParser from '../../utils/figmaFileParser'

import './multiSelect'
import './Figma.scss'

class Figma extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            fileId: '',
            property: {},
            fileName: '',
            url: '',
            selectedPageFrame: '',
            opacity: '',
            visibility:true,
            zindex:false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentDidMount() {
        const { token, fileId, fileName, property, url, selectedPageFrame} = this.props.figma;
        const { opacity, visibility, zindex } = this.props.image;
        this.setState({
            token: token,
            fileId: fileId,
            fileName: fileName,
            property: property,
            url: url,
            selectedPageFrame: selectedPageFrame,
            opacity: opacity,
            visibility: visibility,
            zindex:zindex
        });
    }

    handleChange = async (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
        if(nam === 'opacity'){
            const { visibility, zindex } = this.state;
            const data = {
                opacity:val,
                visibility,
                zindex
            }
            console.log(JSON.stringify(data));
            await this.props.updateStyle(data);
        }
    };
    
    handleCheck = async (event, field, value) => {
        const { opacity, visibility, zindex } = this.state;
        await this.setState({
            [field]: value,
        });

        const vivsibilityCurrent = field === 'visibility' ? value : visibility;
        const zindexCurrent = field === 'zindex' ? value : zindex;

        const data = {
            opacity,
            visibility:vivsibilityCurrent,
            zindex:zindexCurrent
        }
        console.log(JSON.stringify(data));
        await this.props.updateStyle(data);
    };

    handleReset = async (event) => {
        this.setState({
            token: '',
            fileId: '',
            property: {},
            fileName: '',
            url: '',
            selectedPageFrame: ''
        })
        await this.props.resetFigmaProp();
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { token, fileId } = this.state;
        await this.props.setFigmaTokenAndFileID({
            token,
            fileId,
        });

        //yW4mrGhP3QazXGNFcn8k8n
        //54242-61103d02-6572-488f-9f74-bee1edd898d9
        const result = await axios({
            method: 'get',
            headers: { 'X-FIGMA-TOKEN': token },
            url: `https://api.figma.com/v1/files/${fileId}`,
            data: {}
        });
        const constructedFigmaPage = figmaFileParser(result.data);
        await this.props.setFigmaFileProp(
            {
                fileName: result.data.name,
                property: constructedFigmaPage,
            });

        this.setState({
            fileName: result.data.name,
            property: constructedFigmaPage
        })
    };

    frameSubmit = async (event) => {
        event.preventDefault();
        let { url, selectedPageFrame, token, fileId, property, opacity,visibility, zindex } = this.state;

        const pageFrame = selectedPageFrame.split('__');
        console.log(JSON.stringify(property));
        const frame = property[pageFrame[0]]['frame'][pageFrame[1]];
        const old_selectedPageFrame = this.props?.figma?.selectedPageFrame;

        await this.props.setHostAndURL({
            url,
            selectedPageFrame: selectedPageFrame
        })

        if (selectedPageFrame != old_selectedPageFrame) {
            const figmaImg = await axios({
                method: 'get',
                headers: { 'X-FIGMA-TOKEN': token },
                url: `https://api.figma.com/v1/images/${fileId}`,
                params: {
                    ids: pageFrame[1],
                    format: 'svg',
                    svg_include_id: true
                },
                data: {}
            });
            console.log('------ Hover Propery Start----------');
            await this.props.setImageProp({
                url: url,
                image: figmaImg.data['images'][pageFrame[1]],
                frameProperty: frame,
                opacity: 0.5,
                visibility: true,
                zindex: false
            })
        } else {
            console.log('------ Hover Propery Start----------');
            const { image, frameProperty, opacity, visibility, zindex } = this.props.image;
            await this.props.setImageProp({
                url: url,
                image: image,
                frameProperty: frameProperty,
                opacity: opacity,
                visibility: visibility,
                zindex: zindex
            })
        }
        console.log('------ Hover Propery End----------');
    }

    stlyeSubmit = async (event) => {
        event.preventDefault();
        const { opacity, visibility, zindex } = this.state;
        await this.updateStyleProp(opacity, visibility, zindex)
    }

    updateStyleProp = async(opacity, visibility, zindex) => {
        await this.props.setImageStyle({
            opacity: opacity,
            visibility: visibility,
            zindex: zindex
        })
    } 

    render() {
        const { token, fileId, fileName, property, url, selectedPageFrame, opacity, visibility, zindex } = this.state;

        const options = Object.keys(property).map(key => (
            <optgroup label={property[key].pageName} key={key} >
                {
                    Object.keys(property[key].frame).map(frameKey => (
                        <option value={key + '__' + frameKey} key={frameKey}>
                            {property[key].frame[frameKey].name}
                        </option>
                    ))
                }

            </optgroup>
        ));

        return (
            <div className="figma-form">
                {/* <p className="text-primary" >Figma</p> */}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="token" className="col-3 col-form-label">Token</label>
                        <input
                            className="col-9"
                            type="text"
                            id="token"
                            placeholder="Paste Figma Genarated Token"
                            value={token}
                            name="token"
                            onChange={this.handleChange}
                            required
                            disabled={fileName != '' ? true : false}

                        />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="fileid" className="col-3 col-form-label">File Id</label>
                        <input
                            className="col-9"
                            type="text"
                            id="fileid"
                            placeholder="Paste File Id From Figma"
                            value={fileId}
                            name="fileId"
                            onChange={this.handleChange}
                            required
                            disabled={fileName != '' ? true : false}
                        />
                    </div>
                    <div className="row figma-action">
                        <button type="submit" className="btn btn-primary mb-2" onSubmit={this.handleSubmit}
                            disabled={fileName != '' ? true : false}>Submit</button>
                        <button type="reset" className="btn btn-primary mb-2" onClick={this.handleReset}>Reset</button>
                    </div>
                </form>
                {fileName == '' ? false : <div>
                    <hr className="mt-0" />
                    <div className="row">
                        <label className="col-4"
                        >File Name :</label>
                        <p className="col-7">{fileName}</p>
                    </div>
                    <form onSubmit={this.frameSubmit}>
                        <div className="form-group row">
                            <label htmlFor="url" className="col-3 col-form-label f-12">Host</label>
                            <input
                                className="col-9 f-12"
                                type="text"
                                id="url"
                                placeholder="Paste The URL"
                                value={url}
                                name="url"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group row">
                            <label htmlFor="selectedPageFrame" className="col-3 col-form-label">Frame</label>
                            <select className="selectpicker col-9"
                                id="selectedPageFrame" value={selectedPageFrame} name="selectedPageFrame" onChange={this.handleChange} required>
                                {options}
                            </select>
                        </div>
                        <div className="row figma-action">
                            <button type="submit" className="btn btn-primary mb-2" onSubmit={this.frameSubmit}>Apply</button>

                        </div>
                    </form>
                </div>
                }
                {url == '' ? false : <div>
                    <hr className="mt-0" />
                    <p className='col-4'>Style</p>
                    <form onSubmit={this.stlyeSubmit}>
                        <div className="form-group row">
                            <label htmlFor="opacity" className="col-3 col-form-label f-12">Opacity</label>
                            <input
                                className="col-3 f-12"
                                type="number"
                                step="0.1"
                                min="0"
                                max="1"
                                id="opacity"
                                placeholder="Paste The URL"
                                value={opacity}
                                name="opacity"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group row">
                            <label htmlFor="visibility" className="col-3 col-form-label f-12">Visibility</label>
                            <input
                                className="col-3 f-12 visibility"
                                type="checkbox"
                                id="visibility"
                                checked={visibility}
                                name="visibility"
                                onChange={(evt) => this.handleCheck(evt, 'visibility', !visibility)}
                                
                            />
                        </div>
                        <div className="form-group row">
                            <label htmlFor="zindex" className="col-3 col-form-label f-12">Zindex</label>
                            <input
                                className="col-3 f-12 visibility"
                                type="checkbox"
                                id="zindex"
                                checked={zindex}
                                name="zindex"
                                onChange={(evt) => this.handleCheck(evt, 'zindex', !zindex)}
                                
                            />
                        </div>
                        <div className="row figma-action">
                            <button type="submit" className="btn btn-primary mb-2" onSubmit={this.stlyeSubmit}>Apply</button>
                        </div>
                    </form>
                </div>
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    // console.log('App ===>', state);
    return {
        figma: state.figma,
        image: state.image
    };
};

const mapDispatchToProps = (dispatch) => ({
    setFigmaTokenAndFileID: (data) =>
        dispatch({
            type: "SET_TOKEN_AND_FILEID",
            data: data,
        }),
    setFigmaFileProp: (data) =>
        dispatch({
            type: "SET_PROP",
            data: data,
        }),
    setHostAndURL: (data) =>
        dispatch({
            type: "SET_HOST_AND_FRAME",
            data: data,
        }),
    setImageProp: (data) => dispatch({
        type: "SET_IMAGE_PROP",
        data
    }),
    resetFigmaProp: () => dispatch({
        type: "RESET_FIGMA_PROP",
    }),
    setImageStyle: (data) => dispatch({
        type: "SET_IMAGE_STYLE",
        data
    }),
    updateStyle: (data) => dispatch({
        type: "UPDATE_STYLE",
        data
    }),
})


export default connect(mapStateToProps, mapDispatchToProps)(Figma);