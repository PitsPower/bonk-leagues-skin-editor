import React from 'react';
import { connect } from 'react-redux';

class MoveableShape extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rect: null,
            position: this.props.shape.position,
            rotation: this.props.shape.rotation,
            scale: this.props.shape.scale
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            position: newProps.position,
            rotation: newProps.rotation,
            scale: newProps.scale
        });
    }

    render() {
        var scaleFactor = 700/30;
        return (
            <div className={"shape" + (this.props.shape.selected?" selected":"")}
                onMouseDown={e => {
                    e.stopPropagation();
                    !this.props.shape.selected && this.props.onClick();
                }}
                style={{
                    transform: `
                        translate(`+this.state.position.x+`px,`+this.state.position.y+`px)
                        translate(-50%,-50%)
                        rotate(`+this.state.rotation+`deg)
                        scale(`+this.state.scale+`)
                    `
                }}
            ref={shape=>{
                if (shape && !this.state.rect) {
                    this.setState({
                        rect: shape.getBoundingClientRect()
                    });
                }
            }}>
                <span dangerouslySetInnerHTML={{__html: this.props.shapeHTML}} onMouseDown={e=>this.props.onShapeDown(e,this)}></span>
                {
                    this.props.shape.selected &&
                    <div className="dragger" onMouseDown={()=>this.props.onDraggerDown(this)}></div>
                }
            </div>
        );
    }
}

var mapStateToProps = (state, props) => {
    return {
        shapeHTML:
        state.allShapes[props.shape.shapeID]
        .replace(/fill\=\".+?\"/g, 'fill="#'+(props.shape.color || '000')+'"'),
        position: props.shape.position,
        rotation: props.shape.rotation,
        scale: props.shape.scale
    };
}
var mapDispatchToProps = (dispatch, props) => {
    return {
        onClick: () => {
            dispatch({
                type: 'SELECT_SHAPE',
                id: props.shape.uuid
            });
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MoveableShape);