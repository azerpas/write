import Link from "next/link";
import PostType from "../types/post";
import { PostProps } from "../types/props";
import DateFormatter from "./date-formatter";

const List = ({ posts }: PostProps) => {
    return(
        <div>
            {posts.map((post: PostType) => ( 
                <Post post={post} key={post.slug} />    
            ))}
        </div>
    );
}

const Post = ({post}: {post: PostType}) => (
    <div className="mb-3">
        <h5>
            <DateFormatter dateString={post.date} />
        </h5>
        <h2 className="text-2xl">
            <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                <a className="hover:underline">{post.title}</a>
            </Link>
        </h2>
    </div>
);

export default List