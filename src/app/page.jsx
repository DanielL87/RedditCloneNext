import Posts from "@/components/Posts.jsx";
import Subreddits from "@/components/Subreddits.jsx";

export default function Home() {
  return (
    <div id="body-container">
      <Subreddits />
      <Posts />
    </div>
  );
}
