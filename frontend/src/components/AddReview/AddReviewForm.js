import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { addAReview, getSpotsReviews } from '../../store/ReviewsReducer';
import { getASpot } from '../../store/spotsReducer';
import './AddReview.css'


function AddReview({ setShowModal }) {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const { spotId } = useParams();
    // console.log(spotId)

    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            review, stars, spotId
        }

        dispatch(addAReview(payload));
        dispatch(getSpotsReviews(payload.spotId));
        dispatch(getASpot(payload.spotId))
        setShowModal(false)
        history.push(`/spots/${spotId}`);
    }

    return (
        <form onSubmit={onSubmit} className="review-form">
            <div className='review-form-header'>
                <p className="cancel-button" onClick={() => setShowModal(false)}> <i className="fas fa-times" /></p>
                <h2>Add your review here</h2>
            </div>
            <div className='star-container'>
                <input
                    className='star-inputs'
                    type="radio"
                    id="r1"
                    name="stars"
                    value={1}
                    onChange={(e) => setStars(e.target.value)}
                    checked={stars === 1}
                />
                <label className='star-label' htmlFor="r1">&#9733;</label>
                <input
                    className='star-inputs'
                    type="radio"
                    id="r2"
                    name="stars"
                    value={2}
                    onChange={(e) => setStars(e.target.value)}
                    checked={stars === 2}
                />
                <label className='star-label' htmlFor="r2">&#9733;</label>
                <input
                    className='star-inputs'
                    type="radio"
                    id="r3"
                    name="stars"
                    value={3}
                    onChange={(e) => setStars(e.target.value)}
                    checked={stars === 3}
                />
                <label className='star-label' htmlFor="r3">&#9733;</label>
                <input
                    className='star-inputs'
                    type="radio"
                    id="r4"
                    name="stars"
                    value={4}
                    onChange={(e) => setStars(e.target.value)}
                    checked={stars === 4}
                />
                <label className='star-label' htmlFor="r4">&#9733;</label>
                <input
                    className='star-inputs'
                    type="radio"
                    id="r5"
                    name="stars"
                    value={5}
                    onChange={(e) => setStars(e.target.value)}
                    checked={stars === 5}
                />
                <label className='star-label' htmlFor="r5">&#9733;</label>
            </div>
            <div>
                <label htmlFor="review" />
                <input
                    className='review-textbox'
                    type="type"
                    value={review}
                    placeholder="Type Review here"
                    onChange={(e) => setReview(e.target.value)}>
                </input>
            </div>
            <button className='Submit-Review' type="submit">Submit Review</button>
        </form>
    )
}

export default AddReview;
