import React from 'react';
import { Book } from '../types';

interface NewsFeedProps {
  books: Book[];
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ books }) => {
  // Sort by created at, newest first
  const sortedBooks = [...books].sort((a, b) => b.createdAt - a.createdAt);

  if (sortedBooks.length === 0) {
    return (
        <div className="text-center py-20">
            <h2 className="font-headline text-4xl text-gray-400">Extra! Extra! Read all about it!</h2>
            <p className="font-body italic mt-4 text-xl text-gray-500">No news to report at the moment.</p>
        </div>
    );
  }

  // Helper to get random rotation for realistic newspaper look
  const getRandomRotation = (index: number) => {
    const rots = ['rotate-1', '-rotate-1', 'rotate-0', 'rotate-0.5', '-rotate-0.5'];
    return rots[index % rots.length];
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Featured Article (Most Recent) */}
      {sortedBooks.length > 0 && (
         <div className="mb-12 border-b-4 border-double border-ink pb-12">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="lg:w-2/3">
                    <div className="flex items-center gap-4 mb-3 border-b border-ink/30 pb-1">
                        <span className="bg-news-red text-paper px-2 py-0.5 font-headline font-bold text-xs uppercase tracking-wider">Breaking News</span>
                        <span className="font-headline text-xs uppercase text-gray-500">
                             By {sortedBooks[0].authorName} &bull; Releases {sortedBooks[0].releaseDate}
                        </span>
                    </div>
                    <h2 className="font-headline text-5xl md:text-6xl font-black leading-tight mb-6 hover:text-news-red transition-colors cursor-pointer">
                        {sortedBooks[0].headline}
                    </h2>
                    <div className="columns-1 md:columns-2 gap-8 font-body text-lg leading-relaxed text-justify first-letter:text-5xl first-letter:font-headline first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-[-4px]">
                        {sortedBooks[0].articleContent}
                        <p className="mt-4 font-bold not-italic">
                            Look for "{sortedBooks[0].title}" at your local bookstore starting {sortedBooks[0].releaseDate}.
                        </p>
                    </div>
                </div>
                <div className="lg:w-1/3 bg-paper-dark p-4 border border-ink shadow-lg rotate-1 transform">
                     <div className="border border-ink p-2 h-64 flex items-center justify-center bg-gray-200 mb-2 relative overflow-hidden group">
                        {/* Placeholder for book cover */}
                        <img 
                          src={`https://picsum.photos/400/600?random=${sortedBooks[0].id}`} 
                          alt="Book Cover" 
                          className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-sepia mix-blend-multiply opacity-20 pointer-events-none"></div>
                     </div>
                     <p className="font-subhead italic text-sm text-center">
                        Cover art for the upcoming release "{sortedBooks[0].title}".
                     </p>
                </div>
            </div>
         </div>
      )}

      {/* Grid for other stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedBooks.slice(1).map((book, idx) => (
            <div key={book.id} className={`bg-paper p-4 border-r border-ink last:border-r-0 ${idx % 3 === 2 ? 'lg:border-r-0' : ''} ${idx % 2 === 1 ? 'md:border-r-0 lg:border-r' : ''}`}>
                <div className="h-40 w-full mb-4 overflow-hidden border border-ink bg-gray-100 relative">
                     <img 
                          src={`https://picsum.photos/400/300?random=${book.id}`} 
                          alt="Teaser" 
                          className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="absolute bottom-0 left-0 bg-paper px-2 py-1 border-t border-r border-ink font-headline text-xs font-bold">
                        {book.releaseDate}
                    </div>
                </div>
                <h3 className="font-headline text-2xl font-bold leading-tight mb-2 hover:underline decoration-news-red decoration-2 underline-offset-2">
                    {book.headline}
                </h3>
                <p className="font-subhead italic text-sm text-gray-600 mb-3">
                    By {book.authorName}
                </p>
                <div className="font-body text-sm text-justify leading-relaxed line-clamp-4 border-b border-ink/20 pb-4 mb-2">
                    {book.articleContent}
                </div>
                <div className="text-center">
                    <button className="font-headline font-bold text-xs uppercase tracking-widest hover:text-news-red">
                        Read Full Story &rarr;
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};