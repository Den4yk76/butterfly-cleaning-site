type TestimonialProps = {
  quote: string;
  author?: string;
  location?: string;
};

export function Testimonial({ quote, author, location }: TestimonialProps) {
  return (
    <figure className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <blockquote className="text-zinc-800">“{quote}”</blockquote>
      {(author || location) && (
        <figcaption className="mt-3 text-sm text-zinc-600">
          {author ? <span className="font-medium text-zinc-800">{author}</span> : null}
          {author && location ? ' — ' : null}
          {location ? <span>{location}</span> : null}
        </figcaption>
      )}
    </figure>
  );
}

export default Testimonial;


