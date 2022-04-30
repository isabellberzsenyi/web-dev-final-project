import * as commentService from '../services/comments-service.js';

export const CREATE_COMMENT = 'CREATE_COMMENT';

export const createComment = async (dispatch, mealId, userId, comment) => {
 const newComment = await service.createComment(mealId, userId, comment);
 dispatch({
   type: CREATE_COMMENT,
   newComment
 });
}