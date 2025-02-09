import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import companies from '../data/companies.json';
import faqs from '../data/faq.json';
import Autoplay from "embla-carousel-autoplay"
import { AlignCenter } from 'lucide-react';

const LandingPage = () => {
  return <main className='flex flex-col  gap-19 sm:gap-20 py-10 sm:py-20'>
    <section className='text-center gradient-title  font-extrabold text-7xl sm:text-4xl lg:text-8xl tracking-tighter py-4'>
      <h1 >Find your dream job</h1>
      <h1>and get hired <span className='gradient-blue-title'>EZZily..</span> </h1>
      <h2 className='text-2xl sm:text-2xl text-green-500 tracking-normal'>by JobsEzz</h2>

      <p className='text-xl text-gray-400 tracking-wide mt-4'>
        Explore thousands of job listings or Find the perfect candidate
      </p>

    </section>
    <div className='flex gap-6 justify-center'>
      <Link to='/jobs'>
        <Button size='xl'>Find Jobs</Button>
      </Link>

      <Link to='/post-job'>
        <Button size='xl' variant="destructive">Post a Job</Button>
      </Link>

    </div>

    <div class="flex justify-center items-center  p-6">
      <hr class="w-2/3 border-t-4 border-white rounded" />
    </div>


    <div>
      <h1 className="gradient-blue-title font-extrabold text-3xl sm:text-5xl text-center pb-8">
        Our Partners
      </h1>

      {/* carousel */}
      <Carousel plugins={[Autoplay({ delay: 1000 })]} className="w-full py-10">
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

    </div>


    {/* Banner  */}
    <img src="/banner.png" className='banner-image' />

    <div class="flex justify-center items-center  p-6">
      <hr class="w-2/3 border-t-4 border-white rounded" />
    </div>

    <div>
      <h1 className="gradient-blue-title font-extrabold text-3xl sm:text-5xl text-center pb-8">
        Our Features
      </h1>

      <section className='grid grid-cols-1 md:grid-cols-2 gap-4 m-10'>
        {/* card */}
        <Card className='gradient-black'>
          <CardHeader>
            <CardTitle>For Job seekers</CardTitle>
            <CardDescription>Search and apply for jobs, track applications, and more.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Discover your dream job with ease! Our platform allows you to search and apply for jobs tailored to your skills and interests. Stay organized by tracking your applications and receive updates in real-time. Whether you're a job seeker or an employer, we've got tools to simplify the hiring process and make your job hunt stress-free</p>
          </CardContent>
        </Card>

        <Card className='gradient-black'>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
            <CardDescription>Post jobs, manage applications, and find the best candidates.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Streamline your hiring process with our platform! Post jobs effortlessly, manage applications with ease, and connect with top candidates that match your requirements. Whether you're looking to fill one position or build an entire team, our tools are designed to help you find the perfect fit quickly and efficiently</p>
          </CardContent>
        </Card>
      </section>

    </div>

    <div class="flex justify-center items-center  p-6">
      <hr class="w-2/3 border-t-4 border-white rounded" />
    </div>

    {/* accordion */}
    <div>
      <h1 className="gradient-blue-title font-extrabold text-3xl sm:text-5xl text-center pb-8">
        FAQs (Frequent Asked Questions)
      </h1>

      <div className='flex items-center justify-center'>
        <Accordion type="multiple" className="accordion w-3/4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

    </div>


  </main>
}

export default LandingPage
