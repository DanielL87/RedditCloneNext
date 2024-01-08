import { prisma } from "@/lib/prisma.js";
import Post from "./Post.jsx";

export default async function DisplayComments({ post, user }) {
  const children = await prisma.post.findMany({
    where: { parentId: post.id },
    include: {
      user: true,
      subreddit: true,
      votes: true,
    },
  });

  return (
    <div>
      {children.map((comment) => (
        <div key={comment.id} className="single-comment-container">
          <Post post={comment} user={user} isChild={true} isSingle={false} />
          <DisplayComments post={comment} user={user} isComment={true} />
        </div>
      ))}
    </div>
  );
}
// import { prisma } from "@/lib/prisma.js";
// import Post from "./Post.jsx";

// export default async function DisplayComments({ post, user }) {
//   const children = await prisma.post.findMany({ where: { parentId: post.id } });
//   console.log(children);
//   return (
//     <div>
//       Comments Container
//       {children.map((post) => (
//         <div>{post.text}</div>
//         {post.children && post.children.length > 0 && (
//           <DisplayComments/>
//         )}
//       ))}

//     </div>
//   );
// }

{
  /* {post.children.map((comment) => (
        <div key={comment.id} className="single-post-container">
          <Post post={comment} user={user} />
          {comment.children && comment.children.length > 0 && (
            <DisplayComments post={comment.children} user={user} />
          )}
        </div>
      ))} */
}
