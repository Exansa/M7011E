export const getStaticProps = async () => {

    const res = await fetch('https:localhost:5001/posts');
    const data = await res.json();

    return {
        props: { posts: data }
    }

}

const Posts = ({ posts }) => {
    return (
        <div>
            <h1>All posts</h1>
            {posts.map(posts => (
                <div key={posts.id}>
                    <a>
                        {posts.title}
                    </a>
                </div>
            ))}
        </div>
    )
}

export default Posts