import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import groupimage from "../assets/groupimage.jpg"
import omolola from "../assets/omolola.jpg"
import tofunmi from "../assets/IMG_0812.jpeg"
import placeholder from "../assets/user.png" 



export default function About() {
  const team = [
    {
      name: "Engr. Omolola Adetona",
      role: "Executive Director",
      image: omolola,
      bio: "With over 10 years of experience in engineering."
    },
    {
      name: "Taiwo Omotosho",
      role: "Training Director",
      image: placeholder,
      bio: "Expert in curriculum development and professional training programs."
    },
    {
      name: "Seyi Adigun",
      role: "Accountant",
      image: placeholder,
      bio: ""
    },
    {
      name: "Adebayo Tofunmi",
      role: "Admin Manager",
      image: tofunmi,
      bio: "."
    },
    {
      name: "Adebayo Bariks",
      role: "Admin Manager",
      image: placeholder,
      bio: ""
    }
  ]

  const values = [
    {
      title: "Excellence",
      description: "We strive for excellence in all our training programs and services."
    },
    {
      title: "Innovation",
      description: "We continuously adapt our programs to meet evolving industry needs."
    },
    {
      title: "Integrity",
      description: "We maintain the highest standards of professional ethics and transparency."
    },
    {
      title: "Impact",
      description: "We measure our success by the positive change we create in people's lives."
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About ERA</h1>
            <p className="text-xl text-gray-600">
              Empowering young graduates through professional training and meaningful internship opportunities.
              We bridge the gap between education and employment.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                ERA's mission is to empower young graduates with the skills, knowledge, and opportunities 
                they need to build successful careers. We believe in creating a bridge between education 
                and employment through practical training and real-world experience.
              </p>
              <p className="text-gray-600 mb-8">
                Through our comprehensive training programs and partnerships with leading companies, 
                we help graduates transition smoothly from academia to the professional world.
              </p>
              <Button className="bg-green-600 hover:bg-green-700">
                Learn More About Our Programs
              </Button>
            </div>
            <div className="relative h-[400px]">
              <Image
                src= {groupimage}
                alt="Training session"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-xl mb-2">{member.name}</h3>
                <p className="text-green-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div>Graduates Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">200+</div>
              <div>Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">85%</div>
              <div>Employment Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10+</div>
              <div>Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a recent graduate looking to start your career or a company interested in 
            partnering with us, we'd love to hear from you.
          </p>
          <div className="space-x-4">
            <Button className="bg-green-600 hover:bg-green-700">
              Apply for Training
            </Button>
            <Button variant="outline">
              Partner With Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

