import { fetchUser } from "@/lib/fetchUser.js";
import Votes from "./Votes.jsx";

export default async function Post({ post }) {
  const user = await fetchUser();
  const _user = user.id === post.user.id;

  return (
    <div className="individual-post">
      <Votes />
      <div className="post-content">
        {post.title && <p>{post.title}</p>}
        <div>{post.text}</div>
        {_user && (
          <div>
            <button>Edit</button>
          </div>
        )}
        <div className="post-footer">
          {post.subreddit && (
            <p className="subreddit-name">subreddit: {post.subreddit.name}</p>
          )}
          <p className="posted-by">posted by: {post.user.username}</p>
        </div>
      </div>
    </div>
  );
}
