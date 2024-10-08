import { useParams,Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthedUserContext } from '../../App';
import * as hootService from '../../services/hootService';
import styles from './HootDetails.module.css';
import CommentForm from '../CommentForm/CommentForm';

export default function HootDetails(props){
    const [hoot, setHoot] = useState(null);
    const { id } = useParams();
    const user = useContext(AuthedUserContext);
    useEffect(() => {
        const getHoot = async () => {
            const hootData = await hootService.show(id);
            console.log(hootData, '<-------------------hootData in HootDetails');
            setHoot(hootData);
        };
        getHoot();
    } , [id]);

    console.log(id, '<-------------------id in HootDetails');
    async function handleAddComment(formData){
        const newComment = await hootService.createComment(formData, id);
        //copy the hoot object and update the comments array
        console.log(newComment, '<-------------------newComment in HootDetails');
        setHoot(newComment);
    }

    if (!hoot) return <main>Loading...</main>;

    return (
        <main>
        <header>
            <p>{hoot.category.toUpperCase()}</p>
            <h1>{hoot.title}</h1>
            <p>{hoot.author.username}</p>

            {hoot.author._id === user._id ? 
                <button onClick={() => props.handleDeleteHoot(id)}>
                    Delete
                </button> : ''
            }
            {hoot.author._id === user._id ? <Link to={`/hoots/${id}/edit`}>Edit</Link> : ''}
        </header>
        <p>{hoot.text}</p>
        <section>
            <h2>Comments</h2>
            <CommentForm handleAddComment={handleAddComment}/>
            {!hoot.comments.length && <p>There are no comments</p>}
            {hoot.comments.map((comment) => (
                    <article key={comment._id}>
                        <header>
                            <p>{comment.author.username}</p>
                        </header>
                        <p>{comment.text}</p>
                    </article>
            ))}
        </section>
      </main>
    )
}