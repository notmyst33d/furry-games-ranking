import { type Review } from "./data";

export enum RatingLabel {
    HiddenGem,
    AbsoluteCinema,
    Great,
    Mid,
    Unplayable,
    Coal,
}

export function getFixedRating(rating: number): string {
    return (Math.round(rating * 10) / 10).toFixed(1);
}

export function translateRatingLabel(ratingLabel: RatingLabel): string {
    switch (ratingLabel) {
        case RatingLabel.HiddenGem:
            return "Hidden Gem";
        case RatingLabel.AbsoluteCinema:
            return "Absolute Cinema";
        case RatingLabel.Great:
            return "Great";
        case RatingLabel.Mid:
            return "Mid";
        case RatingLabel.Unplayable:
            return "Unplayable";
        case RatingLabel.Coal:
            return "Coal";
    }
}

export function getRatingLabelClass(ratingLabel: RatingLabel): string {
    switch (ratingLabel) {
        case RatingLabel.HiddenGem:
            return "hidden-gem";
        case RatingLabel.AbsoluteCinema:
            return "absolute-cinema";
        case RatingLabel.Great:
            return "great";
        case RatingLabel.Mid:
            return "mid";
        case RatingLabel.Unplayable:
            return "unplayable";
        case RatingLabel.Coal:
            return "coal";
    }
}

export function getRatingLabel(ratingOverall: number, labels: string[]): RatingLabel {
    if (labels.includes("hidden_gem")) {
        return RatingLabel.HiddenGem;
    }
    if (ratingOverall >= 9.5) {
        return RatingLabel.AbsoluteCinema;
    } else if (ratingOverall >= 7.0) {
        return RatingLabel.Great;
    } else if (ratingOverall >= 4.0) {
        return RatingLabel.Mid;
    } else if (ratingOverall > 1.5) {
        return RatingLabel.Unplayable;
    } else {
        return RatingLabel.Coal;
    }
}

export function getAverageRating(reviews: Review[]): number {
    if (reviews.length === 0) {
        return 0;
    }
    return reviews
        .map((v) => v.ratingOverall)
        .reduce((a, b) => a + b) / reviews.length;
}

export function getRatingClassFromReviews(reviews: Review[]): string {
    return getRatingLabelClass(getRatingLabel(getAverageRating(reviews), []));
}

export function getAverageFixedRating(reviews: Review[]): string {
    return getFixedRating(getAverageRating(reviews));
}
