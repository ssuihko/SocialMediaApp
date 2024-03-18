import PropTypes from "prop-types";

function Comment({ comment }) {
  return (
    <div className="comment">
      <h4>Commenter: {comment.user}</h4>
      <p>{comment.content}</p>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
