import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

function CommentSection() {
    const { user } = useAuthContext();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if(user && !user.isAdmin){
            fetchComments();

            
            const intervalId = setInterval(() => {
                fetchComments();
            }, 300000);

            return () => clearInterval(intervalId);
        
        }
    }, []);

    const fetchComments = async () => {
        try {
            const response = await fetch('/api/dashboard/comments', 
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleSubmitComment = async () => {
        try {
            const response = await fetch('/api/dashboard/comments', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ body: newComment }),
            });
            if (!response.ok) {
                throw new Error('Failed to add comment');
            }
            fetchComments();
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <section id="comments">
            <h3 className="dashboard">Comments</h3>
            <div className="existing-comments">
                {comments.map((comment, index) => (<div key={index} className="comment">
    <p><strong>{comment.username}</strong></p>
    <p>{comment.body}</p>
</div>

                ))}
            </div>
            <div className="new-comment">
                <h4>Add a Comment</h4>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows="4"
                    placeholder="Write your comment here..."
                ></textarea>
                <button onClick={handleSubmitComment}>Comment</button>
            </div>
        </section>
    );
}

export default CommentSection;
