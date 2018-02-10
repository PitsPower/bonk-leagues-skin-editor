import uuidv1 from 'uuid/v1';

export default function(state=[], action) {
    switch (action.type) {
        case 'ADD_SHAPE': {
            return [...state, {
                uuid: uuidv1(),
                name: 'Shape '+ (state.length+1),
                shapeID: action.id,
                selected: true,

                position: {
                    x: 0,
                    y: 0
                },
                rotation: 0,
                scale: 1,
                hf: false,
                vf: false
            }];
        }
        case 'DELETE_SELECTED_SHAPE': {
            return state.filter(shape => {
                return !shape.selected;
            });
        }

        case 'SELECT_SHAPE': {
            return state.map(shape => {
                return {...shape, selected: shape.uuid === action.id};
            });
        }
        case 'DESELECT_ALL': {
            return state.map(shape => {
                return {...shape, selected: false};
            });
        }

        case 'CHANGE_SHAPE_TRANSLATION': {
            return state.map(shape => {
                if (shape.selected) {
                    return {...shape,
                        position: action.position || shape.position,
                        rotation: action.rotation || shape.rotation,
                        scale: action.scale || shape.scale,
                        hf: typeof action.hf === 'undefined' ? shape.hf : action.hf,
                        vf: typeof action.vf === 'undefined' ? shape.vf : action.vf
                    };
                } else {
                    return shape;
                }
            });
        }

        case 'CHANGE_SELECTED_COLOR': {
            return state.map(shape => {
                if (shape.selected) {
                    return {...shape,
                        color: action.color
                    };
                } else {
                    return shape;
                }
            });
        }

        case 'SET_ALL_SHAPES': {
            return action.shapes;
        }

        default: return state;
    }
}
