export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Business Traveler',
      content: 'Excellent service and great selection of vehicles. The booking process was smooth and the car was in perfect condition.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Family Vacation',
      content: 'We rented an SUV for our family trip and it was perfect. Clean, comfortable, and reliable. Highly recommend!',
      rating: 5,
    },
    {
      id: 3,
      name: 'Mike Davis',
      role: 'Weekend Getaway',
      content: 'Quick and easy booking process. The car was ready when we arrived and the return process was hassle-free.',
      rating: 5,
    },
  ]

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">&quot;{testimonial.content}&quot;</p>
              <div>
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

