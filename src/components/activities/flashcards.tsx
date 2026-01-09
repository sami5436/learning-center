'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import type { Flashcard } from '@/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, Check } from 'lucide-react';
import { shuffleArray } from '@/lib/utils';

interface FlashcardsProps {
    cards: Flashcard[];
    onComplete?: (knownCount: number, totalCount: number) => void;
    shuffleOnStart?: boolean;
}

export function Flashcards({ cards: initialCards, onComplete, shuffleOnStart = false }: FlashcardsProps) {
    const [cards, setCards] = useState(() =>
        shuffleOnStart ? shuffleArray(initialCards) : initialCards
    );
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
    const [isComplete, setIsComplete] = useState(false);

    const currentCard = cards[currentIndex];
    const progress = ((currentIndex + 1) / cards.length) * 100;

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            setIsFlipped(false);
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsComplete(true);
            onComplete?.(knownCards.size, cards.length);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setIsFlipped(false);
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleKnow = () => {
        setKnownCards(prev => new Set(prev).add(currentCard.id));
        handleNext();
    };

    const handleDontKnow = () => {
        // Remove from known if previously marked
        setKnownCards(prev => {
            const next = new Set(prev);
            next.delete(currentCard.id);
            return next;
        });
        handleNext();
    };

    const handleShuffle = () => {
        setCards(shuffleArray(cards));
        setCurrentIndex(0);
        setIsFlipped(false);
    };

    const handleReset = () => {
        setCards(shuffleOnStart ? shuffleArray(initialCards) : initialCards);
        setCurrentIndex(0);
        setKnownCards(new Set());
        setIsFlipped(false);
        setIsComplete(false);
    };

    const isKnown = knownCards.has(currentCard?.id);

    // Completion screen
    if (isComplete) {
        const percentage = Math.round((knownCards.size / cards.length) * 100);

        return (
            <div className="text-center py-8 animate-fade-in">
                <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-primary-100">
                    <Check className="h-10 w-10 text-primary-500" />
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-2">
                    All Done!
                </h2>

                <p className="text-muted-foreground mb-2">
                    You knew {knownCards.size} out of {cards.length} cards ({percentage}%)
                </p>

                {knownCards.size < cards.length && (
                    <p className="text-sm text-muted-foreground mb-6">
                        Keep practicing the ones you didn&apos;t know!
                    </p>
                )}

                <div className="flex justify-center gap-3">
                    <Button variant="secondary" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Start Over
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Progress */}
            <div className="flex items-center gap-4">
                <Progress value={progress} size="sm" variant="primary" />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {currentIndex + 1} / {cards.length}
                </span>
            </div>

            {/* Flashcard */}
            <div
                className={cn(
                    'flip-card cursor-pointer',
                    isFlipped && 'flipped'
                )}
                onClick={handleFlip}
                onKeyDown={(e) => e.key === ' ' && handleFlip()}
                tabIndex={0}
                role="button"
                aria-label={isFlipped ? 'Show front of card' : 'Flip to see answer'}
            >
                <div className="flip-card-inner" style={{ height: '300px' }}>
                    {/* Front */}
                    <div className="flip-card-front bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center p-8 shadow-xl">
                        <p className="text-2xl font-medium text-white text-center">
                            {currentCard.front}
                        </p>
                    </div>

                    {/* Back */}
                    <div className="flip-card-back bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center p-8 shadow-xl">
                        <p className="text-2xl font-medium text-white text-center">
                            {currentCard.back}
                        </p>
                    </div>
                </div>
            </div>

            {/* Hint */}
            <p className="text-center text-sm text-muted-foreground">
                {isFlipped ? 'Click to see the question' : 'Click the card to reveal the answer'}
            </p>

            {/* Know / Don't Know buttons */}
            {isFlipped && (
                <div className="flex justify-center gap-4 animate-fade-in">
                    <Button
                        variant="ghost"
                        onClick={handleDontKnow}
                        className="border border-error-200 text-error-600 hover:bg-error-50"
                    >
                        Still Learning
                    </Button>
                    <Button
                        variant="success"
                        onClick={handleKnow}
                    >
                        <Check className="h-4 w-4 mr-2" />
                        Got It!
                    </Button>
                </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShuffle}
                    title="Shuffle cards"
                >
                    <Shuffle className="h-4 w-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNext}
                    disabled={currentIndex === cards.length - 1 && !isFlipped}
                >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            </div>

            {/* Known count */}
            <div className="text-center text-sm text-muted-foreground">
                {knownCards.size} of {cards.length} marked as known
            </div>
        </div>
    );
}
