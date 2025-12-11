import React, { useState } from 'react';
import { Book, User } from '../types';
import { Button } from './Button';
import { Input } from './Input';
import { generateBookArticle } from '../services/geminiService';

interface DashboardProps {
  user: User;
  books: Book[];
  onAddBook: (book: Book) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, books, onAddBook }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRelease = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.authorName) return;

    setIsGenerating(true);

    // AI Generation for "News Article"
    const article = await generateBookArticle(title, user.authorName, date);

    const newBook: Book = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      releaseDate: date,
      authorName: user.authorName,
      authorId: user.id,
      headline: article.headline,
      articleContent: article.content,
      createdAt: Date.now(),
    };

    onAddBook(newBook);
    setIsGenerating(false);
    setTitle('');
    setDate('');
  };

  const myBooks = books.filter(b => b.authorId === user.id);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Release Form */}
        <div className="md:w-1/3 order-2 md:order-1">
          <div className="bg-paper border-2 border-ink p-1 shadow-lg">
            <div className="border border-ink p-6">
                <h3 className="font-headline text-2xl mb-4 text-news-red border-b border-ink pb-2">
                    Submit to Press
                </h3>
                <form onSubmit={handleRelease}>
                    <Input 
                        label="Book Title" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        placeholder="The Great Adventure"
                        required
                    />
                    <Input 
                        label="Release Date" 
                        type="date"
                        value={date} 
                        onChange={e => setDate(e.target.value)} 
                        required
                    />
                    <div className="mt-6">
                        <Button type="submit" disabled={isGenerating} className="w-full">
                            {isGenerating ? 'Typesetting...' : 'Publish Release'}
                        </Button>
                    </div>
                </form>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-paper-dark border border-ink text-center font-body text-sm italic">
            "The pen is mightier than the sword."
          </div>
        </div>

        {/* My List */}
        <div className="md:w-2/3 order-1 md:order-2">
            <h2 className="font-headline text-4xl mb-6 pl-4 border-l-4 border-news-red">
                My Publications
            </h2>
            
            {myBooks.length === 0 ? (
                <div className="p-12 border-2 border-dashed border-gray-300 text-center font-subhead text-xl text-gray-500">
                    You have not released any books yet. <br/> Use the form to announce your next masterpiece.
                </div>
            ) : (
                <div className="grid gap-6">
                    {myBooks.map(book => (
                        <div key={book.id} className="bg-paper border-b-2 border-ink pb-4">
                            <span className="font-headline text-xs text-gray-500 uppercase tracking-widest mb-1 block">
                                Released: {book.releaseDate}
                            </span>
                            <h3 className="font-headline text-2xl font-bold mb-2">
                                {book.title}
                            </h3>
                            <p className="font-body text-justify leading-relaxed text-gray-800 line-clamp-3">
                                {book.articleContent}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>

      </div>
    </div>
  );
};