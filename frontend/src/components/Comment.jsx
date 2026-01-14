import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";

const Comment = ({ comment, onReplyClick, refreshSignal }) => {
  const { authFetch, isAuthenticated } = useAuth();
  const [replies, setReplies] = useState([]);

  const fetchReplies = useCallback(async () => {
    try {
      const res = await authFetch(`/api/comment/getChildren/${comment.comment_id}`);
      if (res.ok) {
        const data = await res.json();
        setReplies(data);
      }
    } catch (err) {
      console.error("Błąd pobierania odpowiedzi:", err);
    }
  }, [comment.comment_id, authFetch]);

  useEffect(() => {
    fetchReplies();
  }, [fetchReplies, refreshSignal]);

  return (
    <div className="border-l-4 border-blue-500 pl-4 py-3 mb-4 bg-white dark:bg-gray-800 rounded-r-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
          {comment.content}
        </p>
        <span className="text-[10px] text-gray-400 font-mono bg-gray-50 dark:bg-gray-700 px-1 rounded">
          #{comment.comment_id}
        </span>
      </div>

      <div className="flex items-center mt-2">
        {isAuthenticated && (
          <button
            className="text-xs text-blue-600 hover:text-blue-800 font-bold transition-colors"
            onClick={() => onReplyClick(comment.comment_id)}
          >
            Reply
          </button>
        )}
      </div>

      {replies.length > 0 && (
        <div className="ml-2 mt-4 space-y-2 border-l-2 border-gray-100 dark:border-gray-700 pl-4">
          {replies.map((reply) => (
            <div key={reply.comment_id} className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg text-[13px]">
              <p className="text-gray-700 dark:text-gray-300">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;