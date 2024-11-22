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
            {
                post.externalLink ? (
                    <Link href={post.externalLink} passHref rel="noopener noreferrer" target="_blank">
                        <a className="hover:underline external-post-link">
                            <style jsx>
                                {`
                                .external-post-link::after {
                                    content: url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>');
                                    vertical-align: -0.2em;
                                    padding-left: 0.1em;
                                    width: 2rem;
                                    display: inline-block;
                                }
                                `}
                            </style>
                            {post.title}
                        </a>
                    </Link>
                ) : 
                (
                    <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                        <a className="hover:underline">{post.title}</a>
                    </Link>
                )
            }
        </h2>
    </div>
);

export default List