import type { Metadata } from 'next';
import { site } from '../../config/site';
import { Testimonial } from '../../components/Testimonial';

export const metadata: Metadata = {
  title: `Reviews — ${site.name}`,
  description: 'Curated testimonials from happy clients.',
};

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-900">Reviews</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Testimonial quote="They did an amazing job! Everything was spotless." author="A." location="Newmarket" />
        <Testimonial quote="Professional, on time, and very thorough." author="J." location="Richmond Hill" />
        <Testimonial quote="Highly recommend — great attention to detail." author="K." location="Vaughan" />
      </div>
    </div>
  );
}


