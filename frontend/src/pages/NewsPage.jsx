import React from 'react';
import { newsData } from '../data/mockNews';

const NewsCard = ({ news }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img
            src={news.image}
            alt={news.title}
            className="w-full h-48 object-cover"
        />
        <div className="p-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    {news.category}
                </span>
                <span className="text-xs text-gray-500">
                    {news.date}
                </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
                {news.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
                {news.summary}
            </p>
        </div>
    </div>
);

export default function NewsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Automotive News</h1>
                <p className="text-lg text-gray-600">The latest updates from the world of cars, technology, and racing.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsData.map((news) => (
                    <NewsCard key={news.id} news={news} />
                ))}
            </div>
        </div>
    );
}