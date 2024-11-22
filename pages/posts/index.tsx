import Container from '../../components/container'
import Intro from '../../components/intro'
import Layout from '../../components/layout'
import { getAllPosts } from '../../lib/api'
import Head from 'next/head'
import PostsList from '../../components/posts-list'
import { PostProps } from '../../types/props'

const Posts = ({ posts }: PostProps) => {
    return (
        <>
            <Layout>
                <Head>
                    <title>blog | azerpas</title>
                </Head>
                <Container>
                    <Intro />
                    {posts.length > 0 && (
                        <PostsList posts={posts} />
                    )}
                </Container>
            </Layout>
        </>
    );
}

export default Posts

export const getStaticProps = async () => {
    const posts = getAllPosts([
      'title',
      'date',
      'slug',
      'author',
      'coverImage',
      'excerpt',
      'externalLink',
      'writtenFor',
    ])
  
    return {
      props: { posts },
    }
}