export default function StatsSection() {
  const stats = [
    { number: '500+', label: 'Cars Available' },
    { number: '10K+', label: 'Happy Customers' },
    { number: '50+', label: 'Locations' },
    { number: '24/7', label: 'Support' },
  ]

  return (
    <section className="bg-red-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

