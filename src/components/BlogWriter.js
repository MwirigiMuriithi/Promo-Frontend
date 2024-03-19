import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

function BlogWriter() {
    const { user } = useAuthContext();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/admin/blogs', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });
            if (response.ok) {
                console.log('Blog post submitted successfully!');
                setTitle('');
                setContent('');
                setSubmissionMessage('Blog post submitted successfully!');
                setSubmissionStatus('success');
            } else {
                throw new Error('Failed to submit blog post.');
            }
        } catch (error) {
            console.error('Error submitting blog post:', error);
            setSubmissionMessage('Failed to submit blog post.');
            setSubmissionStatus('error');
        }
    };

    return (
        <div className="blog-writer">
            <h2>Write a New Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="blog-title">Title:</label>
                    <input type="text" id="blog-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="blog-content">Content:</label>
                    <textarea id="blog-content" value={content} onChange={(e) => setContent(e.target.value)} rows="5" required></textarea>
                </div>
                <button type="submit">Submit</button>
                <p className={submissionStatus === 'success' ? 'success' : 'error'}>{submissionMessage}</p>
            </form>
        </div>
    );
}

export default BlogWriter;

