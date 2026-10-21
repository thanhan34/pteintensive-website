export const placementTestUrl = 'https://placementtest.pteintensive.com/';

export type PlacementDeclaration = { completed: boolean; feedback: string };
export function validPlacementDeclaration(value: unknown): value is PlacementDeclaration {
  if (!value || typeof value !== 'object') return false;
  const declaration = value as Partial<PlacementDeclaration>;
  return declaration.completed === true && typeof declaration.feedback === 'string'
    && declaration.feedback.trim().length >= 10 && declaration.feedback.length <= 2000;
}

// Approval is recorded by authenticated staff, never by a student-side checkbox.
export function academicallyApproved(value: { academicReview?: { reference?: string; courseId?: string; reviewedBy?: string; reviewedAt?: string } } | undefined): boolean {
  const review = value?.academicReview;
  return Boolean(review && typeof review.reference === 'string' && review.reference.trim().length >= 10
    && typeof review.courseId === 'string' && review.courseId
    && typeof review.reviewedBy === 'string' && review.reviewedBy
    && typeof review.reviewedAt === 'string' && Number.isFinite(Date.parse(review.reviewedAt)));
}