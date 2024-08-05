import { addComentsType, addCommentType, commentsStateType, CommentType, deleteCommentType, updateComentType } from "../../types";

export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
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
            return { comments: state.comments.filter((comment: CommentType) => comment.id !== action.id) }
        case UPDATE_COMMENT:
            return { comments: [...state.comments.filter((comment: CommentType) => comment.id !== action.id), action.comment] }
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

export const updateCOMMENT = (id: string, comment: CommentType): updateComentType => {
    return { type: UPDATE_COMMENT, id: id, comment: comment }
}

export const addCOMMENTs = (comments: CommentType[]): addComentsType => {
    return { type: ADD_COMMENTS, comments: comments }
}
