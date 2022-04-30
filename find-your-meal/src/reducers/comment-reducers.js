import { CREATE_COMMENT } from "../actions/comment-actions.js";

const commentReducer = state = [], action) => {
  switch (action.type) {
    case CREATE_COMMENT:
     return [
      action.newComment,
       ...state
     ];
  }
}

export default commentReducer;