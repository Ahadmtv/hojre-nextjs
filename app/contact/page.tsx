'use client'
import Footer from '@/components/main/footer';
import HeaderSecondary from '@/components/main/header-secondary';
import React, { FormEvent } from 'react'

const ContactPage = () => {

    const contactList = [
        { imgUrl: "./assets/images/icon/01.png", imgAlt: "contact icon", title: "آدرس دفتر مرکزی", desc: "گیلان، رشت، میدان شهرداری", },
        { imgUrl: "./assets/images/icon/02.png", imgAlt: "contact icon", title: "شماره تماس", desc: "013 123 456 789", },
        { imgUrl: "./assets/images/icon/03.png", imgAlt: "contact icon", title: "ایمیل", desc: "admin@hojre.com", },
        { imgUrl: "./assets/images/icon/04.png", imgAlt: "contact icon", title: "تارنما", desc: "www.hojre.com", }
      ];
      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      }
      return (
        <div>
          <HeaderSecondary />
          <div className="bg-orange-50 py-10">
            <div className="container mx-auto px-3 md:px-0">
              <div className="">
                <h2 className="text-xl text-orange-600 text-center">با ما ارتباط بگیرید</h2>
                <h3 className="text-2xl text-center">همیشه آماده شنیدن تماس ها و پیام های شما هستیم</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-6 mt-8">
                <div className="col-span-2">
                  <div className="flex flex-col gap-y-4">
                    {contactList.map((c, i) => {
                      return (
                        <div className="bg-white rounded-lg my-shadow p-4 flex" key={i}>
                          <div className="flex justify-center items-center"><img src={c.imgUrl} alt={c.imgAlt}></img></div>
                          <div className="mr-3">
                            <h4 className="text-xl">{c.title}</h4>
                            <p className="font-vazir-thin">{c.desc}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="col-span-3 mt-6 lg:mt-0">
                  <div className="w-full h-full my-shadow ">
                    <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.663983373663!2d49.582200676339276!3d37.279394390540325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ff56273f03e97b7%3A0x47a12dca21b0b50a!2sShahrdari%20Square%2C%20Rasht%2C%20Iran!5e0!3m2!1sen!2sde!4v1706177005545!5m2!1sen!2sde"></iframe>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div>
                  <h2 className="text-xl text-orange-600 text-center">مشکلات را بیان کنید</h2>
                  <h3 className="text-2xl text-center mt-2">مشکل خود را دقیق شرح دهید تا در کترین زمان به آن رسیدگی کنیم</h3>
                </div>
                <div className="mt-5">
                  <form className="flex flex-col lg:px-[200px]" onSubmit={(e) => handleSubmit(e)}>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                      <input className=" border-2 rounded p-2" type="text" required placeholder="نام و نام خانوادگی"></input>
                      <input className=" border-2 rounded p-2" type="text" required placeholder="ایمیل"></input>
                      <input className=" border-2 rounded p-2" type="text" required placeholder="شماره تماس"></input>
                      <input className=" border-2 rounded p-2" type="text" required placeholder="موضوع"></input>
                    </div>
                    <div className="mt-5"><textarea className="w-full p-2 border-2 rounded" placeholder="پیام خود را اینجا بنویسید ..."></textarea></div>
                    <div className="mt-5 flex justify-center"><button className="text-white bg-orange-600 py-2 px-3 rounded-md hover:-translate-y-1 ease-linear duration-150" type="submit">ارسال پیام</button></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )
}

export default ContactPage