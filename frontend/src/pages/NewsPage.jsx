import React from 'react';
import { newsData } from '../data/mockNews';

const NewsCard = ({ news }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 border border-transparent dark:border-gray-700">
        <img
            src={news.image}
            alt={news.title}
            className="w-full h-48 object-cover"
        />
        <div className="p-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-full transition-colors">
                    {news.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors">
                    {news.date}
                </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
                {news.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 transition-colors">
                {news.summary}
            </p>
        </div>
    </div>
);

export default function NewsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
                    Automotive News
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors">
                    The latest updates from the world of cars, technology, and racing.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsData.map((news) => (
                    <NewsCard key={news.id} news={news} />
                ))}
            </div>
        </div>
    );
}