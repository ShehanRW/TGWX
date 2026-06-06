import { Compass, Camera, Umbrella, Coffee } from 'lucide-react'
import services from '../data/services.json'

const iconMap = { Compass, Camera, Umbrella, Coffee }

const ServicesSection = () => (
  <section className="py-20 bg-gray-50">
    {services.map((service) => {
      const Icon = iconMap[service.icon]
      return (
        <div key={service.id}>
          <Icon className="w-8 h-8" />
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      )
    })}
  </section>
)