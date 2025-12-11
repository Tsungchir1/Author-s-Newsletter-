import React, { useState } from 'react';
import { User, UserType } from '../types';
import { Button } from './Button';
import { Input } from './Input';

interface AuthFormsProps {
  onLogin: (user: User) => void;
}

export const AuthForms: React.FC<AuthFormsProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<UserType>(UserType.READER);

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Combined First/Last for readers, First for Authors
  const [lastName, setLastName] = useState(''); // Only for authors (optional)
  const [age, setAge] = useState('');
  const [authorName, setAuthorName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock validation
    if (!email || !password) return;
    if (!isLogin) {
        if (!name || !age) return;
        if (userType === UserType.AUTHOR && !authorName) return;
    }

    // Mock Login/Signup
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      type: userType,
      name: isLogin ? 'User' : (userType === UserType.AUTHOR ? `${name} ${lastName}`.trim() : name),
      age: parseInt(age) || 0,
      authorName: userType === UserType.AUTHOR ? authorName : undefined,
    };

    // In a real app, verify credentials here.
    onLogin(newUser);
  };

  return (
    <div className="max-w-2xl mx-auto border-2 border-ink p-1 bg-paper shadow-2xl mt-10">
      <div className="border border-ink p-8">
        <h2 className="font-headline text-4xl text-center mb-6 border-b-2 border-ink pb-4">
          {isLogin ? 'Access Your Subscription' : 'New Subscription Form'}
        </h2>

        {/* Toggle Login/Signup */}
        <div className="flex justify-center gap-4 mb-8">
            <button 
                onClick={() => setIsLogin(true)} 
                className={`font-subhead text-lg italic ${isLogin ? 'font-bold underline text-news-red' : 'text-gray-500'}`}
            >
                Existing User
            </button>
            <span className="text-ink">|</span>
            <button 
                onClick={() => setIsLogin(false)} 
                className={`font-subhead text-lg italic ${!isLogin ? 'font-bold underline text-news-red' : 'text-gray-500'}`}
            >
                New User
            </button>
        </div>

        {/* Toggle User Type (Only for Signup) */}
        {!isLogin && (
          <div className="flex justify-center mb-8 bg-paper-dark p-2 rounded border border-ink">
             <button
                type="button"
                onClick={() => setUserType(UserType.READER)}
                className={`flex-1 py-2 font-headline font-bold ${userType === UserType.READER ? 'bg-ink text-paper shadow-md' : 'text-ink opacity-70'}`}
             >
                Reader
             </button>
             <button
                type="button"
                onClick={() => setUserType(UserType.AUTHOR)}
                className={`flex-1 py-2 font-headline font-bold ${userType === UserType.AUTHOR ? 'bg-ink text-paper shadow-md' : 'text-ink opacity-70'}`}
             >
                Author
             </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label={userType === UserType.AUTHOR ? "First Name" : "Full Name"} 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder={userType === UserType.AUTHOR ? "Jane" : "John Doe"}
                    required
                  />
                  {userType === UserType.AUTHOR && (
                      <Input 
                        label="Last Name (Optional)" 
                        value={lastName} 
                        onChange={e => setLastName(e.target.value)} 
                        placeholder="Austen"
                      />
                  )}
               </div>

               {userType === UserType.AUTHOR && (
                   <Input 
                    label="Pen Name (Author Name)" 
                    value={authorName} 
                    onChange={e => setAuthorName(e.target.value)} 
                    placeholder="e.g. J.K. Rowling"
                    required
                   />
               )}
               
               <Input 
                label="Age" 
                type="number" 
                value={age} 
                onChange={e => setAge(e.target.value)} 
                placeholder="25"
                required
               />
            </>
          )}

          <Input 
            label="Email Address" 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="reader@example.com"
            required
          />
          <Input 
            label="Password" 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="••••••••"
            required
          />

          <div className="pt-6">
            <Button type="submit" className="w-full text-lg">
              {isLogin ? 'Sign In' : 'Register Now (Free)'}
            </Button>
          </div>
        </form>

        <p className="mt-4 text-center font-body text-sm italic text-gray-600">
           * All subscriptions are complimentary. No hidden fees.
        </p>
      </div>
    </div>
  );
};