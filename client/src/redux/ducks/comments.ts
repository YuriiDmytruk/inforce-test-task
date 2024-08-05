import { addComentsType, addCommentType, commentsStateType, CommentType, deleteCommentType } from "../../types";

export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const ADD_COMMENTS = 'ADD_COMMENTS'

const defaultState: commentsStateType = {
    comments: []
};

export const commentsReducer = (
    state: commentsStateType = defaultState,
    action: any
): commentsStateType => {
    switch (action.type) {
        case ADD_COMMENT:
            const newComment= { ...action.comment }
            return { comments: [...state.comments, newComment] }
        case DELETE_COMMENT:
            return { comments: state.comments.filter((comment: CommentType) => comment._id !== action.id) }
        case ADD_COMMENTS:
            return { comments: [...state.comments, ...action.comments] }
        default:
            return state;
    }
};

export const addCOMMENT = (comment: CommentType): addCommentType => {
    return { type: ADD_COMMENT, comment: comment }
}
export const deleteCOMMENT = (id: string): deleteCommentType => {
    return { type: DELETE_COMMENT, id: id }
}

export const addCOMMENTs = (comments: CommentType[]): addComentsType => {
    return { type: ADD_COMMENTS, comments: comments }
}
