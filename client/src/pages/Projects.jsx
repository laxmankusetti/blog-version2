import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Spinner } from "flowbite-react";

const Projects = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-3xl uppercase text-gray-400 text-center my-5">Projects</h1>
        </div>
        <div className="max-w-6xl flex flex-wrap mx-auto min-h-screen items-center justify-center gap-5">
          {loading && <Spinner size={"xl"} />}
          {posts &&
            posts.map((post) => <PostCard post={post} key={post._id} />)}
        </div>
      </div>
    </>
  );
};

export default Projects;
