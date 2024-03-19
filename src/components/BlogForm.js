import React, { useState } from 'react';

function BlogForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, content });
        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" required />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter content" required></textarea>
            <button type="submit">Submit</button>
        </form>
    );
}

export default BlogForm;
