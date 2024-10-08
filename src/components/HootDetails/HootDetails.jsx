import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as hootService from '../../services/hootService';
import styles from './HootDetails.module.css';

export default function HootDetails(){
    const [hoot, setHoot] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const getHoot = async () => {
            const hootData = await hootService.show(id);
            console.log(hootData, '<-------------------hootData in HootDetails');
            setHoot(hootData);
        };
        getHoot();
    } , [id]);

    console.log(id, '<-------------------id in HootDetails');

    if (!hoot) return <main>Loading...</main>;

    return (
        <main>
        <header>
            <p>{hoot.category.toUpperCase()}</p>
            <h1>{hoot.title}</h1>
            <p>{hoot.author.username}</p>
        </header>
        <p>{hoot.text}</p>
        <section>
            <h2>Comments</h2>
            {!hoot.comments.length && <p>There are no comments </p>}
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