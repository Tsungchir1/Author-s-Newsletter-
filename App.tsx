import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AuthForms } from './components/AuthForms';
import { Dashboard } from './components/Dashboard';
import { NewsFeed } from './components/NewsFeed';
import { User, Book, ViewState, UserType } from './types';

// Initial Mock Data
const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Clockwork Heart',
    authorName: 'Eleanor Vance',
    authorId: 'auth1',
    releaseDate: '2024-11-15',
    headline: 'Clockwork Heart Ticks to Life',
    articleContent: 'In a stunning turn of events, renowned author Eleanor Vance has unveiled her latest steampunk masterpiece. "The Clockwork Heart" promises a journey through gears and emotion, challenging our very perception of what it means to be alive in a mechanical world.',
    createdAt: 1715421234000
  },
  {
    id: '2',
    title: 'Whispers in the Willows',
    authorName: 'Arthur Blackwood',
    authorId: 'auth2',
    releaseDate: '2024-12-01',
    headline: 'Silence Breaks in the Willows',
    articleContent: 'Arthur Blackwood returns to the mystery genre with "Whispers in the Willows". Critics are already calling it a "chilling descent into madness" set against the backdrop of a quaint English village that holds dark secrets.',
    createdAt: 1715521234000
  },
  {
      id: '3',
      title: 'Galactic Horizons',
      authorName: 'Isaac S.',
      authorId: 'auth3',
      releaseDate: '2025-01-20',
      headline: 'Humanity Reaches New Horizons',
      articleContent: 'Sci-fi visionary Isaac S. projects us into the 24th century. "Galactic Horizons" explores the political intrigue of interstellar colonization. A must-read for anyone who looks up at the stars and wonders "what if?".',
      createdAt: 1715621234000
  }
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);

  // Simple persistence for demo
  useEffect(() => {
    const savedUser = localStorage.getItem('an_user');
    if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
    }
    const savedBooks = localStorage.getItem('an_books');
    if (savedBooks) {
        setBooks(JSON.parse(savedBooks));
    }
  }, []);

  useEffect(() => {
     if (currentUser) {
         localStorage.setItem('an_user', JSON.stringify(currentUser));
     } else {
         localStorage.removeItem('an_user');
     }
  }, [currentUser]);

  useEffect(() => {
      localStorage.setItem('an_books', JSON.stringify(books));
  }, [books]);


  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.type === UserType.AUTHOR) {
        setView(ViewState.DASHBOARD);
    } else {
        setView(ViewState.HOME);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView(ViewState.HOME);
  };

  const handleAddBook = (book: Book) => {
    setBooks(prev => [book, ...prev]);
    setView(ViewState.HOME); // Redirect to feed to see the new "News"
  };

  const renderContent = () => {
    switch (view) {
      case ViewState.AUTH:
        return <AuthForms onLogin={handleLogin} />;
      case ViewState.DASHBOARD:
        if (!currentUser || currentUser.type !== UserType.AUTHOR) {
             setView(ViewState.HOME);
             return null;
        }
        return <Dashboard user={currentUser} books={books} onAddBook={handleAddBook} />;
      case ViewState.HOME:
      default:
        return <NewsFeed books={books} />;
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-news-red selection:text-paper pb-20">
       <div className="max-w-7xl mx-auto p-4 md:p-8">
            <Header 
                currentUser={currentUser}
                onLogout={handleLogout}
                onNavigateHome={() => setView(ViewState.HOME)}
                onNavigateAuth={() => setView(ViewState.AUTH)}
                onNavigateDashboard={() => setView(ViewState.DASHBOARD)}
            />
            
            <main className="mt-8 transition-opacity duration-300 ease-in-out">
                {renderContent()}
            </main>

            <footer className="mt-20 pt-8 border-t-4 border-double border-ink text-center">
                <p className="font-headline font-bold text-lg mb-2">Author's Newsletter</p>
                <p className="font-body text-sm text-gray-500 italic">
                    &copy; {new Date().getFullYear()} The Literary Press. All rights reserved. <br/>
                    Made with ink, paper, and code.
                </p>
            </footer>
       </div>
    </div>
  );
};

export default App;