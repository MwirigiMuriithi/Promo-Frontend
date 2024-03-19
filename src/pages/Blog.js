import React, { useState, useEffect } from 'react';
import '../styles/Blog.css'; 
import Footer from '../components/Footer/Footer';
import BottomLinks from '../components/BottomLinks';

function BlogPage() {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await fetch('/api/blog/posts');
                if (response.ok) {
                    const data = await response.json();
                    setBlogPosts(data);
                } else {
                    throw new Error('Failed to fetch blog posts');
                }
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        };

        fetchBlogPosts();

        // Poll for new blog posts every 5 minutes (adjust as needed)
        const interval = setInterval(fetchBlogPosts, 300000); // 5 minutes in milliseconds

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <section id="header">
                <div className="header-bar">
                    <h1>Welcome to Our Blog</h1>
                    <p>Stay updated with our latest articles and news</p>
                </div>
            </section>
            <section id="blog-posts">
                {blogPosts.map(post => (
                    <div className="post" key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <a href={`/blog/${post._id}`}>Read more</a>
                    </div>
                ))}
            </section>
            <BottomLinks />
            <Footer />
        </>
    );
}

export default BlogPage;

