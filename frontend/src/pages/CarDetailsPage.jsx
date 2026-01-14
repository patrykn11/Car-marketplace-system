import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Comment from '../components/Comment';

const CarDetailsPage = () => {
    const { id } = useParams();
    const { authFetch, isAuthenticated, username } = useAuth();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [invitationFromUser, setInvitationFromUser] = useState(false);
    const [acceptedInvitationFromUser, setAcceptedInvitationFromUser] = useState(false);
    const [sentInvitation, setSentInvitation] = useState(false);
    const [isFriend, setIsFriend] = useState(false);
    const [loadingInvite, setLoadingInvite] = useState(false);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);
    const [refreshSignal, setRefreshSignal] = useState(0);

    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [likeLoading, setLikeLoading] = useState(false);

    const [showPhone, setShowPhone] = useState(false);

    const fetchComments = useCallback(async () => {
        try {
            const res = await authFetch(`/api/comment/getParents/${id}`);
            if (res.ok) {
                const data = await res.json();
                setComments(data);
            }
        } catch (err) {
            console.error("Error fetching comments:", err);
        }
    }, [id, authFetch]);

    useEffect(() => {
        if (id && !loading && car) {
            if (isAuthenticated && username !== car.username) {
                authFetch(`/api/advertisements/${id}/view`, { method: 'POST' }).catch(err => console.error(err));
            }
        }
    }, [id, loading, car, username, isAuthenticated, authFetch]);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await fetch(`/api/advertisements/${id}`);
                if (!response.ok) throw new Error('Failed to fetch car details');
                const data = await response.json();
                console.log(data)

                setCar(data);
                setLikesCount(data.likeCount || 0);

                if (isAuthenticated) {
                    const favRes = await authFetch('/api/favorites');
                    if (favRes.ok) {
                        const favIds = await favRes.json();
                        setIsLiked(favIds.includes(Number(id)));
                    }
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCarDetails();
            fetchComments();
        }
    }, [id, fetchComments, isAuthenticated, authFetch]);

    useEffect(() => {
        if (!isAuthenticated || !car || username === car.username) return;

        const checkStatus = async () => {
            try {
                const fromRes = await authFetch(`/api/invitations/from/${car.username}`);
                setInvitationFromUser(await fromRes.json());

                const acceptedRes = await authFetch(`/api/invitations/Accepted/${car.username}`);
                setAcceptedInvitationFromUser(await acceptedRes.json());

                const sentRes = await authFetch(`/api/invitations/sent/${car.username}`);
                setSentInvitation(await sentRes.json());

                const friendRes = await authFetch(`/api/friends/isFriend/${car.username}`);
                setIsFriend(await friendRes.json());
            } catch (err) {
                console.error('Error checking invitations/friend status:', err);
            }
        };

        checkStatus();
    }, [isAuthenticated, car, username, authFetch]);

    const handleToggleFavorite = async () => {
        if (!isAuthenticated) {
            return;
        }
        if (likeLoading) return;

        setLikeLoading(true);
        const previousLiked = isLiked;

        setIsLiked(!isLiked);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);

        try {
            let response;
            if (!previousLiked) {
                response = await authFetch(`/api/favorites/${id}`, { method: 'POST' });
            } else {
                response = await authFetch(`/api/favorites/${id}`, { method: 'DELETE' });
            }

            if (!response.ok) throw new Error("Failed to update favorite");
        } catch (err) {
            console.error("Error toggling favorite:", err);
            setIsLiked(previousLiked);
            setLikesCount(prev => previousLiked ? prev + 1 : prev - 1);
            console.error("Could not update favorite status.");
        } finally {
            setLikeLoading(false);
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const res = await authFetch(`/api/comment/add-com`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    advertisement_id: Number(id),
                    content: newComment,
                    parent_id: replyingTo ? Number(replyingTo) : null
                })
            });

            if (res.ok) {
                setNewComment("");
                setReplyingTo(null);
                fetchComments();
                setRefreshSignal(prev => prev + 1);
            }
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };
    const handleFriendAction = async () => {
        setLoadingInvite(true);
        try {
            const url = invitationFromUser
                ? `/api/invitations/accept/${car.username}`
                : `/api/invitations/add/${car.username}`;
            const res = await authFetch(url, { method: 'POST' });
            if (res.ok) {
                if (!invitationFromUser) {
                    try {
                        await authFetch(`/api/advertisements/${id}/contact`, { method: 'POST' });
                    } catch (statsErr) {
                        console.error('Error incrementing contact stats:', statsErr);
                    }
                }

                setInvitationFromUser(false);
                setSentInvitation(!invitationFromUser);
                setAcceptedInvitationFromUser(invitationFromUser);
                if (!invitationFromUser) setIsFriend(true);
            }
        } catch (err) {
            console.error('Friend invitation error:', err);
        } finally {
            setLoadingInvite(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error || !car) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center p-4">
                <h2 className="text-2xl font-bold text-red-600">{error || "Car not found"}</h2>
                <button onClick={() => navigate('/cars')} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">Back to Listings</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={() => navigate(-1)} className="mb-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 flex items-center gap-1 transition-colors">
                    &larr; Back
                </button>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="md:flex">

                        <div className="md:w-1/2 flex flex-col border-r border-gray-100 dark:border-gray-700">
                            <div className="h-96 bg-gray-200 dark:bg-gray-700 relative">
                                <img
                                    className="w-full h-full object-cover"
                                    src={car.hasImage
                                        ? `/api/advertisements/${id}/image`
                                        : "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                                    }
                                    alt="Car"
                                />
                            </div>

                            <div className="flex-1 flex flex-col bg-gray-50/50 dark:bg-gray-900/20 max-h-[500px]">
                                <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800">
                                    <h3 className="font-bold text-gray-900 dark:text-white">Comments ({comments.length})</h3>
                                    {replyingTo && (
                                        <button onClick={() => setReplyingTo(null)} className="text-xs text-red-500 hover:underline">
                                            X
                                        </button>
                                    )}
                                </div>

                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {comments.length > 0 ? (
                                        comments.map(c => (
                                            <Comment
                                                key={c.comment_id}
                                                comment={c}
                                                refreshSignal={refreshSignal}
                                                onReplyClick={(cid) => {
                                                    setReplyingTo(cid);
                                                    document.getElementById('commentInput').focus();
                                                }}
                                            />
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-center text-sm py-10">No comments for this advertisement.</p>
                                    )}
                                </div>

                                <div className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
                                    {isAuthenticated ? (
                                        <form onSubmit={handleAddComment} className="flex gap-2">
                                            <input
                                                id="commentInput"
                                                type="text"
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                placeholder={replyingTo ? `Replying to #${replyingTo}...` : "Write a comment..."}
                                                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                                {replyingTo ? 'Reply' : 'Send'}
                                            </button>
                                        </form>
                                    ) : (
                                        <p className="text-center text-sm text-gray-500">Log in to comment.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto max-h-[900px]">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
                                        {car.carData.carBrand} {car.carData.carModel}
                                    </h1>
                                    <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors">{car.title}</p>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                                        {car.carData.price.toLocaleString()} PLN
                                    </span>

                                    <button
                                        onClick={handleToggleFavorite}
                                        disabled={likeLoading}
                                        className={`p-2 rounded-full shadow-sm border transition-all transform hover:scale-105 active:scale-95 ${isLiked
                                            ? 'bg-red-50 border-red-200 text-red-500 dark:bg-red-900/20 dark:border-red-900'
                                            : 'bg-white border-gray-200 text-gray-400 hover:text-red-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
                                            }`}
                                        title={isLiked ? "Remove from favorites" : "Add to favorites"}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${isLiked ? 'fill-current' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <DetailTile label="Year" value={car.carData.productionYear} />
                                <DetailTile label="Body type" value={car.carData.carBodyType} />
                                <DetailTile label="Mileage" value={`${car.carData.mileage.toLocaleString()} km`} />
                                <DetailTile label="Fuel Type" value={car.carData.fuelType} />
                                <DetailTile label="Transmission" value={car.carData.transmission} />
                                <DetailTile label="Power" value={`${car.carData.power} HP`} />
                                <DetailTile label="Color" value={car.carData.carColor} />
                                <DetailTile label="Engine" value={`${car.carData.engineCapacity} L`} />
                                <DetailTile label="Location" value={car.location} />
                            </div>

                            <div className="prose max-w-none mb-8">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors">Description</h3>
                                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed transition-colors italic">
                                    "{car.description}"
                                </p>
                            </div>

                            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl flex items-center justify-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 fill-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                <span className="text-lg font-bold text-gray-800 dark:text-white">
                                    {likesCount} {likesCount === 1 ? 'person likes' : 'people like'} this car
                                </span>
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700 transition-colors">
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white transition-colors">Seller Info</h3>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                                    <div>
                                        <p className="text-gray-600 dark:text-gray-300">Posted by: <span className="font-medium text-gray-900 dark:text-white">{car.username}</span></p>

                                        <div className="text-gray-600 dark:text-gray-300 flex items-center gap-2 mt-1">
                                            <span>Contact:</span>
                                            {showPhone ? (
                                                <span className="font-medium text-gray-900 dark:text-white">{car.contactNumber || car.userPhoneNumber}</span>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        setShowPhone(true);
                                                        authFetch(`/api/advertisements/${id}/contact`, { method: 'POST' }).catch(err => console.error(err));
                                                    }}
                                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium hover:underline"
                                                >
                                                    Show Number
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {isAuthenticated && username !== car.username && (
                                        <button
                                            onClick={() => navigate('/chat', { state: { initialPartner: car.username } })}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors ml-auto sm:ml-0"
                                        >
                                            Message Seller
                                        </button>
                                    )}

                                    {isAuthenticated && username !== car.username && !isFriend && !acceptedInvitationFromUser && (
                                        invitationFromUser ? (
                                            <button
                                                onClick={handleFriendAction}
                                                disabled={loadingInvite}
                                                className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-300"
                                            >
                                                Accept {car.username}'s invitation
                                            </button>
                                        ) : !sentInvitation ? (
                                            <button
                                                onClick={handleFriendAction}
                                                disabled={loadingInvite}
                                                className="px-4 py-2 rounded-lg font-medium transition-colors bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-300"
                                            >
                                                Add {car.username} to friends
                                            </button>
                                        ) : (
                                            <span className="text-gray-500 dark:text-gray-400 text-sm italic">Request sent</span>
                                        )
                                    )}
                                    {(isFriend || acceptedInvitationFromUser) && (
                                        <span className="text-green-600 dark:text-green-400 font-bold flex items-center gap-1">
                                            ✓ Friends
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailTile = ({ label, value }) => (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300 border border-transparent hover:border-blue-500/30">
        <span className="block text-gray-500 dark:text-gray-400 text-sm mb-1">{label}</span>
        <span className="font-semibold text-gray-900 dark:text-gray-100">{value}</span>
    </div>
);

export default CarDetailsPage;