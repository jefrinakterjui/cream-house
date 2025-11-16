import { MdOutlineEmail, MdOutlinePhone, MdOutlineLocationOn } from 'react-icons/md';
import React from 'react';

const contactInfo = [
  {
    icon: MdOutlineEmail,
    title: 'Email',
    details: 'mycreamhouse@gmail.com',
    href: 'mailto:mycreamhouse@gmail.com',
  },
  {
    icon: MdOutlinePhone,
    title: 'Phone',
    details: '+91 9701381723',
    href: 'tel:+919701381723',
  },
  {
    icon: MdOutlineLocationOn,
    title: 'Office',
    details: 'PDR Foods, Ground Floor, 4-184/83, Malladi Vishnu Road, Vadeswaram, Guntur-522302',
    href: 'https://maps.google.com/?q=PDR+Foods,Vadeswaram,Guntur',
  },
];

const ContactCard = ({ icon: Icon, title, details }: typeof contactInfo[0]) => (

  <div className="block transform rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
    <div className="flex flex-col items-start gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-[#F01B4E]">
        <Icon className="h-7 w-7" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-1 text-base text-gray-600">{details}</p>
      </div>
    </div>
  </div>
);

export default function GetInTouch() {
  return (
    <section className="bg-gray-50 py-14 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Get Into Touch
          </h2>
          <p className="mt-4 text-lg text-gray-600">

          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contactInfo.map((item) => (
            <ContactCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              details={item.details}
              href={item.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}