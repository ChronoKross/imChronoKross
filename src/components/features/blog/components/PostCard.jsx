import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PostCard = ({ post }) => {
  return (
    <div className="post-item border p-4 rounded-lg shadow-md mb-4">
      <Link to={`/blog/${post.id}`} state={{ post }}>
        <h2 className="text-2xl font-bold mb-2">{post.attributes.title}</h2>
        <p className="text-gray-600">{post.attributes.excerpt}</p>
      </Link>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    attributes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default PostCard;
