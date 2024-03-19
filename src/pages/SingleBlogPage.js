import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Blog.css';  
import BottomLinks from '../components/BottomLinks';
import Footer from '../components/Footer/Footer';

function SingleBlogPage() {
    const { postId } = useParams(); 
    const [blogPost, setBlogPost] = useState(null);

    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                const response = await fetch(`/api/blog/${postId}`);
                if (response.ok) {
                    const data = await response.json();
                    setBlogPost(data);
                } else {
                    throw new Error('Failed to fetch blog post');
                }
            } catch (error) {
                console.error('Error fetching blog post:', error);
            }
        };

        fetchBlogPost();
    }, [postId]);

    if (!blogPost) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <>
        <div className="single-blog">
            <h2 className="blog-title">{blogPost.title}</h2>
            <p className="blog-content">{blogPost.content}</p>
        </div>
        <BottomLinks/>
        <Footer/>
        </>
    );
}

export default SingleBlogPage;


